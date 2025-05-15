<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\CompanyService;
use App\Models\Review;
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
    public function show($serviceTypeOrId): Response
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
     * @param Service $service
     * @param Company $company
     * @return Response
     */
    public function showAppointment(Service $service, Company $company): Response
    {
        if (!$company->services->contains($service->id)) {
            abort(404, 'Aquesta empresa no ofereix aquest servei');
        }

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
                'notes' => 'nullable|string|max:500'
            ]);

            // Troba el primer treballador disponible
            $availableWorker = Worker::where('company_id', $validated['company_id'])
                ->get()
                ->filter(function ($worker) use ($validated) {
                    return !$worker->appointments()
                        ->where('date', $validated['date'])
                        ->where('time', $validated['time'])
                        ->exists();
                })
                ->first();

            if (!$availableWorker) {
                throw new \Exception('Tots els treballadors estan ocupats en aquest horari. Si us plau, selecciona una altra hora.');
            }

            DB::beginTransaction();

            $appointment = Appointment::create([
                'user_id' => auth()->id(),
                'company_id' => $validated['company_id'],
                'service_id' => $validated['service_id'],
                'worker_id' => $availableWorker->id,
                'date' => $validated['date'],
                'time' => $validated['time'],
                'price' => (float)$validated['price'],
                'notes' => $validated['notes'],
                'status' => 'pending'
            ]);

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
        $appointments = Appointment::with([
            'company' => function ($query) {
                $query->select('id', 'name');
            },
            'service' => function ($query) {
                $query->select('id', 'name');
            },
            'companyService' => function ($query) {
                $query->select('id', 'company_id', 'service_id');
            }
        ])
            ->where('user_id', auth()->id())
            ->orderBy('date', 'desc')
            ->orderBy('time', 'desc')
            ->get()
            ->map(function ($appointment) {
                $review = Review::where('client_id', auth()->id())
                    ->where('company_service_id', $appointment->companyService?->id)
                    ->first(['id', 'rate', 'comment']);

                return [
                    'id' => $appointment->id,
                    'company' => [
                        'name' => $appointment->company->name,
                    ],
                    'service' => [
                        'name' => $appointment->service->name,
                    ],
                    'date' => $appointment->date,
                    'time' => $appointment->time,
                    'price' => $appointment->price,
                    'status' => $appointment->status,
                    'notes' => $appointment->notes,
                    'company_service_id' => $appointment->companyService?->id,
                    'review' => $review ? [
                        'id' => $review->id,
                        'rate' => $review->rate,
                        'comment' => $review->comment,
                    ] : null,
                ];
            });

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

    public function showCompany($companyId): Response
    {
        $company = Company::findOrFail($companyId);
        return Inertia::render('Client/CompanyInfo', ['company' => $company]);
    }

    public function createReview(Request $request): Response
    {
        $companyService = CompanyService::findOrFail($request->query('companyServiceId'));
        $appointment = Appointment::findOrFail($request->query('appointmentId'));
        $existingReview = Review::where('client_id', auth()->id())
            ->where('company_service_id', $companyService->id)
            ->first();

        return Inertia::render('Client/ReviewForm', [
            'companyService' => [
                'id' => $companyService->id,
                'company' => ['name' => $companyService->company->name],
                'service' => ['name' => $companyService->service->name],
            ],
            'appointmentId' => $appointment->id,
            'existingReview' => $existingReview ? [
                'id' => $existingReview->id,
                'rate' => $existingReview->rate,
                'comment' => $existingReview->comment,
            ] : null,
        ]);
    }

    public function storeReview(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'company_service_id' => 'required|exists:companies_services,id',
            'appointment_id' => 'required|exists:appointments,id',
            'rate' => 'required|numeric|min:1|max:5',
            'comment' => 'required|string|max:1000',
        ]);

        Review::create([
            'client_id' => auth()->id(),
            'company_service_id' => $validated['company_service_id'],
            'rate' => $validated['rate'],
            'comment' => $validated['comment'],
        ]);

        return redirect()->route('client.appointments.index');
    }

    public function updateReview(Request $request, Review $review): RedirectResponse
    {
        if ($review->client_id !== auth()->id()) {
            abort(403, 'Unauthorized');
        }

        $validated = $request->validate([
            'company_service_id' => 'required|exists:companies_services,id',
            'appointment_id' => 'required|exists:appointments,id',
            'rate' => 'required|numeric|min:1|max:5',
            'comment' => 'required|string|max:1000',
        ]);

        $review->update([
            'rate' => $validated['rate'],
            'comment' => $validated['comment'],
        ]);

        return redirect()->route('client.appointments.index');
    }
}
