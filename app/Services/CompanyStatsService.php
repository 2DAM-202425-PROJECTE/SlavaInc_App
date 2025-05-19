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
            'workers' => $this->company->workers,
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

    private function prepareServices(): Collection
    {
        return $this->company->services->map(function ($item) {
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

        return [
            'totalWorkers' => $totalWorkers,
            'activeWorkers' => $activeWorkers,
            'inactiveWorkers' => $totalWorkers - $activeWorkers,
            'totalServices' => $services->count(),
            'activeServices' => $services->where('status', 'active')->count(),
            'completedProjects' => $services->sum('completedProjects'),
            'ongoingProjects' => $ongoingProjects,
            'clientsRating' => round(Review::whereHas('companyService', fn($q) => $q->where('company_id', $this->companyId))->avg('rate'), 1),
            'totalReviews' => Review::whereHas('companyService', fn($q) => $q->where('company_id', $this->companyId))->count(),
            'positiveReviews' => Review::whereHas('companyService', fn($q) => $q->where('company_id', $this->companyId))->where('rate', '>=', 2.5)->count(),
            'negativeReviews' => Review::whereHas('companyService', fn($q) => $q->where('company_id', $this->companyId))->where('rate', '<', 2.5)->count(),
            'monthlyIncome' => rand(20000, 30000),
            'yearlyGrowth' => rand(10, 30),
            'mostRequestedService' => optional($mostRequested?->service)->name ?? 'Cap',
            'averageProjectDuration' => rand(30, 60),
            'clientRetentionRate' => rand(70, 95),
            'currentPlan' => $this->company->plan?->name ?? 'Sense pla',
        ];
    }

    private function getMonthlyStats(): Collection
    {
        return collect(['Gen', 'Feb', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Des'])
            ->map(fn($m) => [
                'month' => $m,
                'workers' => rand(8, 12),
                'services' => rand(5, 8),
                'projects' => rand(10, 16),
                'income' => rand(18000, 26000),
            ]);
    }

    private function getClientReviews(): Collection
    {
        return Review::with(['client', 'companyService.service'])
            ->whereHas('companyService', fn($q) => $q->where('company_id', $this->companyId))
            ->latest()->take(10)->get()->map(fn($r) => [
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

    private function getOngoingAppointments(): Collection
    {
        return Appointment::with(['service', 'user', 'workers'])
            ->where('company_id', $this->companyId)
            ->whereIn('status', ['pending', 'confirmed'])
            ->latest('date')->take(15)->get()
            ->map(fn($a) => [
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
            'mostRequestedServicesPie' => Appointment::where('company_id', $this->companyId)
                ->select('service_id', DB::raw('count(*) as total'))
                ->groupBy('service_id')
                ->with('service:id,name')->get()
                ->map(fn($i) => [
                    'label' => $i->service?->name ?? 'Desconegut',
                    'value' => $i->total,
                    'service_id' => $i->service_id,
                ]),

            'topRatedServicesPie' => Review::whereHas('companyService', fn($q) => $q->where('company_id', $this->companyId))
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

            'revenuePerServicePie' => Appointment::where('company_id', $this->companyId)
                ->where('status', 'completed')
                ->select('service_id', DB::raw('SUM(price) as total'))
                ->groupBy('service_id')
                ->with('service:id,name')->get()
                ->map(fn($i) => [
                    'label' => $i->service?->name ?? 'Desconegut',
                    'value' => round($i->total, 2),
                    'service_id' => $i->service_id,
                ]),

            'reviewsPerServicePie' => Review::whereHas('companyService', fn($q) => $q->where('company_id', $this->companyId))
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

        return [
            'cancelRate' => $total ? round(($cancelled / $total) * 100, 1) : 0,
            'completionRate' => $total ? round(($completed / $total) * 100, 1) : 0,
            'avgTimeToAppointment' => $appointments->filter(fn($a) => $a->created_at && $a->date)
                    ->map(fn($a) => $a->date->diffInDays($a->created_at))->avg() ?? null,
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
}
