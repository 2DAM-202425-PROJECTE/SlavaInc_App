<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\CompanyService;
use App\Models\Review;
use App\Models\Service;
use App\Models\Appointment;
use App\Models\Worker;
use App\Models\Notification;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Response as InertiaResponse;
use Illuminate\Http\Response as HttpResponse;

class ClientController extends Controller
{
    /**
     * Mostra la informació del servei i les empreses associades.
     *
     * @param int|string $serviceTypeOrId
     * @return Response
     */
    public function show(int|string $serviceTypeOrId): Response
    {
        // Verificar que el usuario está autenticado como cliente
        if (!auth()->guard('web')->check() && !session('impersonating_client')) {
            abort(403);
        }

        $service = Service::find($serviceTypeOrId) ?? Service::where('type', $serviceTypeOrId)->firstOrFail();

        $companies = $service->companies->map(function ($company) {
            $averageRating = Review::where('company_service_id', $company->pivot->id)->avg('rate');
            $topReviews = Review::where('company_service_id', $company->pivot->id)
                ->orderBy('rate', 'desc')
                ->take(3)
                ->get(['rate', 'comment']);

            return [
                'id' => $company->id,
                'name' => $company->name,
                'address' => $company->address,
                'city' => $company->city,
                'state' => $company->state,
                'zip_code' => $company->zip_code,
                'pivot' => $company->pivot,
                'average_rating' => $averageRating ? round($averageRating, 1) : null,
                'top_reviews' => $topReviews,
            ];
        });

        return Inertia::render('Client/ServiceInfo', [
            'service' => $service,
            'companies' => $companies,
            'impersonating_client' => session('impersonating_client', false),
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
            'company_id' => 'required|exists:companies,id',
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

            // Trobar el CompanyService corresponent
            $companyService = CompanyService::where('company_id', $validated['company_id'])
                ->where('service_id', $validated['service_id'])
                ->first();

            if (!$companyService) {
                \Log::channel('appointments')->error('CompanyService no trobat', [
                    'company_id' => $validated['company_id'],
                    'service_id' => $validated['service_id']
                ]);
                throw new \Exception('No s\'ha trobat el servei per aquesta empresa.');
            }

            // Calcular quants treballadors es necessiten
            $inputValue = $request->input('input_value');
            $selectedSize = $request->input('selected_size');

            $requiredWorkers = 1;
            if ($inputValue && $inputValue >= 200) {
                $requiredWorkers = 2;
            } elseif ($selectedSize === 'gran') {
                $requiredWorkers = 2;
            }

            // Trobar treballadors disponibles
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
                'company_service_id' => $companyService->id,
                'date' => $validated['date'],
                'time' => $validated['time'],
                'price' => (float)$validated['price'],
                'notes' => $validated['notes'],
                'status' => 'pending'
            ]);

            // Asociar trabajadores
            $appointment->workers()->attach($availableWorkers->take($requiredWorkers)->pluck('id'));

            // Crear notificació
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

            \Log::channel('appointments')->info('Cita creada', [
                'appointment_id' => $appointment->id,
                'company_id' => $appointment->company_id,
                'company_service_id' => $appointment->company_service_id
            ]);

            return redirect()->route('client.appointments.show', $appointment->id)
                ->with('success', 'Cita reservada amb èxit!');

        } catch (\Exception $e) {
            DB::rollBack();
            \Log::channel('appointments')->error('Error en reserva: ' . $e->getMessage(), [
                'data' => $request->all()
            ]);
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * Mostra la llista de cites del client.
     *
     * @param Request $request
     * @return InertiaResponse
     */
    public function indexAppointments(Request $request): InertiaResponse
    {
        $filter = $request->query('filter', 'all');

        $query = Appointment::with([
            'company'        => fn($q) => $q->select('id', 'name'),
            'service'        => fn($q) => $q->select('id', 'name'),
            'companyService' => fn($q) => $q->select('id', 'company_id', 'service_id'),
            'reviews'        => fn($q) => $q
                ->where('client_id', auth()->id())
                ->select('id', 'appointment_id', 'rate', 'comment'),
            'workers'        => fn($q) => $q->select('id', 'name', 'surname')
        ])
            ->where('user_id', auth()->id())
            ->orderBy('date', 'desc')
            ->orderBy('time', 'desc');

        if ($filter === 'pending') {
            $query->where('status', 'pending');
        } elseif ($filter === 'completed') {
            // Només les completades que ja tenen una ressenya
            $query->where('status', 'completed')
                ->whereHas('reviews', fn($q) => $q->where('client_id', auth()->id()));
        } elseif ($filter === 'pending_review') {
            $query->where('status', 'completed')
                ->whereDoesntHave('reviews', fn($q) => $q->where('client_id', auth()->id()));
        }

        $appointments = $query->get()->map(function ($appointment) {
            return [
                'id'                 => $appointment->id,
                'company'            => $appointment->company ? ['name' => $appointment->company->name] : null,
                'service'            => $appointment->service ? ['name' => $appointment->service->name] : null,
                'date'               => $appointment->date,
                'time'               => $appointment->time,
                'price'              => $appointment->price,
                'status'             => $appointment->status,
                'notes'              => $appointment->notes,
                'company_service_id' => $appointment->companyService?->id,
                'workers'            => $appointment->workers,
                'review'             => $appointment->reviews->first()
                    ? [
                        'id'      => $appointment->reviews->first()->id,
                        'rate'    => $appointment->reviews->first()->rate,
                        'comment' => $appointment->reviews->first()->comment,
                    ]
                    : null,
            ];
        });

        return Inertia::render('Client/CitesIndex', [
            'appointments' => $appointments,
            'statusFilter' => $filter,
        ]);
    }

    /**
     * Mostra els detalls d'una cita específica.
     *
     * @param Appointment $appointment
     * @return Response
     */
    public function showAppointmentDetail(Appointment $appointment): Response
    {
        if (!auth()->guard('web')->check() && !auth()->guard('company')->check()) {
            abort(403);
        }

        if (auth()->guard('web')->check() && $appointment->user_id !== auth()->id()) {
            abort(403, 'No tens permís per veure aquesta cita');
        }

        $appointment->load([
            'company' => fn($query) => $query->select('id', 'name'),
            'service' => fn($query) => $query->select('id', 'name', 'type'),
            'workers' => fn($query) => $query->select('id', 'name', 'surname'),
            'companyService' => fn($query) => $query->select('id', 'company_id', 'service_id'),
            'reviews' => fn($query) => $query->where('client_id', auth()->id())
        ]);

        $firstReview = $appointment->reviews->first();

        return Inertia::render('Client/AppointmentDetail', [
            'appointment' => [
                'id'                  => $appointment->id,
                'date'                => $appointment->date,
                'time'                => $appointment->time,
                'price'               => (float)$appointment->price,
                'status'              => $appointment->status,
                'notes'               => $appointment->notes,
                'company'             => $appointment->company,
                'service'             => $appointment->service,
                'workers'             => $appointment->workers,
                'company_service_id'  => $appointment->companyService?->id,
                'review'              => $firstReview
                    ? [
                        'id'      => $firstReview->id,
                        'rate'    => $firstReview->rate,
                        'comment' => $firstReview->comment,
                    ]
                    : null,
            ]
        ]);
    }

    /**
     * Mostra la informació d'una empresa.
     *
     * @param int $companyId
     * @return Response
     */
    public function showCompany(int $companyId): Response
    {
        $company = Company::findOrFail($companyId);
        return Inertia::render('Client/CompanyInfo', ['company' => $company]);
    }

    /**
     * Mostra el formulari per crear o editar una ressenya.
     *
     * @param  Request  $request
     * @return InertiaResponse|HttpResponse
     */
    public function createReview(Request $request): InertiaResponse|HttpResponse
    {
        $companyServiceId = $request->query('companyServiceId');
        $appointmentId    = $request->query('appointmentId');

        if (! $companyServiceId || ! $appointmentId) {
            return Inertia::location(route('client.appointments.index'));
        }

        try {
            $companyService = CompanyService::with([
                'company' => fn($q) => $q->select('id', 'name'),
                'service' => fn($q) => $q->select('id', 'name'),
            ])->findOrFail($companyServiceId);

            $appointment = Appointment::where([['id', $appointmentId], ['user_id', auth()->id()], ['status', 'completed']])->firstOrFail();

            $existingReview = Review::where([['client_id', auth()->id()], ['appointment_id', $appointmentId]])->first();

            return Inertia::render('Client/ReviewForm', [
                'companyService' => [
                    'id'      => $companyService->id,
                    'company' => ['name' => $companyService->company->name],
                    'service' => ['name' => $companyService->service->name],
                ],
                'appointment'    => ['id' => $appointment->id],
                'existingReview' => $existingReview ? [
                    'id'      => $existingReview->id,
                    'rate'    => $existingReview->rate,
                    'comment' => $existingReview->comment,
                ] : null,
            ]);

        } catch (ModelNotFoundException|\Exception $e) {
            return Inertia::location(route('client.appointments.index'));
        }
    }

    /**
     * Guarda una nova ressenya.
     *
     * @param Request $request
     * @return HttpResponse
     */
    public function storeReview(Request $request): HttpResponse
    {
        $validated = $request->validate([
            'company_service_id' => 'required|exists:companies_services,id',
            'appointment_id'     => 'required|exists:appointments,id',
            'rate'               => 'required|numeric|min:0.5|max:5',
            'comment'            => 'required|string|max:1000',
        ]);

        try {
            Appointment::where([['id', $validated['appointment_id']], ['user_id', auth()->id()], ['status', 'completed']])->firstOrFail();

            if (Review::where([['client_id', auth()->id()], ['appointment_id', $validated['appointment_id']]])->exists()) {
                session()->flash('error', 'Ja has deixat una ressenya per aquesta cita.');
                return Inertia::location(route('client.appointments.index'));
            }

            Review::create([
                'client_id'          => auth()->id(),
                'company_service_id' => $validated['company_service_id'],
                'appointment_id'     => $validated['appointment_id'],
                'rate'               => $validated['rate'],
                'comment'            => $validated['comment'],
            ]);

            session()->flash('success', 'Ressenya creada amb èxit!');
            return Inertia::location(route('client.appointments.index'));

        } catch (ModelNotFoundException $e) {
            session()->flash('error', 'La cita especificada no existeix o no et pertany.');
            return Inertia::location(route('client.appointments.index'));
        } catch (\Exception $e) {
            session()->flash('error', 'S\'ha produït un error en crear la ressenya.');
            return Inertia::location(route('client.appointments.index'));
        }
    }

    /**
     * Actualitza una ressenya existent.
     *
     * @param Request $request
     * @param Review  $review
     * @return HttpResponse
     */
    public function updateReview(Request $request, Review $review): HttpResponse
    {
        if ($review->client_id !== auth()->id()) {
            abort(403, 'No tens permís per editar aquesta ressenya');
        }

        $validated = $request->validate([
            'rate'    => 'required|numeric|min:0.5|max:5',
            'comment' => 'required|string|max:1000',
        ]);

        try {
            $review->update([
                'rate'    => $validated['rate'],
                'comment' => $validated['comment'],
            ]);

            session()->flash('success', 'Ressenya actualitzada amb èxit!');
            return Inertia::location(route('client.appointments.index'));

        } catch (\Exception $e) {
            session()->flash('error', 'S\'ha produït un error en actualitzar la ressenya.');
            return Inertia::location(route('client.appointments.index'));
        }
    }

    /**
     * Elimina una ressenya i la deixa pendent de review.
     *
     * @param Review $review
     * @return HttpResponse
     */
    public function destroyReview(Review $review)
    {
        // Autorització
        if ($review->client_id !== auth()->id()) {
            abort(403, 'No tens permís per eliminar aquesta ressenya');
        }

        $review->delete();

        session()->flash('success', 'Ressenya eliminada.');
        // Torna al filtre pendent_review
        return Inertia::location(route('client.appointments.index', ['filter' => 'pending_review']));
    }

    /**
     * Cancel·la una cita.
     *
     * @param Appointment $appointment
     * @return RedirectResponse
     */
    public function cancelAppointment(Appointment $appointment)
    {
        if ($appointment->user_id !== auth()->id()) {
            abort(403, 'No tens permís per cancel·lar aquesta cita.');
        }

        $appointment->status = 'cancelled';
        $appointment->save();

        return redirect()->back()->with('success', 'Cita cancel·lada correctament.');
    }

    /**
     * Mostra la llista de serveis disponibles.
     *
     * @return InertiaResponse
     */
    public function indexServices(): InertiaResponse
    {
        $services = Service::all();
        return Inertia::render('Client/Services', ['services' => $services]);
    }
}
