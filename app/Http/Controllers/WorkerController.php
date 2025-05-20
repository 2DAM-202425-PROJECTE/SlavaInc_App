<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateWorkerRequest;
use App\Models\Appointment;
use App\Models\Company;
use App\Models\Worker;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

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
        $appointments = Appointment::whereHas('workers', function ($query) use ($worker) {
            $query->where('workers.id', $worker->id);
        })
            ->with(['user', 'company', 'service', 'workers']) // <-- AÑADIR "workers"
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
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:workers,email',
            'phone' => 'required|string|max:20',
            'address' => 'required|string|max:255',
            'password' => 'required|string|min:8',
            'status' => 'required|in:active,inactive',
        ]);

        $company = Auth::guard('company')->user();
        if (!$company) {
            return redirect()->route('login')->withErrors([
                'error' => 'No tens permisos per crear treballadors.'
            ]);
        }

        if (
            $company->plan &&
            $company->plan->max_workers !== null &&
            $company->workers()->where('status', 'active')->count() >= $company->plan->max_workers
        ) {
            return redirect()->back()->withErrors([
                'limit' => "Has arribat al límit de treballadors que permet el pla \"{$company->plan->name}\". Per afegir més treballadors, caldrà actualitzar la teva subscripció.",
            ]);
        }

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
            'status' => $request->status,
        ]);
        $this->createSystemNotification($company, 'worker_added', [
            'workerName' => $request->name,
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

    public function update(UpdateWorkerRequest $request, Worker $worker) // Use Worker model directly
    {
        // Authorization check
        $company = Auth::guard('company')->user();
        $workerAuth = Auth::guard('worker')->user();
        if (!$company && (!$workerAuth || !$workerAuth->is_admin || $workerAuth->company_id !== $worker->company_id)) {
            \Log::warning('Unauthorized update attempt', ['worker_id' => $worker->id]);
            abort(403, 'No tens permisos per actualitzar aquest treballador.');
        }

        // Log validated data for debugging
        $validated = $request->validated();
        \Log::info('Validated data for worker update:', $validated);

        // Update worker with all validated fields
        $updated = $worker->update($validated);
        \Log::info('Worker update result:', ['updated' => $updated, 'worker' => $worker->fresh()->toArray()]);

        // Use the company from auth or worker's company
        $company = $company ?? Company::findOrFail($worker->company_id);
        $this->createSystemNotification($company, 'worker_updated', [
            'workerId' => $worker->id,
            'workerName' => $request->name,
        ], "S'ha actualitzat el treballador {$request->name}");

        return redirect()->route('dashboard')->with('success', 'Treballador actualitzat correctament!');
    }

    public function destroy($workerId)
    {
        // Trobar el treballador pel seu ID
        $worker = Worker::findOrFail($workerId);

        // Eliminar el treballador
        $worker->delete();
        $company = Auth::guard('company')->user();
        $this->createSystemNotification($company, 'worker_deleted', [
            'workerId' => $worker->id,
        ], "S'ha eliminat el treballador {$worker->name}");

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
        $appointment = Appointment::where('id', $id)
            ->whereHas('workers', fn ($q) => $q->where('workers.id', $worker->id))
            ->with(['user', 'company', 'service', 'reviews'])
            ->firstOrFail();

        return Inertia::render('Worker/ServiceDetail', [
            'appointment' => $appointment
        ]);
    }

    public function list(Request $request)
    {
        $company = Auth::guard('company')->user();

        if (!$company) {
            abort(403, 'No autoritzat: empresa no autenticada.');
        }

        // Ara obtenim el paginator complet
        $workers = Worker::where('company_id', $company->id)->paginate(10);

        return Inertia::render('Worker/List', [
            'workers' => $workers, // No .items()!
        ]);
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

    public function confirmAppointment(Appointment $appointment)
    {
        $worker = Auth::guard('worker')->user();

        $appointment->load('workers');

        if (!$worker || !$appointment->workers->contains($worker->id)) {
            abort(403, 'No tens permís per modificar aquesta cita.');
        }

        if ($appointment->status !== 'pending') {
            return redirect()->back()->withErrors(['error' => 'Només es poden confirmar cites pendents.']);
        }

        $appointment->status = 'confirmed';
        $appointment->save();

        return redirect()->back()->with('success', 'Cita confirmada correctament.');
    }


    public function markAppointmentCompleted(Appointment $appointment)
    {
        $worker = Auth::guard('worker')->user();

        // ✅ Cargar relación workers
        $appointment->load('workers');

        // Verificar si el trabajador está asociado a la cita
        if (!$worker || !$appointment->workers->contains($worker->id)) {
            abort(403, 'No tens permís per modificar aquesta cita.');
        }

        $appointment->status = 'completed';
        $appointment->save();

        return redirect()->back()->with('success', 'Cita marcada com a completada.');
    }

    public function cancelAppointment(Appointment $appointment)
    {
        $worker = Auth::guard('worker')->user();

        $appointment->load('workers');

        if (!$worker || !$appointment->workers->contains($worker->id)) {
            abort(403, 'No tens permís per modificar aquesta cita.');
        }

        $appointment->status = 'cancelled';
        $appointment->save();

        return redirect()->back()->with('success', 'Cita cancel·lada correctament.');
    }
}
