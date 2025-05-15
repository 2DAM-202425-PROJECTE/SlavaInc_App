<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Worker;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Plan;

class CompanyController extends Controller
{
    public function index()
    {
        $user = Auth::guard('company')->user();

        // Carreguem l'empresa amb els treballadors i serveis associats
        $company = Company::where('id', $user->id)
            ->with(['workers', 'services' => function ($query) {
                $query->withPivot('price_per_unit', 'unit', 'min_price', 'max_price', 'logo','custom_name', 'description');
            }])
            ->first();

        return Inertia::render('Company/Dashboard', [
            'companyData' => [
                'user_info' => $user->only('id', 'name', 'email'),
                'company_details' => [
                    'info' => $company,
                    'workers' => $company->workers ?? [],
                    'services' => $company->services ?? []
                ]
            ]
        ]);
    }

    public function profile()
    {
        return Inertia::render('Company/Profile', [
            'company' => $this->getCompanyFullData(),
        ]);
    }


    public function getCompanyFullData()
    {
        $company = Auth::guard('company')->user();

        $companyData = Company::with([
            'workers',
            'services',
            'plan', // carregar també el pla actiu
        ])->findOrFail($company->id);

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
        $ongoingProjects = rand(5, 15);

        $clientsRating = round($services->avg('averageRating'), 1);
        $totalReviews = rand(50, 100);
        $positiveReviews = rand(45, $totalReviews);
        $negativeReviews = $totalReviews - $positiveReviews;

        $monthlyIncome = rand(20000, 30000);
        $yearlyGrowth = rand(10, 30);

        $mostRequestedService = $services->sortByDesc('completedProjects')->first()?->name ?? 'Cap';
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

        $clientReviews = [
            [
                'id' => 1,
                'clientName' => 'Empresa ABC',
                'rating' => 5,
                'comment' => 'Excel·lent servei, molt professionals i eficients.',
                'date' => '2023-10-15',
                'service' => 'Neteja d\'Oficines',
            ],
            [
                'id' => 2,
                'clientName' => 'Botiga XYZ',
                'rating' => 4,
                'comment' => 'Bona experiència en general, recomanable.',
                'date' => '2023-09-22',
                'service' => 'Neteja de Locals',
            ],
            [
                'id' => 3,
                'clientName' => 'Restaurant 123',
                'rating' => 5,
                'comment' => 'Resultats impressionants, han superat les nostres expectatives.',
                'date' => '2023-11-05',
                'service' => 'Neteja de Vidres',
            ],
        ];

        // 🔁 Carreguem els plans reals de la taula plans
        $plans = Plan::all()->map(function ($plan) use ($companyData) {
            return [
                'id' => $plan->id,
                'name' => $plan->name,
                'price' => $plan->price,
                'features' => $plan->features ?? [],
                'isActive' => $companyData->plan_id === $plan->id,
            ];
        });

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
        ];
    }

    //Funcio per crear treballadors associats a l'empresa
//    public function createWorker(Request $request)
//    {
//        $request->validate([
//            'name' => 'required|string|max:255',
//            'email' => 'required|string|email|max:255|unique:workers',
//            'phone' => 'required|string|max:20',
//            'address' => 'required|string|max:255',
//            'is_admin' => 'nullable|boolean', // El rol admin es pot activar o desactivar
//        ]);
//
//        // Crear el treballador amb el rol is_company desactivat per defecte
//        $worker = Worker::create([
//            'company_id' => Auth::guard('company')->user()->id,
//            'name' => $request->name,
//            'email' => $request->email,
//            'phone' => $request->phone,
//            'address' => $request->address,
//            'is_admin' => $request->is_admin ?? false, // Només es pot activar si s'indica
//            'is_company' => false, // Sempre desactivat
//        ]);
//
//        return redirect()->route('company.dashboard')->with('success', 'Treballador creat correctament.');
//    }

}
