<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Service;
use App\Models\Worker;
use App\Models\Company;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class AdminDashboardController extends Controller
{
    public function index()
    {
        // Estadístiques bàsiques
        $stats = [
            'users' => User::count(),
            'services' => Service::count(),
            'workers' => Worker::count(),
            'companies' => Company::count(),
        ];

        // Dades per als gràfics
        $chartData = [
            'userRegistrations' => $this->getUserRegistrationsByMonth(),
            'servicesByType' => $this->getServicesByType(),
            'companyGrowthByMonth' => $this->getCompanyGrowthByMonth(),
            'workersByLocation' => $this->getWorkersByLocation(),
            'recentActivity' => $this->getRecentActivity(),
        ];

        return Inertia::render('Administrator/AdminDashboard', [
            'stats' => $stats,
            'chartData' => $chartData,
        ]);
    }

    /**
     * Obtenir registres d'usuaris per mes (últims 7 mesos)
     */
    private function getUserRegistrationsByMonth()
    {
        // Crear un array amb els últims 7 mesos
        $months = collect();
        for ($i = 6; $i >= 0; $i--) {
            $months->push(Carbon::now()->subMonths($i));
        }

        // Consulta específica per a SQLite
        $registrations = User::select(
            DB::raw('strftime("%m", created_at) as month'),
            DB::raw('strftime("%Y", created_at) as year'),
            DB::raw('COUNT(*) as count')
        )
            ->where('created_at', '>=', Carbon::now()->subMonths(6)->toDateTimeString())
            ->groupBy('year', 'month')
            ->orderBy('year')
            ->orderBy('month')
            ->get()
            ->keyBy(function ($item) {
                return $item->year . '-' . $item->month;
            });

        // Formatar les dades per al gràfic
        return $months->map(function ($date) use ($registrations) {
            $key = $date->format('Y-m');
            $monthName = $date->locale('ca')->shortMonthName;

            return [
                'month' => $monthName,
                'count' => $registrations->has($key) ? $registrations[$key]->count : 0,
            ];
        })->values();
    }

    /**
     * Obtenir serveis agrupats per tipus
     */
    private function getServicesByType()
    {
        // Utilitzem el camp 'type' que existeix a la taula services
        return Service::select(
            'type as name',
            DB::raw('COUNT(*) as value')
        )
            ->groupBy('type')
            ->orderByDesc('value')
            ->get();
    }

    /**
     * Obtenir creixement de companyies per mes
     */
    private function getCompanyGrowthByMonth()
    {
        $months = collect();
        for ($i = 6; $i >= 0; $i--) {
            $months->push(Carbon::now()->subMonths($i));
        }

        $companies = Company::select(
            DB::raw('strftime("%m", created_at) as month'),
            DB::raw('strftime("%Y", created_at) as year'),
            DB::raw('COUNT(*) as count')
        )
            ->where('created_at', '>=', Carbon::now()->subMonths(6)->toDateTimeString())
            ->groupBy('year', 'month')
            ->orderBy('year')
            ->orderBy('month')
            ->get()
            ->keyBy(function ($item) {
                return $item->year . '-' . $item->month;
            });

        return $months->map(function ($date) use ($companies) {
            $key = $date->format('Y-m');
            $monthName = $date->locale('ca')->shortMonthName;

            return [
                'month' => $monthName,
                'count' => $companies->has($key) ? $companies[$key]->count : 0,
            ];
        })->values();
    }

    /**
     * Obtenir treballadors per ubicació (ciutat)
     * Com que no hi ha camp 'department', utilitzem 'city' en el seu lloc
     */
    private function getWorkersByLocation()
    {
        return Worker::select(
            'city as name',
            DB::raw('COUNT(*) as value')
        )
            ->groupBy('city')
            ->orderByDesc('value')
            ->limit(5)
            ->get();
    }

    /**
     * Obtenir activitat recent
     */
    private function getRecentActivity()
    {
        $activities = collect();

        // Usuaris recents
        $recentUsers = User::select('name', 'created_at')
            ->orderByDesc('created_at')
            ->limit(2)
            ->get()
            ->map(function ($user) {
                return [
                    'title' => 'Nou usuari registrat',
                    'description' => "{$user->name} s'ha registrat com a nou usuari",
                    'time' => $this->formatTimeAgo($user->created_at),
                    'created_at' => $user->created_at,
                ];
            });

        // Serveis recents
        $recentServices = Service::select('name', 'created_at')
            ->orderByDesc('created_at')
            ->limit(2)
            ->get()
            ->map(function ($service) {
                return [
                    'title' => 'Nou servei creat',
                    'description' => "S'ha afegit el servei '{$service->name}'",
                    'time' => $this->formatTimeAgo($service->created_at),
                    'created_at' => $service->created_at,
                ];
            });

        // Companyies recents
        $recentCompanies = Company::select('name', 'created_at')
            ->orderByDesc('created_at')
            ->limit(2)
            ->get()
            ->map(function ($company) {
                return [
                    'title' => 'Nova companyia',
                    'description' => "S'ha registrat la companyia '{$company->name}'",
                    'time' => $this->formatTimeAgo($company->created_at),
                    'created_at' => $company->created_at,
                ];
            });

        // Treballadors recents
        $recentWorkers = Worker::select('name', 'updated_at')
            ->orderByDesc('updated_at')
            ->limit(2)
            ->get()
            ->map(function ($worker) {
                return [
                    'title' => 'Treballador actualitzat',
                    'description' => "S'ha actualitzat la informació del treballador {$worker->name}",
                    'time' => $this->formatTimeAgo($worker->updated_at),
                    'created_at' => $worker->updated_at,
                ];
            });

        // Combinar totes les activitats i ordenar per data
        return $activities->concat($recentUsers)
            ->concat($recentServices)
            ->concat($recentCompanies)
            ->concat($recentWorkers)
            ->sortByDesc('created_at')
            ->take(4)
            ->values()
            ->map(function ($activity) {
                unset($activity['created_at']);
                return $activity;
            });
    }

    /**
     * Formatar temps en català
     */
    private function formatTimeAgo($date)
    {
        $carbon = Carbon::parse($date);
        $now = Carbon::now();

        if ($carbon->isToday()) {
            $diffInHours = $carbon->diffInHours($now);
            if ($diffInHours < 1) {
                $diffInMinutes = $carbon->diffInMinutes($now);
                return "Fa {$diffInMinutes} minuts";
            }
            return "Fa {$diffInHours} hores";
        }

        if ($carbon->isYesterday()) {
            return "Ahir";
        }

        $diffInDays = $carbon->diffInDays($now);
        if ($diffInDays <= 7) {
            return "Fa {$diffInDays} dies";
        }

        return $carbon->locale('ca')->format('d M Y');
    }

    /**
     * Obtenir distribució de companyies per estat/província
     * Gràfic addicional que podries afegir
     */
    private function getCompaniesByState()
    {
        return Company::select(
            'state as name',
            DB::raw('COUNT(*) as value')
        )
            ->whereNotNull('state')
            ->groupBy('state')
            ->orderByDesc('value')
            ->limit(5)
            ->get();
    }

    /**
     * Obtenir treballadors per companyia
     * Gràfic addicional que podries afegir
     */
    private function getWorkersByCompany()
    {
        return Worker::select(
            'companies.name as name',
            DB::raw('COUNT(workers.id) as value')
        )
            ->join('companies', 'workers.company_id', '=', 'companies.id')
            ->groupBy('companies.name')
            ->orderByDesc('value')
            ->limit(5)
            ->get();
    }
}
