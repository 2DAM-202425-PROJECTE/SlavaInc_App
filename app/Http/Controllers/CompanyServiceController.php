<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\CompanyService;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class CompanyServiceController extends Controller
{
    public function index()
    {
        $company = Auth::guard('company')->user();

        $services = $company->services()
            ->withPivot('price_per_unit', 'unit', 'min_price', 'max_price', 'logo')
            ->get();

        return Inertia::render('Service/List', [
            'services' => $services,
            'company' => $company,
        ]);
    }

    public function create()
    {
        $company = Auth::guard('company')->user();

        $attachedServiceIds = $company->services()
            ->where('type', '!=', 'altres')
            ->pluck('service_id')
            ->toArray();
        $services = Service::whereNotIn('id', $attachedServiceIds)->get();

        return Inertia::render('Service/Create', [
            'services' => $services,
            'company' => $company,
        ]);
    }


    public function store(Request $request)
    {
        $company = Auth::guard('company')->user();

        $validated = $request->validate([
            'service_id' => 'required|exists:services,id',
            'price_per_unit' => 'nullable|numeric',
            'unit' => 'nullable|string',
            'min_price' => 'nullable|numeric',
            'max_price' => 'nullable|numeric',
            'logo' => 'nullable|string',
            'custom_name' => 'nullable|string|max:255',
            'custom_description' => 'nullable|string',
        ]);

        $selectedService = Service::findOrFail($validated['service_id']);

        if (
            $selectedService->type === 'altres' &&
            $company->plan &&
            $company->plan->max_services !== null &&
            $company->services()
                ->where('services.type', 'altres')
                ->count() >= $company->plan->max_services
        ) {
            return redirect()->back()->withErrors([
                'limit' => "El teu pla \"{$company->plan->name}\" només permet afegir fins a {$company->plan->max_services} serveis personalitzats (tipus 'altres'). Considera actualitzar el pla.",
            ]);
        }

        if ($selectedService->type !== 'altres') {
            $alreadyAttached = $company->services()
                ->where('service_id', $validated['service_id'])
                ->exists();

            if ($alreadyAttached) {
                return redirect()->back()->withErrors([
                    'service_id' => 'Aquest servei ja està vinculat a aquesta empresa.',
                ]);
            }
        }

        $company->services()->attach($request->service_id, [
            'custom_name' => $request->custom_name,
            'description' => $request->custom_description,
            'price_per_unit' => $request->price_per_unit,
            'unit' => $request->unit,
            'min_price' => $request->min_price,
            'max_price' => $request->max_price,
        ]);

        $this->createSystemNotification($company, 'service_added', [
            'serviceName' => $request->custom_name ?? $selectedService->name,
        ]);


        return redirect()->route('dashboard')->with('success', 'Servei afegit correctament.');
    }





    public function edit($companyServiceId)
    {
        $company = Auth::guard('company')->user();

        // Cerquem el servei que pertany a aquesta empresa i que té la ID passada
        $companyService = CompanyService::where('company_id', $company->id)
            ->where('id', $companyServiceId)
            ->with('service') // carrega el servei base
            ->firstOrFail();

        return Inertia::render('Service/Edit', [
            'service' => $companyService->service,
            'companyService' => $companyService,
            'company' => $company,
        ]);
    }


    public function update(Request $request, $companyServiceId)
    {
        $company = Auth::guard('company')->user();

        $validated = $request->validate([
            'price_per_unit' => 'nullable|numeric',
            'unit' => 'nullable|string',
            'min_price' => 'nullable|numeric',
            'max_price' => 'nullable|numeric',
            'logo' => 'nullable|string',
            'custom_name' => 'nullable|string|max:255',
            'custom_description' => 'nullable|string',
        ]);

        // Troba el servei de l'empresa
        $companyService = CompanyService::where('id', $companyServiceId)
            ->where('company_id', $company->id)
            ->firstOrFail();

        // Actualitza els valors
        $companyService->update([
            'price_per_unit' => $validated['price_per_unit'],
            'unit' => $validated['unit'],
            'min_price' => $validated['min_price'],
            'max_price' => $validated['max_price'],
            'logo' => $validated['logo'],
            'custom_name' => $validated['custom_name'],
            'description' => $validated['custom_description'] ?? null,
            ]);

        $this->createSystemNotification($company, 'service_updated', [
            'companyServiceId' => $companyServiceId,
        ], 'S\'ha actualitzat un servei.');

        return redirect()->route('dashboard')->with('success', 'Servei actualitzat correctament.');
    }

    public function destroy($pivotId)
    {
        $company = Auth::guard('company')->user();

        $pivot = DB::table('companies_services')
            ->where('id', $pivotId)
            ->where('company_id', $company->id)
            ->first();

        if (!$pivot) {
            return redirect()->back()->withErrors(['general' => 'No s\'ha trobat el servei o no tens permís per eliminar-lo.']);
        }

        DB::table('companies_services')->where('id', $pivotId)->delete();
        $this->createSystemNotification($company, 'service_deleted', [
            'serviceId' => $pivot->service_id ?? null,
        ], 'S\'ha eliminat un servei.');

        return redirect()->route('dashboard')->with('success', 'Servei eliminat correctament.');
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
