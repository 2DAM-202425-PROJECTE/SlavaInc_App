<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\Service;
use App\Models\CompanyService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminCompanyServicesController extends Controller
{
    /**
     * Mostrar la llista de serveis d'empreses.
     */
    public function index()
    {
        // Obtener los servicios de empresas con sus relaciones
        $companyServices = CompanyService::with(['company', 'service'])->get();

        // Transformar los datos para adaptarlos a la vista
        $companyServicesData = $companyServices->map(function ($companyService) {
            return [
                'id' => $companyService->id,
                'company_id' => $companyService->company_id,
                'service_id' => $companyService->service_id,
                'price_per_unit' => $companyService->price_per_unit,
                'unit' => $companyService->unit,
                'min_price' => $companyService->min_price,
                'max_price' => $companyService->max_price,
                'logo' => $companyService->logo,
                'created_at' => $companyService->created_at,
                'updated_at' => $companyService->updated_at,
                'company' => $companyService->company,
                'service' => $companyService->service
            ];
        });

        $companies = Company::all();
        $services = Service::all();

        return Inertia::render('Administrator/CompanyServices/Index', [
            'companyServices' => $companyServicesData,
            'companies' => $companies,
            'services' => $services
        ]);
    }

    /**
     * Mostrar formulari per crear un nou servei d'empresa.
     */
    public function create()
    {
        $companies = Company::all();
        $services = Service::all();

        return Inertia::render('Administrator/CompanyServices/Create', [
            'companies' => $companies,
            'services' => $services
        ]);
    }

    /**
     * Emmagatzemar un nou servei d'empresa a la base de dades.
     */
    public function store(Request $request)
    {
        $request->validate([
            'company_id' => 'required|integer|exists:companies,id',
            'service_id' => 'required|integer|exists:services,id',
            'price_per_unit' => 'nullable|numeric',
            'unit' => 'nullable|string|max:50',
            'min_price' => 'nullable|numeric',
            'max_price' => 'nullable|numeric',
            'logo' => 'nullable|image|max:2048',
        ]);

        $data = [
            'company_id' => $request->company_id,
            'service_id' => $request->service_id,
            'price_per_unit' => $request->price_per_unit,
            'unit' => $request->unit,
            'min_price' => $request->min_price,
            'max_price' => $request->max_price,
        ];

        // Gestionar la pujada del logo si s'ha proporcionat
        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('company_services', 'public');
            $data['logo'] = '/storage/' . $path;
        }

        // Crear el servei d'empresa
        CompanyService::create($data);

        return redirect()->route('administrator.company-services.index');
    }

    /**
     * Mostrar informació detallada d'un servei d'empresa.
     */
    public function show($id)
    {
        $companyService = CompanyService::with(['company', 'service'])->findOrFail($id);

        return Inertia::render('Administrator/CompanyServices/Show', [
            'companyService' => $companyService,
        ]);
    }

    /**
     * Mostrar formulari per editar un servei d'empresa.
     */
    public function edit($id)
    {
        $companyService = CompanyService::with(['company', 'service'])->findOrFail($id);
        $companies = Company::all();
        $services = Service::all();

        return Inertia::render('Administrator/CompanyServices/Edit', [
            'companyService' => $companyService,
            'companies' => $companies,
            'services' => $services
        ]);
    }

    /**
     * Actualitzar la informació d'un servei d'empresa.
     */
    public function update(Request $request, $id)
    {
        $companyService = CompanyService::findOrFail($id);

        $request->validate([
            'company_id' => 'required|integer|exists:companies,id',
            'service_id' => 'required|integer|exists:services,id',
            'price_per_unit' => 'nullable|numeric',
            'unit' => 'nullable|string|max:50',
            'min_price' => 'nullable|numeric',
            'max_price' => 'nullable|numeric',
            'logo' => 'nullable|image|max:2048',
        ]);

        $data = [
            'company_id' => $request->company_id,
            'service_id' => $request->service_id,
            'price_per_unit' => $request->price_per_unit,
            'unit' => $request->unit,
            'min_price' => $request->min_price,
            'max_price' => $request->max_price,
        ];

        // Gestionar la pujada del logo si s'ha proporcionat
        if ($request->hasFile('logo')) {
            // Eliminar el logo anterior si existeix
            if ($companyService->logo) {
                $oldPath = str_replace('/storage/', '', $companyService->logo);
                \Storage::disk('public')->delete($oldPath);
            }

            $path = $request->file('logo')->store('company_services', 'public');
            $data['logo'] = '/storage/' . $path;
        }

        $companyService->update($data);

        return redirect()->route('administrator.company-services.index');
    }

    /**
     * Eliminar un servei d'empresa.
     */
    public function destroy($id)
    {
        $companyService = CompanyService::findOrFail($id);

        // Eliminar el logo si existeix
        if ($companyService->logo) {
            $path = str_replace('/storage/', '', $companyService->logo);
            \Storage::disk('public')->delete($path);
        }

        $companyService->delete();

        return redirect()->route('administrator.company-services.index');
    }
}
