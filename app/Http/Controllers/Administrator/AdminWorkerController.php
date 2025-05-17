<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Models\Worker;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AdminWorkerController extends Controller
{
    /**
     * Mostrar la llista de treballadors.
     */
    public function index(Request $request)
    {
        $workers = Worker::all();
        $companies = Company::all();

        return Inertia::render('Administrator/Workers/Index', [
            'workers' => $workers,
            'companies' => $companies
        ]);
    }

    /**
     * Mostrar formulari per crear un nou treballador.
     */
    public function create()
    {
        $companies = Company::all();

        return Inertia::render('Administrator/Workers/Create', [
            'companies' => $companies
        ]);
    }

    /**
     * Emmagatzemar un nou treballador a la base de dades.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:workers,email',
            'password' => 'required|string|min:8|confirmed',
            'company_id' => 'required|integer|exists:companies,id',
            'schedule' => 'required|string',
            'address' => 'required|string',
            'city' => 'required|string',
            'state' => 'required|string',
            'zip_code' => 'required|string',
            'phone' => 'required|string',
        ]);

        Worker::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'company_id' => $request->company_id,
            'schedule' => $request->schedule,
            'address' => $request->address,
            'city' => $request->city,
            'state' => $request->state,
            'zip_code' => $request->zip_code,
            'phone' => $request->phone,
            // 'is_admin' => $request->is_admin ?? 0, // si vols incloure aquest camp
        ]);

        return redirect()->route('administrator.workers.index');
    }

    /**
     * Mostrar informació detallada d'un treballador.
     */
    public function show(Worker $worker)
    {
        $worker->load('company');

        return Inertia::render('Administrator/Workers/Show', [
            'worker' => $worker,
        ]);
    }

    /**
     * Mostrar formulari per editar un treballador.
     */
    public function edit(Worker $worker)
    {
        $companies = Company::all();

        return Inertia::render('Administrator/Workers/Edit', [
            'worker' => $worker,
            'companies' => $companies
        ]);
    }

    /**
     * Actualitzar la informació d'un treballador.
     */
    public function update(Request $request, Worker $worker)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:workers,email,' . $worker->id,
            'password' => 'nullable|string|min:8|confirmed',
            'company_id' => 'required|integer|exists:companies,id',
            'schedule' => 'required|string',
            'address' => 'required|string',
            'city' => 'required|string',
            'state' => 'required|string',
            'zip_code' => 'required|string',
            'phone' => 'required|string',
        ]);

        $worker->update([
            'name' => $request->name,
            'email' => $request->email,
            'company_id' => $request->company_id,
            'schedule' => $request->schedule,
            'address' => $request->address,
            'city' => $request->city,
            'state' => $request->state,
            'zip_code' => $request->zip_code,
            'phone' => $request->phone,
        ]);

        if ($request->password) {
            $worker->update([
                'password' => Hash::make($request->password),
            ]);
        }

        return redirect()->route('administrator.workers.index');
    }

    /**
     * Eliminar un treballador.
     */
    public function destroy(Worker $worker)
    {
        $worker->delete();

        return redirect()->route('administrator.workers.index');
    }
}
