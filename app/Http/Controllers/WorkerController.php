<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\In;
use Inertia\Inertia;
use App\Models\Worker;

class WorkerController extends Controller
{
    public function index()
    {
        // Obtenir el treballador autenticat
        $user = Auth::guard('worker')->user();

        // Verificar que l'usuari existeix i que és un treballador autoritzat (si és necessari)
        if (!$user) {
            abort(403, 'Accés no autoritzat.');
        }

        // Renderitzar la vista del dashboard del treballador sense passar dades
        return Inertia::render('Worker/Dashboard');
    }

    public function create()
    {
        return Inertia::render('Worker/Create');
    }

    public function store(Request $request)
    {
        // Validació de la petició
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:workers,email',
            'phone' => 'required|string|max:20',
            'address' => 'required|string|max:255',
            'password' => 'required|string|min:8', // Afegir validació per a la contrasenya
        ]);

        // Obtenim l'empresa autenticada
        $company = Auth::guard('company')->user();

        if (!$company) {
            return redirect()->route('login')->withErrors(['error' => 'No tens permisos per crear treballadors.']);
        }

        // Crear el treballador vinculat a l'empresa
        Worker::create([
            'company_id' => $company->id, // Associem el treballador a l'empresa autenticada
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
            'is_admin' => false,
            'is_company' => false,
            'password' => bcrypt($request->password), // Emmagatzemar la contrasenya hashada
        ]);

        return redirect()->route('dashboard')->with('success', 'Treballador creat correctament!');
    }


    public function edit($workerId)
    {
        // Trobar el treballador pel seu ID
        $worker = Worker::findOrFail($workerId);

        return Inertia::render('Worker/Edit', [
            'worker' => $worker
        ]);
    }

    public function update(Request $request, $workerId)
    {
        // Validació de la petició
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:workers,email,' . $workerId,
            'phone' => 'required|string|max:20',
            'address' => 'required|string|max:255',
        ]);

        // Trobar el treballador pel seu ID
        $worker = Worker::findOrFail($workerId);

        // Actualitzar el treballador
        $worker->update([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
        ]);

        return redirect()->route('dashboard')->with('success', 'Treballador actualitzat correctament!');
    }

    public function destroy($workerId)
    {
        // Trobar el treballador pel seu ID
        $worker = Worker::findOrFail($workerId);

        // Eliminar el treballador
        $worker->delete();

        // Redirigir amb un missatge de confirmació
        return redirect()->route('dashboard')->with('success', 'Treballador eliminat correctament.');
    }
}
