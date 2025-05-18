<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Notification;
use App\Models\Service;
use App\Models\Appointment;
use App\Models\Worker;
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
        if (!auth()->guard('web')->check() && !session('impersonating_client')) {
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
            'companies' => $service->companies,
            'impersonating_client' => session('impersonating_client', false),

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
        if (!$company->services->contains($service->id)) {
            abort(404, 'Aquesta empresa no ofereix aquest servei');
        }

        $company->load([
            'services' => function ($query) use ($service) {
                $query->where('services.id', $service->id)
                    ->withPivot('price_per_unit', 'unit', 'min_price', 'max_price', 'logo');
            },
            'workers' => function ($query) use ($service) {
                $query->whereHas('appointments', function ($q) use ($service) {
                    $q->where('service_id', $service->id);
                })->orWhereDoesntHave('appointments');
            }
        ]);

        // Obtener solo los horarios de trabajadores que ofrecen ese servicio
        $schedules = $company->workers->pluck('schedule')->unique()->values();

        return Inertia::render('Client/CitesClients', [
            'service' => $service,
            'company' => $company,
            'schedules' => $schedules
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
        \Log::channel('appointments')->info('Inici reserva', [
            'user' => auth()->id(),
            'data' => $request->all()
        ]);

        try {
            $validated = $request->validate([
                'company_id' => 'required|exists:companies,id',
                'service_id' => 'required|exists:services,id',
                'date' => 'required|date_format:Y-m-d|after_or_equal:today',
                'time' => [
                    'required',
                    'date_format:H:i',
                    function ($attribute, $value, $fail) use ($request) {
                        if ($request->date === now()->format('Y-m-d') &&
                            strtotime($value) < strtotime(now()->format('H:i'))) {
                            $fail('Per a cites d\'avui, l\'hora ha de ser futura');
                        }
                    }
                ],
                'price' => 'required|numeric|min:0.1',
                'notes' => 'nullable|string|max:500',
                'input_value' => 'nullable|numeric|min:0',
                'selected_size' => 'nullable|string|in:petit,mitjà,gran'
            ]);

            $inputValue = $request->input('input_value');
            $selectedSize = $request->input('selected_size');

            $requiredWorkers = 1;
            if ($inputValue && $inputValue >= 200) {
                $requiredWorkers = 2;
            } elseif ($selectedSize === 'gran') {
                $requiredWorkers = 2;
            }

            $availableWorkers = Worker::where('company_id', $validated['company_id'])
                ->get()
                ->filter(function ($worker) use ($validated) {
                    return !$worker->appointments()
                        ->where('date', $validated['date'])
                        ->where('time', $validated['time'])
                        ->exists();
                });

            if ($availableWorkers->count() < $requiredWorkers) {
                throw new \Exception("Només hi ha {$availableWorkers->count()} treballadors disponibles. Es requereixen $requiredWorkers.");
            }

            DB::beginTransaction();

            $appointment = Appointment::create([
                'user_id' => auth()->id(),
                'company_id' => $validated['company_id'],
                'service_id' => $validated['service_id'],
                'date' => $validated['date'],
                'time' => $validated['time'],
                'price' => (float)$validated['price'],
                'notes' => $validated['notes'],
                'status' => 'pending'
            ]);

            // Asociar trabajadores
            $appointment->workers()->attach($availableWorkers->take($requiredWorkers)->pluck('id'));

            // Notificació
            $user = auth()->user();
            $service = Service::find($validated['service_id']);

            $company = Company::find($validated['company_id']);

            if ($company && $company->notifications_appointments == 1) {
                Notification::create([
                    'company_id' => $validated['company_id'],
                    'type' => 'service',
                    'action' => 'appointment_created',
                    'data' => [
                        'user_id' => $user->id,
                        'user_name' => $user->name,
                        'service_id' => $service->id,
                        'service_name' => $service->name,
                        'date' => $validated['date'],
                        'time' => $validated['time'],
                    ],
                    'message' => "{$user->name} ha sol·licitat una cita per a \"{$service->name}\" el {$validated['date']} a les {$validated['time']}.",
                    'read' => false,
                ]);
            }


            DB::commit();

            return redirect()->route('client.appointments.show', $appointment->id)
                ->with('success', '¡Cita reservada amb èxit!');
        } catch (\Exception $e) {
            DB::rollBack();
            \Log::channel('appointments')->error('Error en reserva: ' . $e->getMessage());
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }


    public function indexAppointments(): Response
    {
        $appointments = Appointment::with(['company', 'service', 'workers'])
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

        $appointment->load(['company', 'service', 'workers']); // << usar "workers", no "worker"

        $appointment->price = (float)$appointment->price;

        return Inertia::render('Client/AppointmentDetail', [
            'appointment' => $appointment
        ]);
    }


    public function showCompany($companyId): Response
    {
        $company = Company::findOrFail($companyId);
        return Inertia::render('Client/CompanyInfo', ['company' => $company]);
    }

    public function cancelAppointment(Appointment $appointment)
    {
        if ($appointment->user_id !== auth()->id()) {
            abort(403, 'No tens permís per cancel·lar aquesta cita.');
        }

        $appointment->status = 'cancelled';
        $appointment->save();

        return redirect()->back()->with('success', 'Cita cancel·lada correctament.');
    }
}
