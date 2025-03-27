<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\In;
use Inertia\Inertia;
use App\Models\Worker;
use App\Models\Appointment;


class WorkerController extends Controller
{
    public function index()
    {
        // Obtenir el treballador autenticat
        $worker = Auth::guard('worker')->user();

        // Verificar que l'usuari existeix i que és un treballador
        if (!$worker) {
            abort(403, 'Accés no autoritzat.');
        }

        // Carregar les cites del treballador amb les relacions necessàries
        $appointments = $worker->appointments()
            ->with(['user', 'company', 'service'])
            ->orderBy('date', 'asc')
            ->orderBy('time', 'asc')
            ->get();

        // Renderitzar la vista del dashboard del treballador amb les cites
        return Inertia::render('Worker/Dashboard', [
            'appointments' => $appointments
        ]);
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
            'company_id' => $company->id,
            'name' => $request->name,
            'email' => $request->email,
            'schedule' => $request->schedule,
            'address' => $request->address,
            'city' => $request->city,
            'state' => $request->state,
            'zip_code' => $request->zip_code,
            'phone' => $request->phone,
            'password' => bcrypt($request->password),
            'is_admin' => false,
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

    public function showAppointment($id)
    {
        $worker = Auth::guard('worker')->user();

        if (!$worker) {
            abort(403, 'Accés no autoritzat.');
        }

        // Buscar la cita que pertenezca a este worker
        $appointment = Appointment::where('worker_id', $worker->id)
            ->with(['user', 'company', 'service'])
            ->findOrFail($id);

        return Inertia::render('Worker/ServiceDetail', [
            'appointment' => $appointment
        ]);
    }

    public function list(Request $request)
    {
        // Obtener el company_id del usuario logueado
        $companyId = $request->user()->company_id;

        $query = Worker::query();

        // Filtrar por empresa
        $query->where('company_id', $companyId);

        // Agregar otros filtros opcionales
        if ($request->filled('name')) {
            $query->where('name', 'like', '%' . $request->name . '%');
        }
        if ($request->filled('city')) {
            $query->where('city', $request->city);
        }
        if ($request->filled('schedule')) {
            $query->where('schedule', $request->schedule);
        }
        if ($request->filled('is_admin')) {
            $query->where('is_admin', $request->is_admin);
        }

        $workers = $query->paginate(10);

        return Inertia::render('Worker/List', [
            'workers' => $workers->items(),
            'nextPageUrl' => $workers->nextPageUrl(),
        ]);
    }


}
