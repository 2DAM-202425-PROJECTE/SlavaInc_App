<?php

namespace App\Services;

use App\Models\Appointment;
use App\Models\Company;
use App\Models\Notification;
use App\Models\Plan;
use App\Models\Review;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Collection;
use Carbon\Carbon;
use Illuminate\Pagination\LengthAwarePaginator;

class CompanyStatsService
{
    protected int $companyId;
    protected Company $company;

    public function __construct(int $companyId)
    {
        $this->companyId = $companyId;
        $this->company = Company::with(['workers', 'services', 'plan'])->findOrFail($companyId);
    }

    public function getAll(): array
    {
        return [
            'info' => $this->getCompanyInfo(),
            'plan' => $this->company->plan,
            'workers' => $this->company->workers()->paginate(6, ['*'], 'workers_page'),
            'services' => $this->prepareServices(),
            'stats' => $this->getStats(),
            'monthlyStats' => $this->getMonthlyStats(),
            'clientReviews' => $this->getClientReviews(),
            'plans' => $this->getPlans(),
            'appointments' => $this->getOngoingAppointments(),
            'notifications' => $this->getNotifications(),
            'notifications_system' => $this->company->notifications_system,
            'notifications_appointments' => $this->company->notifications_appointments,
            'notifications_reviews' => $this->company->notifications_reviews,
            'charts' => $this->getCharts(),
            'advancedStats' => $this->getAdvancedStats(),
            'monthlyAdvancedStats' => $this->getMonthlyAdvancedStats(),

        ];
    }

    private function getCompanyInfo(): array
    {
        return $this->company->only([
            'id', 'name', 'email', 'phone', 'website',
            'address', 'city', 'state', 'zip_code',
            'logo', 'description', 'founded_year', 'vat_number',
            'company_type', 'is_verified', 'is_active',
            'latitude', 'longitude', 'notes',
        ]);
    }



    private function prepareServices(): LengthAwarePaginator
    {
        $perPage = 6;

        $services = $this->company->services()
            ->paginate($perPage, ['*'], 'services_page')
            ->withQueryString();

        $services->getCollection()->transform(function ($item) {
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
                'completedProjects' => Appointment::where('company_id', $this->companyId)
                    ->where('status', 'completed')
                    ->count(),
            ];
        });

