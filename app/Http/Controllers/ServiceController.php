<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceController extends Controller
{
    // Llista de serveis
    public function index()
    {
        $services = Service::all();
        return Inertia::render('Administrator/Services/Index', [
            'services' => $services,
        ]);
    }

    // Mostra el formulari per crear un servei
    public function create()
    {
        return Inertia::render('Administrator/Services/Create');
    }

    // Guarda un nou servei
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'type' => 'required|string',
        ]);

        Service::create($request->all());

        return redirect()->route('administrator.services.index');
    }

    // Mostra els detalls d'un servei
    public function show(Service $service)
    {
        return Inertia::render('Administrator/Services/Show', [
            'service' => $service,
        ]);
    }

    // Mostra el formulari per editar un servei
    public function edit(Service $service)
    {
        return Inertia::render('Administrator/Services/Edit', [
            'service' => $service,
        ]);
    }

    public function update(Request $request, Service $service)
    {
        // Validació de dades
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'type' => 'required|string',
        ]);

        // Actualitza el servei
        $service->update($request->all());

        // Redirigeix a la llista de serveis
        return redirect()->route('administrator.services.index');
    }

    // Elimina un servei
    public function destroy(Service $service)
    {
        $service->delete();
        return redirect()->route('administrator.services.index');
    }
}
