<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Models\Worker;
use App\Models\Company;
use App\Models\User;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class AdminWorkerController extends Controller
{
    /**
     * Mostrar la llista de treballadors.
     */
    public function index(Request $request)
    {
        $workers = Worker::with('company')->get();
        $companies = Company::all();

        return Inertia::render('Administrator/Workers/Index', [
            'workers' => $workers,
            'companies' => $companies,
            'auth' => [
                'user' => auth()->user()
            ]
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
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('workers', 'email'),
                Rule::unique('users', 'email'),
                Rule::unique('companies', 'email'),
                Rule::unique('admins', 'email'),
            ],
            'password' => 'required|string|min:8|confirmed',
            'company_id' => 'required|integer|exists:companies,id',
            'schedule' => 'required|string',
            'address' => 'required|string',
            'city' => 'required|string',
            'state' => 'required|string',
            'zip_code' => 'required|string',
            'phone' => 'required|string',
            'status' => 'nullable|string|in:active,inactive',
            'is_admin' => 'nullable|boolean',
        ], [
            'email.unique' => 'Aquest correu electrònic ja està en ús per un altre usuari, treballador, empresa o administrador.',
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
            'status' => $request->status ?? 'active',
            'is_admin' => $request->is_admin ?? false,
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
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('workers', 'email')->ignore($worker->id),
                Rule::unique('users', 'email'),
                Rule::unique('companies', 'email'),
                Rule::unique('admins', 'email'),
            ],
            'password' => 'nullable|string|min:8|confirmed',
            'company_id' => 'required|integer|exists:companies,id',
            'schedule' => 'required|string',
            'address' => 'required|string',
            'city' => 'required|string',
            'state' => 'required|string',
            'zip_code' => 'required|string',
            'phone' => 'required|string',
            'status' => 'nullable|string|in:active,inactive',
            'is_admin' => 'nullable|boolean',
        ], [
            'email.unique' => 'Aquest correu electrònic ja està en ús per un altre usuari, treballador, empresa o administrador.',
        ]);

        $updateData = [
            'name' => $request->name,
            'email' => $request->email,
            'company_id' => $request->company_id,
            'schedule' => $request->schedule,
            'address' => $request->address,
            'city' => $request->city,
            'state' => $request->state,
            'zip_code' => $request->zip_code,
            'phone' => $request->phone,
        ];

        if ($request->has('status')) {
            $updateData['status'] = $request->status;
        }

        if ($request->has('is_admin')) {
            $updateData['is_admin'] = $request->is_admin;
        }

        $worker->update($updateData);

        if ($request->filled('password')) {
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