        return $services;
    }



    private function getStats(): array
    {
        $services = $this->prepareServices();
        $totalWorkers = $this->company->workers->count();
        $activeWorkers = $this->company->workers->where('status', 'active')->count();
        $ongoingProjects = Appointment::where('company_id', $this->companyId)
            ->whereIn('status', ['pending', 'confirmed'])->count();

        $mostRequested = Appointment::where('company_id', $this->companyId)
            ->select('service_id', DB::raw('count(*) as total'))
            ->groupBy('service_id')
            ->orderByDesc('total')
            ->first();

        $currentYearIncome = Appointment::where('company_id', $this->companyId)
            ->where('status', 'completed')
            ->whereYear('date', now()->year)
            ->sum('price');

        $previousYearIncome = Appointment::where('company_id', $this->companyId)
            ->where('status', 'completed')
            ->whereYear('date', now()->subYear()->year)
            ->sum('price');

        $yearlyGrowth = $previousYearIncome > 0
            ? round((($currentYearIncome - $previousYearIncome) / $previousYearIncome) * 100, 1)
            : 0;

        $appointments = Appointment::where('company_id', $this->companyId)->get();

        $totalClients = $appointments->pluck('user_id')->unique()->count();
        $repeatedClients = $appointments->groupBy('user_id')->filter(fn($group) => $group->count() > 1)->count();

        $retentionRate = $totalClients > 0
            ? round(($repeatedClients / $totalClients) * 100)
            : 0;

        $completedProjects = $appointments->where('status', 'completed')->count();

        return [
            'totalWorkers' => $totalWorkers,
            'activeWorkers' => $activeWorkers,
            'inactiveWorkers' => $totalWorkers - $activeWorkers,
            'totalServices' => $services->total(),
            'completedProjects' => $completedProjects,
            'ongoingProjects' => $ongoingProjects,
            'clientsRating' => round(Review::whereHas('companyService', fn($q) => $q->where('company_id', $this->companyId))->avg('rate'), 1),
            'totalReviews' => Review::whereHas('companyService', fn($q) => $q->where('company_id', $this->companyId))->count(),
            'positiveReviews' => Review::whereHas('companyService', fn($q) => $q->where('company_id', $this->companyId))->where('rate', '>=', 2.5)->count(),
            'negativeReviews' => Review::whereHas('companyService', fn($q) => $q->where('company_id', $this->companyId))->where('rate', '<', 2.5)->count(),
            'monthlyIncome' => Appointment::where('company_id', $this->companyId)
                ->where('status', 'completed')
                ->whereMonth('date', now()->month)
                ->whereYear('date', now()->year)
                ->sum('price'),
            'yearlyGrowth' => $yearlyGrowth,
            'mostRequestedService' => optional($mostRequested?->service)->name ?? 'Cap',
            'averageProjectDuration' => rand(30, 60),
            'clientRetentionRate' => $retentionRate,
            'currentPlan' => $this->company->plan?->name ?? 'Sense pla',
        ];
    }

    private function getMonthlyStats(): Collection
    {
        return collect(range(1, now()->month))->map(function ($month) {
            $start = Carbon::create(null, $month, 1)->startOfMonth();
            $end = $start->copy()->endOfMonth();

            $completedAppointments = Appointment::where('company_id', $this->companyId)
                ->where('status', 'completed')
                ->whereBetween('date', [$start, $end])
                ->get();

            $income = $completedAppointments->sum('price');
            $projects = $completedAppointments->count();

            $activeWorkers = $this->company->workers
                ->where('status', 'active')
                ->filter(fn($worker) => $worker->created_at <= $end)
                ->count();

            return [
                'month' => $start->format('M'),
                'income' => $income,
                'projects' => $projects,
                'workers' => $activeWorkers,
            ];
        });
    }




    private function getClientReviews(): LengthAwarePaginator
    {
        return Review::with(['client', 'companyService.service'])
            ->whereHas('companyService', fn($q) => $q->where('company_id', $this->companyId))
            ->latest()
            ->paginate(2, ['*'], 'reviews_page')
            ->withQueryString()
            ->through(fn($r) => [
                'id' => $r->id,
                'clientName' => $r->client->name ?? 'Anònim',
                'rating' => $r->rate,
                'comment' => $r->comment,
                'date' => $r->created_at->format('Y-m-d'),
                'service' => $r->companyService->service->name ?? 'Servei desconegut',
            ]);
    }

    private function getPlans(): Collection
    {
        return Plan::all()->map(fn($p) => [
            'id' => $p->id,
            'name' => $p->name,
            'price' => $p->price,
            'features' => $p->features ?? [],
            'isActive' => $this->company->plan_id === $p->id,
        ]);
    }

    private function getOngoingAppointments(): LengthAwarePaginator
    {
        $perPage = 2;

        return Appointment::with(['service', 'user', 'workers'])
            ->where('company_id', $this->companyId)
            ->whereIn('status', ['pending', 'confirmed'])
            ->latest('date')
            ->paginate(2, ['*'], 'appointments_page')
            ->withQueryString()
            ->through(fn($a) => [
                'id' => $a->id,
                'date' => $a->date,
                'time' => $a->time,
                'price' => $a->price,
                'status' => $a->status,
                'notes' => $a->notes,
                'service' => $a->service?->name,
                'user' => $a->user?->name,
                'worker' => $a->workers->pluck('name')->implode(', '),
            ]);
    }
    private function getNotifications(): Collection
    {
        return Notification::where('company_id', $this->companyId)
            ->orderBy('created_at', 'desc')->take(10)->get();
    }

    private function getCharts(): array
    {
        return [
            // Serveis més sol·licitats (quantitat de cites per servei)
            'mostRequestedServicesPie' => Appointment::where('company_id', $this->companyId)
                ->select('service_id', DB::raw('count(*) as total'))
                ->whereMonth('date', now()->month) // Filtrem per mes actual
                ->whereYear('date', now()->year)
                ->groupBy('service_id')
                ->with('service:id,name')->get()
                ->map(fn($i) => [
                    'label' => $i->service?->name ?? 'Desconegut',
                    'value' => $i->total,
                    'service_id' => $i->service_id,
                ]),

            // Serveis millor valorats (mitjana de valoració per servei aquest mes)
            'topRatedServicesPie' => Review::whereHas('companyService', fn($q) => $q->where('company_id', $this->companyId))
                ->whereMonth('created_at', now()->month)
                ->whereYear('created_at', now()->year)
                ->with('companyService.service')->get()
                ->groupBy(fn($r) => $r->companyService?->service?->id ?? 0)
                ->map(function ($g, $id) {
                    $name = $g->first()->companyService?->service?->name ?? 'Desconegut';
                    return [
                        'label' => $name,
                        'value' => round($g->avg('rate'), 2),
                        'service_id' => (int) $id,
                    ];
                })->values(),

            // Ingressos per servei (acumulat aquest mes)
            'revenuePerServicePie' => Appointment::where('company_id', $this->companyId)
                ->where('status', 'completed')
                ->whereMonth('date', now()->month)
                ->whereYear('date', now()->year)
                ->select('service_id', DB::raw('SUM(price) as total'))
                ->groupBy('service_id')
                ->with('service:id,name')->get()
                ->map(fn($i) => [
                    'label' => $i->service?->name ?? 'Desconegut',
                    'value' => round($i->total, 2),
                    'service_id' => $i->service_id,
                ]),

            // Nombre de ressenyes per servei (aquest mes)
            'reviewsPerServicePie' => Review::whereHas('companyService', fn($q) => $q->where('company_id', $this->companyId))
                ->whereMonth('created_at', now()->month)
                ->whereYear('created_at', now()->year)
                ->with('companyService.service')->get()
                ->groupBy(fn($r) => $r->companyService?->service?->id ?? 0)
                ->map(function ($g, $id) {
                    $name = $g->first()->companyService?->service?->name ?? 'Desconegut';
                    return [
                        'label' => $name,
                        'value' => count($g),
                        'service_id' => (int) $id,
                    ];
                })->values(),
        ];
    }



    private function getAdvancedStats(): array
    {
        $appointments = Appointment::where('company_id', $this->companyId)->get();
        $total = $appointments->count();
        $cancelled = $appointments->where('status', 'cancelled')->count();
        $completed = $appointments->where('status', 'completed')->count();
        $cancelRate = $total ? round(($cancelled / $total) * 100, 1) : 0;
        $completionRate = $total ? round(($completed / $total) * 100, 1) : 0;

        $timeDiffs = $appointments->filter(fn($a) => $a->created_at && $a->date)
            ->map(fn($a) => $a->created_at->diffInDays($a->date, false));
        return [
            'cancelRate' => $cancelRate,
            'completionRate' => $completionRate,
            'avgTimeToAppointment' => $timeDiffs->isNotEmpty()
                ? round($timeDiffs->avg(), 1)
                : null,
            'uniqueClients' => $appointments->pluck('user_id')->unique()->count(),
            'repeatClients' => $total - $appointments->pluck('user_id')->unique()->count(),
            'appointmentsByStatus' => $appointments->groupBy('status')->map(fn($g) => $g->count()),
            'servicesWithCancellations' => Appointment::where('company_id', $this->companyId)
                ->where('status', 'cancelled')
                ->select('service_id', DB::raw('count(*) as total'))
                ->groupBy('service_id')
                ->with('service:id,name')->get()
                ->map(fn($i) => [ 'label' => $i->service?->name ?? 'Desconegut', 'value' => $i->total ]),
            'monthlyAverageRatings' => Review::whereHas('companyService', fn($q) => $q->where('company_id', $this->companyId))
                ->select(DB::raw("strftime('%m', created_at) as month"), DB::raw('AVG(rate) as avg_rating'))
                ->groupBy(DB::raw("strftime('%m', created_at)"))->get()
                ->map(fn($i) => [
                    'month' => Carbon::create()->month((int) $i->month)->format('M'),
                    'value' => round($i->avg_rating, 1),
                ]),
        ];
    }

    private function getMonthlyAdvancedStats(): Collection
    {
        return collect(range(1, 12))->map(function ($month) {
            $appointments = Appointment::where('company_id', $this->companyId)
                ->whereMonth('date', $month)
                ->whereYear('date', now()->year)
                ->get();

            $total = $appointments->count();
            $cancelled = $appointments->where('status', 'cancelled')->count();
            $completed = $appointments->where('status', 'completed')->count();

            $timeDiffs = $appointments->filter(fn($a) => $a->created_at && $a->date)
                ->map(fn($a) => $a->date->diffInDays($a->created_at));

            return [
                'month' => Carbon::create()->month($month)->format('M'),
                'cancelRate' => $total ? round(($cancelled / $total) * 100, 1) : 0,
                'completionRate' => $total ? round(($completed / $total) * 100, 1) : 0,
                'avgTimeToAppointment' => $timeDiffs->isNotEmpty() ? round($timeDiffs->avg(), 1) : 0,
                'income' => $appointments->where('status', 'completed')->sum('price'),
                'completedProjects' => $completed,
            ];
        });
    }

}
