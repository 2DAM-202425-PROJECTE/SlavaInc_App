<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Models\Plan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class AdminPlanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $plans = Plan::orderBy('price')->get();

        return Inertia::render('Administrator/Plans/Index', [
            'plans' => $plans
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Administrator/Plans/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'features' => 'nullable|array',
            'max_workers' => 'nullable|integer|min:0',
            'max_services' => 'nullable|integer|min:0',
            'can_view_stats' => 'boolean',
            'extra_stats' => 'boolean',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $plan = Plan::create([
            'name' => $request->name,
            'price' => $request->price,
            'features' => $request->features,
            'max_workers' => $request->max_workers,
            'max_services' => $request->max_services,
            'can_view_stats' => $request->can_view_stats ?? false,
            'extra_stats' => $request->extra_stats ?? false,
        ]);

        return redirect()->route('administrator.plans.index')
            ->with('success', 'Pla creat correctament.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Plan $plan)
    {
        // Obtener las empresas que usan este plan
        $plan->load('companies');

        return Inertia::render('Administrator/Plans/Show', [
            'plan' => $plan
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Plan $plan)
    {
        return Inertia::render('Administrator/Plans/Edit', [
            'plan' => $plan
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Plan $plan)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'features' => 'nullable|array',
            'max_workers' => 'nullable|integer|min:0',
            'max_services' => 'nullable|integer|min:0',
            'can_view_stats' => 'boolean',
            'extra_stats' => 'boolean',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $plan->update([
            'name' => $request->name,
            'price' => $request->price,
            'features' => $request->features,
            'max_workers' => $request->max_workers,
            'max_services' => $request->max_services,
            'can_view_stats' => $request->can_view_stats ?? false,
            'extra_stats' => $request->extra_stats ?? false,
        ]);

        return redirect()->route('administrator.plans.index')
            ->with('success', 'Pla actualitzat correctament.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Plan $plan)
    {
        // Verificar si hay empresas usando este plan
        if ($plan->companies()->count() > 0) {
            return redirect()->back()
                ->with('error', 'No es pot eliminar aquest pla perquè hi ha empreses que l\'utilitzen.');
        }

        $plan->delete();

        return redirect()->route('administrator.plans.index')
            ->with('success', 'Pla eliminat correctament.');
    }
}
