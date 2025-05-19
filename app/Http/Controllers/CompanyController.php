<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Company;
use App\Models\Review;
use App\Models\Notification;
use App\Models\Worker;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use App\Models\Plan;
use Inertia\Response;

class CompanyController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Company/Dashboard', [
            'company' => $this->getCompanyFullData(),
        ]);
    }

    public function getCompanyFullData(): array
    {
        // Verificar si el usuario autenticado es una empresa o un trabajador con permisos de administrador
        if (Auth::guard('company')->check()) {
            // Es una empresa
            $company = Auth::guard('company')->user();
            $companyId = $company->id;
        } elseif (Auth::guard('worker')->check()) {
            // Es un trabajador
            $worker = Auth::guard('worker')->user();

            // Verificar si el trabajador tiene permisos de administrador
            if (!$worker->is_admin) {
                abort(403, 'No tienes permisos para acceder a esta página');
            }

            // Obtener el ID de la empresa asociada al trabajador
            $companyId = $worker->company_id;

            if (!$companyId) {
                abort(404, 'No se encontró una empresa asociada a este trabajador');
            }
        } else {
            // No hay usuario autenticado o no es del tipo correcto
            abort(403, 'No tienes permisos para acceder a esta página');
        }

        // Obtener los datos completos de la empresa
        $companyData = Company::with([
            'workers',
            'services',
            'plan',
        ])->findOrFail($companyId);

        // Preparar serveis
        $services = $companyData->services->map(function ($item) {
            return [
                'id' => $item->pivot->id ?? null,
                'service_id' => $item->id,
                'company_id' => $item->pivot->company_id,
                'name' => $item->name,
                'custom_name' => $item->pivot->custom_name,
                'description' => $item->pivot->description,
                'type' => $item->type,
                'price_per_unit' => $item->pivot->price_per_unit,
                'unit' => $item->pivot->unit,
                'min_price' => $item->pivot->min_price,
                'max_price' => $item->pivot->max_price,
                'logo' => $item->pivot->logo,
                'status' => 'active',
                'completedProjects' => rand(25, 50),
                'averageRating' => round(mt_rand(40, 50) / 10, 1),
                'totalRevenue' => rand(20000, 120000),
            ];
        });

        // Estadístiques bàsiques
        $totalWorkers = $companyData->workers->count();
        $activeWorkers = $companyData->workers->where('status', 'active')->count();
        $inactiveWorkers = $totalWorkers - $activeWorkers;

        $totalServices = $services->count();
        $activeServices = $services->where('status', 'active')->count();

        $completedProjects = $services->sum('completedProjects');

        $ongoingProjects = Appointment::where('company_id', $companyId)
            ->whereIn('status', ['pending', 'confirmed'])
            ->count();

        $clientReviews = Review::with(['client', 'companyService.service'])
            ->whereHas('companyService', function ($query) use ($companyId) {
                $query->where('company_id', $companyId);
            })
            ->latest()
            ->take(10)
            ->get()
            ->map(function ($review) {
                return [
                    'id' => $review->id,
                    'clientName' => $review->client->name ?? 'Anònim',
                    'rating' => $review->rate,
                    'comment' => $review->comment,
                    'date' => $review->created_at->format('Y-m-d'),
                    'service' => $review->companyService->service->name ?? 'Servei desconegut',
                ];
            });
        $totalReviews = $clientReviews->count();
        $clientsRating = $totalReviews > 0 ? round($clientReviews->avg('rating'), 1) : 0;
        $positiveReviews = $clientReviews->where('rating', '>=', 2.5)->count();
        $negativeReviews = $clientReviews->where('rating', '<', 2.5)->count();


        $monthlyIncome = rand(20000, 30000);
        $yearlyGrowth = rand(10, 30);

        $mostRequestedServiceId = Appointment::where('company_id', $companyId)
            ->select('service_id', DB::raw('count(*) as total'))
            ->groupBy('service_id')
            ->orderByDesc('total')
            ->first()?->service_id;

        $mostRequestedService = $mostRequestedServiceId
            ? \App\Models\Service::find($mostRequestedServiceId)?->name
            : 'Cap';

        $averageProjectDuration = rand(30, 60);
        $clientRetentionRate = rand(70, 95);

        $stats = [
            'totalWorkers' => $totalWorkers,
            'activeWorkers' => $activeWorkers,
            'inactiveWorkers' => $inactiveWorkers,
            'totalServices' => $totalServices,
            'activeServices' => $activeServices,
            'completedProjects' => $completedProjects,
            'ongoingProjects' => $ongoingProjects,
            'clientsRating' => $clientsRating,
            'totalReviews' => $totalReviews,
            'positiveReviews' => $positiveReviews,
            'negativeReviews' => $negativeReviews,
            'monthlyIncome' => $monthlyIncome,
            'yearlyGrowth' => $yearlyGrowth,
            'mostRequestedService' => $mostRequestedService,
            'averageProjectDuration' => $averageProjectDuration,
            'clientRetentionRate' => $clientRetentionRate,
            'currentPlan' => $companyData->plan?->name ?? 'Sense pla',
        ];

        $monthlyStats = collect([
            'Gen', 'Feb', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Des'
        ])->map(function ($month) {
            return [
                'month' => $month,
                'workers' => rand(8, 12),
                'services' => rand(5, 8),
                'projects' => rand(10, 16),
                'income' => rand(18000, 26000),
            ];
        });



        $plans = Plan::all()->map(function ($plan) use ($companyData) {
            return [
                'id' => $plan->id,
                'name' => $plan->name,
                'price' => $plan->price,
                'features' => $plan->features ?? [],
                'isActive' => $companyData->plan_id === $plan->id,
            ];
        });

        $ongoingAppointments = Appointment::with(['service', 'user', 'workers'])
            ->where('company_id', $company->id)

            ->whereIn('status', ['pending', 'confirmed'])
            ->latest('date')
            ->take(15)
            ->get()
            ->map(function ($appointment) {
                return [
                    'id' => $appointment->id,
                    'date' => $appointment->date,
                    'time' => $appointment->time,
                    'price' => $appointment->price,
                    'status' => $appointment->status,
                    'notes' => $appointment->notes,
                    'service' => $appointment->service?->name,
                    'user' => $appointment->user?->name,
                    'worker' => $appointment->worker?->name,
                ];
            });

        $notifications = Notification::where('company_id', $companyId)
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get();

        return [
            'info' => $companyData->only([
                'id', 'name', 'email', 'phone', 'website',
                'address', 'city', 'state', 'zip_code',
                'logo', 'description', 'founded_year', 'vat_number',
                'company_type', 'is_verified', 'is_active',
                'latitude', 'longitude', 'notes',
            ]),
            'workers' => $companyData->workers,
            'services' => $services,
            'stats' => $stats,
            'monthlyStats' => $monthlyStats,
            'clientReviews' => $clientReviews,
            'plans' => $plans,
            'appointments' => $ongoingAppointments,
            'notifications' => $notifications,
            'notifications_system' => $companyData->notifications_system,
            'notifications_appointments' => $companyData->notifications_appointments,
            'notifications_reviews' => $companyData->notifications_reviews,
        ];
    }

    public function show(Company $company, Request $request): Response
    {
        $averageRating = Review::whereHas('companyService', function ($query) use ($company) {
            $query->where('company_id', $company->id);
        })->avg('rate');

        $reviews = Review::whereHas('companyService', function ($query) use ($company) {
            $query->where('company_id', $company->id);
        })->select('rate', 'comment', 'created_at')->get();

        return Inertia::render('Client/CompanyInfo', [
            'company' => [
                'id' => $company->id,
                'name' => $company->name,
                'email' => $company->email,
                'phone' => $company->phone,
                'address' => $company->address,
                'city' => $company->city,
                'state' => $company->state,
                'zip_code' => $company->zip_code,
                'logo' => $company->logo,
                'description' => $company->description,
                'average_rating' => $averageRating ? round($averageRating, 1) : null,
                'reviews' => $reviews,
            ],
            'serviceId' => $request->input('serviceId')
        ]);
    }

    public function updateNotifications(Request $request)
    {
        // Determinar si el usuario es una empresa o un trabajador administrador
        if (Auth::guard('company')->check()) {
            $company = Auth::guard('company')->user();
        } elseif (Auth::guard('worker')->check()) {
            $worker = Auth::guard('worker')->user();
            if (!$worker->is_admin) {
                abort(403, 'No tienes permisos para realizar esta acción');
            }
            $company = Company::findOrFail($worker->company_id);
        } else {
            abort(403, 'No tienes permisos para realizar esta acción');
        }

        $validated = $request->validate([
            'field' => 'required|in:notifications_system,notifications_appointments,notifications_reviews',
            'value' => 'required|boolean',
        ]);

        $company->update([
            $validated['field'] => $validated['value'],
        ]);

        return redirect()->route('dashboard')->with('success', 'Preferència de notificació actualitzada correctament.');
    }

    public function updateProfile(Request $request)
    {
        // Determinar si el usuario es una empresa o un trabajador administrador
        if (Auth::guard('company')->check()) {
            $company = Auth::guard('company')->user();
        } elseif (Auth::guard('worker')->check()) {
            $worker = Auth::guard('worker')->user();
            if (!$worker->is_admin) {
                abort(403, 'No tienes permisos para realizar esta acción');
            }
            $company = Company::findOrFail($worker->company_id);
        } else {
            abort(403, 'No tienes permisos para realizar esta acción');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'vat_number' => 'nullable|string|max:255',
            'founded_year' => 'nullable|integer',
            'company_type' => 'nullable|string|max:255',
            'description' => 'nullable|string',

            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'state' => 'nullable|string|max:255',
            'zip_code' => 'nullable|string|max:20',
            'phone' => 'nullable|string|max:20',
            'email' => 'required|email|max:255',
            'website' => 'nullable|string|max:255',
        ]);

        $company->update($validated);
        $this->createSystemNotification($company, 'profile_updated', [], "S'ha actualitzat el perfil de l'empresa.");

        return response()->json([
            'message' => 'Perfil actualitzat correctament.',
            'company' => $company,
        ]);
    }

    public function changePlan(Request $request)
    {
        // Determinar si el usuario es una empresa o un trabajador administrador
        if (Auth::guard('company')->check()) {
            $company = Auth::guard('company')->user();
        } elseif (Auth::guard('worker')->check()) {
            $worker = Auth::guard('worker')->user();
            if (!$worker->is_admin) {
                abort(403, 'No tienes permisos para realizar esta acción');
            }
            $company = Company::findOrFail($worker->company_id);
        } else {
            abort(403, 'No tienes permisos para realizar esta acción');
        }

        $validated = $request->validate([
            'plan_id' => 'required|exists:plans,id',
        ]);

        $company->update(['plan_id' => $validated['plan_id']]);

        $company->refresh();
        $this->createSystemNotification($company, 'plan_changed', [
            'plan_id' => $validated['plan_id'],
        ], "S'ha canviat el pla de subscripció.");
        return response()->json([
            'message' => 'Subscripció canviada correctament.',
            'plan_id' => $company->plan_id,
        ]);
    }

    public function previewClient()
    {
        session(['impersonating_client' => true]);
        return redirect()->route('dashboard');
    }

    public function exitPreview()
    {
        session()->forget('impersonating_client');
        return redirect()->route('dashboard');
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => ['required'],
            'new_password' => ['required', 'min:8', 'confirmed'],
        ]);

        // Determinar si el usuario es una empresa o un trabajador administrador
        if (Auth::guard('company')->check()) {
            $company = Auth::guard('company')->user();

            if (!\Hash::check($request->current_password, $company->password)) {
                return response()->json([
                    'message' => 'La contrasenya actual no és correcta.',
                ], 422);
            }

            $company->password = bcrypt($request->new_password);
            $company->save();
            $this->createSystemNotification(
                $company,
                'password_updated',
                [],
                "La contrasenya s'ha actualitzat correctament."
            );
        } elseif (Auth::guard('worker')->check()) {
            $worker = Auth::guard('worker')->user();
            if (!$worker->is_admin) {
                abort(403, 'No tienes permisos para realizar esta acción');
            }

            if (!\Hash::check($request->current_password, $worker->password)) {
                return response()->json([
                    'message' => 'La contrasenya actual no és correcta.',
                ], 422);
            }

            $worker->password = bcrypt($request->new_password);
            $worker->save();

            // Notificar a la empresa asociada
            $company = Company::findOrFail($worker->company_id);
            $this->createSystemNotification(
                $company,
                'worker_password_updated',
                ['worker_id' => $worker->id, 'worker_name' => $worker->name],
                "El treballador {$worker->name} ha actualitzat la seva contrasenya."
            );
        } else {
            abort(403, 'No tienes permisos para realizar esta acción');
        }


        return response()->json([
            'message' => 'Contrasenya actualitzada correctament.',
        ]);
    }

    protected function createSystemNotification($company, $action, $data = [], $message = null)
    {
        if (!$company->notifications_system) return;

        $company->notifications()->create([
            'type' => 'system',
            'action' => $action,
            'data' => $data,
            'message' => $message,
        ]);
    }
}
