<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminCompanyController extends Controller
{
    /**
     * Mostrar la llista d'empreses.
     */
    public function index()
    {
        $companies = Company::all();

        return Inertia::render('Administrator/Companies/Index', [
            'companies' => $companies
        ]);
    }

    /**
     * Mostrar formulari per crear una nova empresa.
     */
    public function create()
    {
        return Inertia::render('Administrator/Companies/Create');
    }

    /**
     * Emmagatzemar una nova empresa a la base de dades.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:companies',
            'password' => 'required|string|min:8',
            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'zip_code' => 'nullable|string|max:20',
            'phone' => 'nullable|string|max:20',
            'logo' => 'nullable|image|max:2048',
        ]);

        $data = [
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'address' => $request->address,
            'city' => $request->city,
            'state' => $request->state,
            'zip_code' => $request->zip_code,
            'phone' => $request->phone,
        ];

        // Gestionar la pujada del logo si s'ha proporcionat
        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('companies', 'public');
            $data['logo'] = '/storage/' . $path;
        }

        // Crear l'empresa
        Company::create($data);

        return redirect()->route('administrator.companies.index');
    }

    /**
     * Mostrar informació detallada d'una empresa.
     */
    public function show($id)
    {
        $company = Company::with(['services', 'workers'])->findOrFail($id);

        return Inertia::render('Administrator/Companies/Show', [
            'company' => $company,
        ]);
    }

    /**
     * Mostrar formulari per editar una empresa.
     */
    public function edit($id)
    {
        $company = Company::findOrFail($id);

        return Inertia::render('Administrator/Companies/Edit', [
            'company' => $company,
        ]);
    }

    /**
     * Actualitzar la informació d'una empresa.
     */
    public function update(Request $request, $id)
    {
        $company = Company::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:companies,email,' . $id,
            'password' => 'nullable|string|min:8',
            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'zip_code' => 'nullable|string|max:20',
            'phone' => 'nullable|string|max:20',
            'logo' => 'nullable|image|max:2048',
        ]);

        $data = [
            'name' => $request->name,
            'email' => $request->email,
            'address' => $request->address,
            'city' => $request->city,
            'state' => $request->state,
            'zip_code' => $request->zip_code,
            'phone' => $request->phone,
        ];

        // Actualitzar la contrasenya només si s'ha proporcionat
        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }

        // Gestionar la pujada del logo si s'ha proporcionat
        if ($request->hasFile('logo')) {
            // Eliminar el logo anterior si existeix
            if ($company->logo) {
                $oldPath = str_replace('/storage/', '', $company->logo);
                Storage::disk('public')->delete($oldPath);
            }

            $path = $request->file('logo')->store('companies', 'public');
            $data['logo'] = '/storage/' . $path;
        }

        $company->update($data);

        return redirect()->route('administrator.companies.index');
    }

    /**
     * Eliminar una empresa.
     */
    public function destroy($id)
    {
        $company = Company::findOrFail($id);

        // Eliminar el logo si existeix
        if ($company->logo) {
            $path = str_replace('/storage/', '', $company->logo);
            Storage::disk('public')->delete($path);
        }

        $company->delete();

        return redirect()->route('administrator.companies.index');
    }
}
