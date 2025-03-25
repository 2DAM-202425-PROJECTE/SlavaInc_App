<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Service;
use App\Models\Appointment;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class ClientController extends Controller
{
    /**
     * Mostra la informació del servei i les empreses associades.
     *
     * @param Service $service
     * @return Response
     */
    public function show(Service $service): Response
    {
        if (auth()->user()->role !== 'client') {
            abort(403);
        }
        // Carrega les companyies amb les dades del pivot
        $service->load(['companies' => function($query) {
            $query->withPivot('price_per_unit', 'unit', 'min_price', 'max_price', 'logo');
        }]);

        return Inertia::render('Client/ServiceInfo', [
            'service' => $service,
            'companies' => $service->companies
        ]);
    }

    /**
     * Mostra el formulari de reserva de cita.
     *
     * @param Request $request
     * @return Response
     */
    public function showAppointment(Service $service, Company $company): Response
    {
        // Verificar que la companyia té aquest servei
        if (!$company->services->contains($service->id)) {
            abort(404, 'Aquesta empresa no ofereix aquest servei');
        }

        // Carregar dades del pivot
        $company->load(['services' => function($query) use ($service) {
            $query->where('services.id', $service->id)
                ->withPivot('price_per_unit', 'unit', 'min_price', 'max_price', 'logo');
        }]);

        return Inertia::render('Client/CitesClients', [
            'service' => $service,
            'company' => $company
        ]);
    }

    /**
     * Obté les hores ocupades per una empresa en una data específica
     *
     * @param Request $request
     * @return Response
     */
    public function getOccupiedSlots(Request $request): Response
    {
        $request->validate([
            'company_id' => 'required|exists:login_companies,id',
            'date' => 'required|date'
        ]);

        $occupiedSlots = Appointment::where('company_id', $request->company_id)
            ->where('date', $request->date)
            ->pluck('time')
            ->toArray();

        return Inertia::render('Client/CitesClients', [
            'occupiedSlots' => $occupiedSlots
        ]);
    }

    /**
     * Guarda una nova cita a la base de dades.
     *
     * @param Request $request
     * @return RedirectResponse
     */
    public function storeAppointment(Request $request): RedirectResponse
    {
        \Log::channel('appointments')->info('Inicio reserva', [
            'user' => auth()->user() ? auth()->user()->id : 'guest',
            'ip' => $request->ip(),
            'data' => $request->all()
        ]);

        // Verifica autenticación primero
        if (!auth()->check()) {
            \Log::channel('appointments')->error('Usuario no autenticado');
            return redirect()->route('login');
        }

        try {
            $validated = $request->validate([
                'company_id' => 'required|exists:login_companies,id',
                'service_id' => 'required|exists:services,id',
                'date' => [
                    'required',
                    'date',
                    function ($attribute, $value, $fail) {
                        if (strtotime($value) < strtotime('today')) {
                            $fail('La fecha debe ser hoy o en el futuro');
                        }
                    }
                ],
                'time' => [
                    'required',
                    'date_format:H:i',
                    function ($attribute, $value, $fail) use ($request) {
                        if (date('Y-m-d') === $request->date &&
                            strtotime($value) < strtotime('now')) {
                            $fail('Para citas hoy, la hora debe ser futura');
                        }
                    }
                ],
                'price' => 'required|numeric|min:0.1',
                'notes' => 'nullable|string|max:500'
            ], [
                'date.after_or_equal' => 'La fecha debe ser hoy o en el futuro',
                'time.date_format' => 'Formato de hora inválido (HH:MM)'
            ]);

            \Log::channel('appointments')->debug('Datos validados', $validated);

            // Verificación de relación empresa-servicio
            $serviceExists = Company::whereHas('services', fn($q) => $q->where('services.id', $validated['service_id']))
                ->where('id', $validated['company_id'])
                ->exists();

            if (!$serviceExists) {
                \Log::channel('appointments')->error('Relación no existe', [
                    'company_id' => $validated['company_id'],
                    'service_id' => $validated['service_id']
                ]);
                return back()->withErrors(['error' => 'Relación empresa-servicio no válida']);
            }

            // Verificar si la cita ya existe
            $existingAppointment = Appointment::where('company_id', $validated['company_id'])
                ->where('date', $validated['date'])
                ->where('time', $validated['time'])
                ->first();

            if ($existingAppointment) {
                \Log::channel('appointments')->warning('Cita duplicada intentada', [
                    'company_id' => $validated['company_id'],
                    'date' => $validated['date'],
                    'time' => $validated['time']
                ]);
                return back()->withErrors(['time' => 'Esta hora ya está reservada. Por favor elige otra hora.']);
            }

            // Creación con transacción
            DB::beginTransaction();

            $appointment = Appointment::create([
                'user_id' => auth()->id(),
                'company_id' => $validated['company_id'],
                'service_id' => $validated['service_id'],
                'date' => $validated['date'],
                'time' => $validated['time'],
                'price' => $validated['price'],
                'notes' => $validated['notes'] ?? null,
                'status' => 'pending'
            ]);

            DB::commit();

            \Log::channel('appointments')->info('Cita creada exitosamente', [
                'appointment_id' => $appointment->id
            ]);

            return redirect()->route('client.appointments.index')->with('success', '¡Cita reservada con éxito!');

        } catch (\Illuminate\Validation\ValidationException $e) {
            DB::rollBack();
            \Log::channel('appointments')->error('Error validación', [
                'errors' => $e->errors()
            ]);
            return back()->withErrors($e->errors());

        } catch (\Exception $e) {
            DB::rollBack();
            \Log::channel('appointments')->error('Error crítico', [
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine()
            ]);
            return back()->withErrors(['error' => 'Error inesperado: '.$e->getMessage()]);
        }
    }

    public function indexAppointments(): Response
    {
        $appointments = Appointment::with(['company', 'service'])
            ->where('user_id', auth()->id())
            ->orderBy('date', 'desc')
            ->orderBy('time', 'desc')
            ->get();

        return Inertia::render('Client/CitesIndex', [
            'appointments' => $appointments
        ]);
    }
}
