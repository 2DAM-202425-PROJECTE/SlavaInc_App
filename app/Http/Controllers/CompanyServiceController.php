<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;

class CompanyServiceController extends Controller
{
    public function index(Company $company)
    {
        $services = $company->services()->get();
        return response()->json($services);
    }

    public function store(Request $request, Company $company)
    {
        $validated = $request->validate([
            'service_id' => 'required|exists:services,id',
            'price_per_unit' => 'nullable|numeric',
            'unit' => 'nullable|string',
            'min_price' => 'nullable|numeric',
            'max_price' => 'nullable|numeric',
            'logo' => 'nullable|string',
        ]);

        if ($company->services()->where('service_id', $validated['service_id'])->exists()) {
            return response()->json(['message' => 'Aquest servei ja està vinculat a aquesta empresa'], 422);
        }

        $company->services()->attach($validated['service_id'], [
            'price_per_unit' => $validated['price_per_unit'],
            'unit' => $validated['unit'],
            'min_price' => $validated['min_price'],
            'max_price' => $validated['max_price'],
            'logo' => $validated['logo'],
        ]);

        return response()->json(['message' => 'Servei vinculat correctament']);
    }

    public function update(Request $request, Company $company, $serviceId)
    {
        $validated = $request->validate([
            'price_per_unit' => 'nullable|numeric',
            'unit' => 'nullable|string',
            'min_price' => 'nullable|numeric',
            'max_price' => 'nullable|numeric',
            'logo' => 'nullable|string',
        ]);

        if (!$company->services()->where('service_id', $serviceId)->exists()) {
            return response()->json(['message' => 'Servei no trobat per aquesta empresa'], 404);
        }

        $company->services()->updateExistingPivot($serviceId, $validated);

        return response()->json(['message' => 'Servei actualitzat correctament']);
    }

    public function destroy(Company $company, $serviceId)
    {
        if (!$company->services()->where('service_id', $serviceId)->exists()) {
            return response()->json(['message' => 'Servei no trobat'], 404);
        }

        $company->services()->detach($serviceId);

        return response()->json(['message' => 'Servei eliminat correctament']);
    }
}
