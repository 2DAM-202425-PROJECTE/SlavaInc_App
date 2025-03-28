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
    public function show($serviceTypeOrId)
    {
        // Verificar que el usuario está autenticado como cliente
        if (!auth()->guard('web')->check()) {
            abort(403);
        }

        // Resto de la lógica permanece igual
        $service = Service::find($serviceTypeOrId);

        if (!$service) {
            $service = Service::where('type', $serviceTypeOrId)->first();
        }

        if (!$service) {
            abort(404, 'Servei no trobat');
        }

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
            'user' => auth()->id(),
            'data' => $request->all()
        ]);

        try {
            $validated = $request->validate([
                'company_id' => 'required|exists:companies,id',
                'service_id' => 'required|exists:services,id',
                'date' => 'required|date|after_or_equal:today',
                'time' => [
                    'required',
                    'date_format:H:i',
                    function ($attribute, $value, $fail) use ($request) {
                        if ($request->date === now()->format('Y-m-d') &&
                            strtotime($value) < strtotime(now()->format('H:i'))) {
                            $fail('Para citas hoy, la hora debe ser futura');
                        }
                    }
                ],
                'price' => 'required|numeric|min:0.1',
                'notes' => 'nullable|string|max:500'
            ]);

            $validated['worker_id'] = 6;

            // Verificación de relación empresa-servicio
            $serviceExists = DB::table('companies_services')
                ->where('company_id', $validated['company_id'])
                ->where('service_id', $validated['service_id'])
                ->exists();

            if (!$serviceExists) {
                throw new \Exception('Relación empresa-servicio no válida');
            }

            // Verificar si la cita ya existe
            if (Appointment::where('company_id', $validated['company_id'])
                ->where('date', $validated['date'])
                ->where('time', $validated['time'])
                ->exists()) {
                throw new \Exception('Esta hora ya está reservada');
            }

            DB::beginTransaction();

            $appointment = Appointment::create([
                'user_id' => auth()->id(),
                'company_id' => $validated['company_id'],
                'service_id' => $validated['service_id'],
                'worker_id' => $validated['worker_id'] ?? null,
                'date' => $validated['date'],
                'time' => $validated['time'],
                'price' => (float)$validated['price'],
                'notes' => $validated['notes'],
                'status' => 'pending'
            ]);

            DB::commit();

            return redirect()->route('client.appointments.show', $appointment->id)
                ->with('success', '¡Cita reservada con éxito!');

        } catch (\Exception $e) {
            DB::rollBack();
            \Log::channel('appointments')->error('Error en reserva: '.$e->getMessage());
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function indexAppointments(): Response
    {
        $appointments = Appointment::with(['company', 'service', 'worker'])
            ->where('user_id', auth()->id())
            ->orderBy('date', 'desc')
            ->orderBy('time', 'desc')
            ->get();

        return Inertia::render('Client/CitesIndex', [
            'appointments' => $appointments
        ]);
    }

    public function showAppointmentDetail(Appointment $appointment): Response
    {
        if (!auth()->guard('web')->check() && !auth()->guard('company')->check()) {
            abort(403);
        }

        // Cargar las relaciones necesarias incluyendo el worker
        $appointment->load(['company', 'service', 'worker']);

        // Convertir price a float explícitamente
        $appointment->price = (float)$appointment->price;

        return Inertia::render('Client/AppointmentDetail', [
            'appointment' => $appointment
        ]);
    }
}
