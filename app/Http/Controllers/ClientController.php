<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\CompanyService;
use App\Models\Review;
use App\Models\Service;
use App\Models\Appointment;
use App\Models\Worker;
use Illuminate\Database\Eloquent\ModelNotFoundException;
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
     * @param string|int $serviceTypeOrId
     * @return Response
     */
    public function show($serviceTypeOrId): Response
    {
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
            'companies' => $companies
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
                'notes' => 'nullable|string|max:500'
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

            // Trobar un treballador disponible
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
                'company_service_id' => $companyService->id,
                'worker_id' => $availableWorker->id,
                'date' => $validated['date'],
                'time' => $validated['time'],
                'price' => (float)$validated['price'],
                'notes' => $validated['notes'],
                'status' => 'pending'
            ]);

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
     * @return Response
     */
    public function indexAppointments(Request $request): Response
    {
        \Log::info('indexAppointments cridat', [
            'user_id' => auth()->id(),
            'filter' => $request->query('filter')
        ]);

        $filter = $request->query('filter', 'all');

        $query = Appointment::with([
            'company' => fn($query) => $query->select('id', 'name'),
            'service' => fn($query) => $query->select('id', 'name'),
            'companyService' => fn($query) => $query->select('id', 'company_id', 'service_id'),
            'reviews' => fn($query) => $query->where('client_id', auth()->id())->select('id', 'appointment_id', 'rate', 'comment')
        ])
            ->where('user_id', auth()->id())
            ->orderBy('date', 'desc')
            ->orderBy('time', 'desc');

        if ($filter === 'pending') {
            $query->where('status', 'pending');
        } elseif ($filter === 'completed') {
            $query->where('status', 'completed');
        } elseif ($filter === 'pending_review') {
            $query->where('status', 'completed')
                ->whereDoesntHave('reviews', function ($q) {
                    $q->where('client_id', auth()->id());
                });
        }

        $appointments = $query->get()->map(function ($appointment) {
            return [
                'id' => $appointment->id,
                'company' => $appointment->company ? ['name' => $appointment->company->name] : null,
                'service' => $appointment->service ? ['name' => $appointment->service->name] : null,
                'date' => $appointment->date,
                'time' => $appointment->time,
                'price' => $appointment->price,
                'status' => $appointment->status,
                'notes' => $appointment->notes,
                'company_service_id' => $appointment->companyService?->id,
                'review' => $appointment->reviews->first() ? [
                    'id' => $appointment->reviews->first()->id,
                    'rate' => $appointment->reviews->first()->rate,
                    'comment' => $appointment->reviews->first()->comment,
                ] : null,
            ];
        });

        \Log::info('Appointments retornats', [
            'count' => $appointments->count(),
            'data' => $appointments->toArray()
        ]);

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
        if ($appointment->user_id !== auth()->id()) {
            abort(403, 'No tens permís per veure aquesta cita');
        }

        $appointment->load([
            'company' => fn($query) => $query->select('id', 'name'),
            'service' => fn($query) => $query->select('id', 'name', 'type'),
            'worker' => fn($query) => $query->select('id', 'name', 'surname'),
            'companyService' => fn($query) => $query->select('id', 'company_id', 'service_id'),
            'reviews' => fn($query) => $query->where('client_id', auth()->id())
        ]);

        return Inertia::render('Client/AppointmentDetail', [
            'appointment' => [
                'id' => $appointment->id,
                'date' => $appointment->date,
                'time' => $appointment->time,
                'price' => (float)$appointment->price,
                'status' => $appointment->status,
                'notes' => $appointment->notes,
                'company' => $appointment->company,
                'service' => $appointment->service,
                'worker' => $appointment->worker,
                'company_service_id' => $appointment->companyService?->id,
                'review' => $appointment->reviews->first() ? [
                    'rate' => $appointment->reviews->first()->rate,
                    'comment' => $appointment->reviews->first()->comment,
                ] : null,
            ]
        ]);
    }

    /**
     * Mostra la informació d'una empresa.
     *
     * @param int $companyId
     * @return Response
     */
    public function showCompany($companyId): Response
    {
        $company = Company::findOrFail($companyId);
        return Inertia::render('Client/CompanyInfo', ['company' => $company]);
    }

    /**
     * Mostra el formulari per crear o editar una ressenya.
     *
     * @param Request $request
     * @return Response|RedirectResponse
     */
    public function createReview(Request $request): Response|RedirectResponse
    {
        $companyServiceId = $request->query('companyServiceId');
        $appointmentId = $request->query('appointmentId');

        if (!$companyServiceId || !$appointmentId) {
            \Log::error('Falten paràmetres per createReview', [
                'companyServiceId' => $companyServiceId,
                'appointmentId' => $appointmentId
            ]);
            return redirect()->route('client.appointments.index')->withErrors(['error' => 'Falten paràmetres per accedir al formulari de ressenya.']);
        }

        try {
            $companyService = CompanyService::with([
                'company' => fn($query) => $query->select('id', 'name'),
                'service' => fn($query) => $query->select('id', 'name')
            ])->findOrFail($companyServiceId);

            $appointment = Appointment::where('id', $appointmentId)
                ->where('user_id', auth()->id())
                ->where('status', 'completed')
                ->firstOrFail();

            $existingReview = Review::where('client_id', auth()->id())
                ->where('appointment_id', $appointmentId)
                ->first();

            \Log::info('createReview dades', [
                'companyServiceId' => $companyService->id,
                'appointmentId' => $appointment->id,
                'existingReview' => $existingReview ? $existingReview->id : null
            ]);

            return Inertia::render('Client/ReviewForm', [
                'companyService' => [
                    'id' => $companyService->id,
                    'company' => $companyService->company ? ['name' => $companyService->company->name] : null,
                    'service' => $companyService->service ? ['name' => $companyService->service->name] : null,
                ],
                'appointment' => [
                    'id' => $appointment->id,
                ],
                'existingReview' => $existingReview ? [
                    'id' => $existingReview->id,
                    'rate' => $existingReview->rate,
                    'comment' => $existingReview->comment,
                ] : null,
            ]);

        } catch (ModelNotFoundException $e) {
            \Log::error('Recurs no trobat a createReview', [
                'companyServiceId' => $companyServiceId,
                'appointmentId' => $appointmentId,
                'error' => $e->getMessage()
            ]);
            return redirect()->route('client.appointments.index')->withErrors(['error' => 'No s\'ha trobat la informació necessària per crear la ressenya.']);
        } catch (\Exception $e) {
            \Log::error('Error inesperat a createReview: ' . $e->getMessage(), [
                'companyServiceId' => $companyServiceId,
                'appointmentId' => $appointmentId
            ]);
            return redirect()->route('client.appointments.index')->withErrors(['error' => 'S\'ha produït un error inesperat.']);
        }
    }

    /**
     * Guarda una nova ressenya.
     *
     * @param Request $request
     * @return RedirectResponse
     */
    public function storeReview(Request $request): RedirectResponse
    {
        \Log::info('storeReview cridat', [
            'user_id' => auth()->id(),
            'data' => $request->all()
        ]);

        try {
            $validated = $request->validate([
                'company_service_id' => 'required|exists:companies_services,id',
                'appointment_id' => 'required|exists:appointments,id',
                'rate' => 'required|integer|min:1|max:5',
                'comment' => 'required|string|max:1000',
            ]);

            $appointment = Appointment::where('id', $validated['appointment_id'])
                ->where('user_id', auth()->id())
                ->where('status', 'completed')
                ->firstOrFail();

            $existingReview = Review::where('client_id', auth()->id())
                ->where('appointment_id', $validated['appointment_id'])
                ->first();

            if ($existingReview) {
                \Log::warning('Intent de crear review duplicada', [
                    'appointment_id' => $validated['appointment_id'],
                    'existing_review_id' => $existingReview->id
                ]);
                return redirect()->route('client.appointments.index')->withErrors(['error' => 'Ja has deixat una ressenya per aquesta cita.']);
            }

            Review::create([
                'client_id' => auth()->id(),
                'company_service_id' => $validated['company_service_id'],
                'appointment_id' => $validated['appointment_id'],
                'rate' => $validated['rate'],
                'comment' => $validated['comment'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            \Log::info('Ressenya creada', [
                'appointment_id' => $validated['appointment_id'],
                'company_service_id' => $validated['company_service_id']
            ]);

            return redirect()->route('client.appointments.index')->with('success', 'Ressenya creada amb èxit!');

        } catch (ModelNotFoundException $e) {
            \Log::error('Cita no trobada a storeReview', [
                'appointment_id' => $request->input('appointment_id'),
                'error' => $e->getMessage()
            ]);
            return back()->withErrors(['error' => 'La cita especificada no existeix o no et pertany.']);
        } catch (\Exception $e) {
            \Log::error('Error a storeReview: ' . $e->getMessage(), [
                'data' => $request->all()
            ]);
            return back()->withErrors(['error' => 'S\'ha produït un error en crear la ressenya.']);
        }
    }

    /**
     * Actualitza una ressenya existent.
     *
     * @param Request $request
     * @param Review $review
     * @return RedirectResponse
     */
    public function updateReview(Request $request, Review $review): RedirectResponse
    {
        \Log::info('updateReview cridat', [
            'user_id' => auth()->id(),
            'review_id' => $review->id,
            'data' => $request->all()
        ]);

        try {
            if ($review->client_id !== auth()->id()) {
                \Log::warning('Accés no autoritzat a updateReview', [
                    'review_id' => $review->id,
                    'user_id' => auth()->id()
                ]);
                abort(403, 'No tens permís per editar aquesta ressenya');
            }

            $validated = $request->validate([
                'rate' => 'required|integer|min:1|max:5',
                'comment' => 'required|string|max:1000',
            ]);

            $review->update([
                'rate' => $validated['rate'],
                'comment' => $validated['comment'],
                'updated_at' => now(),
            ]);

            \Log::info('Ressenya actualitzada', [
                'review_id' => $review->id
            ]);

            return redirect()->route('client.appointments.index')->with('success', 'Ressenya actualitzada amb èxit!');

        } catch (\Exception $e) {
            \Log::error('Error a updateReview: ' . $e->getMessage(), [
                'review_id' => $review->id,
                'data' => $request->all()
            ]);
            return back()->withErrors(['error' => 'S\'ha produït un error en actualitzar la ressenya.']);
        }
    }
}
