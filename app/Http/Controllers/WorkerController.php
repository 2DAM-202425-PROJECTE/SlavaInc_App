<?php

namespace App\Http\Controllers;

use App\Models\Service; // Importa el model Service
use App\Models\Date;    // Importa el model Date
use App\Models\Worker;
use App\Models\LoginCompany;
use Inertia\Inertia;   // Importa Inertia per renderitzar la vista
use Illuminate\Http\Request;

class WorkerController extends Controller
{

// Mostra la llista de workers
    // Mostra la llista de workers
    public function index()
    {
        $workers = Worker::all();
        return Inertia::render('Administrator/Workers/Index', [
            'workers' => $workers,
        ]);
    }

    // Mostra el formulari per crear un worker
    public function create()
    {
        $companies = LoginCompany::all(); // Usa LoginCompany en lloc de Company
        return Inertia::render('Administrator/Workers/Create', [
            'companies' => $companies,
        ]);
    }

    // Guarda un nou worker
    public function store(Request $request)
    {
        // Validació de dades
        $request->validate([
            'company_id' => 'required|exists:login_companies,id', // Usa login_companies com a taula
            'name' => 'required|string|max:255',
            'schedule' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'state' => 'required|string|max:255',
            'zip_code' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
        ]);

        // Crea el worker
        Worker::create([
            'company_id' => $request->company_id,
            'name' => $request->name,
            'schedule' => $request->schedule,
            'address' => $request->address,
            'city' => $request->city,
            'state' => $request->state,
            'zip_code' => $request->zip_code,
            'phone' => $request->phone,
        ]);

        // Redirigeix a la llista de workers
        return redirect()->route('administrator.workers.index');
    }

    // Mostra els detalls d'un worker
    public function show(Worker $worker)
    {
        return Inertia::render('Administrator/Workers/Show', [
            'worker' => $worker,
        ]);
    }

    // Mostra el formulari per editar un worker
    public function edit(Worker $worker)
    {
        $companies = LoginCompany::all(); // Usa LoginCompany en lloc de Company
        return Inertia::render('Administrator/Workers/Edit', [
            'worker' => $worker,
            'companies' => $companies,
        ]);
    }

    // Actualitza un worker
    public function update(Request $request, Worker $worker)
    {
        // Validació de dades
        $request->validate([
            'company_id' => 'required|exists:login_companies,id', // Usa login_companies com a taula
            'name' => 'required|string|max:255',
            'schedule' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'state' => 'required|string|max:255',
            'zip_code' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
        ]);

        // Actualitza el worker
        $worker->update([
            'company_id' => $request->company_id,
            'name' => $request->name,
            'schedule' => $request->schedule,
            'address' => $request->address,
            'city' => $request->city,
            'state' => $request->state,
            'zip_code' => $request->zip_code,
            'phone' => $request->phone,
        ]);

        // Redirigeix a la llista de workers
        return redirect()->route('administrator.workers.index');
    }

    // Elimina un worker
    public function destroy(Worker $worker)
    {
        $worker->delete();
        return redirect()->route('administrator.workers.index');
    }
    public function showService($id)
    {
        // Obté el servei
        $service = Service::findOrFail($id);

        // Simula una cita falsa
        $date = [
            'date' => '2025-02-26', // Data falsa
            'client' => [
                'name' => 'Joan Pérez', // Client fals
                'phone' => '123 456 789', // Telèfon fals
                'address' => 'Carrer Major, 123, Barcelona', // Adreça falsa
            ],
        ];

        return Inertia::render('Worker/ServiceDetail', [
            'service' => $service,
            'date' => $date,
        ]);
    }
}
