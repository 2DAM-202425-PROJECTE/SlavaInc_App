<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WorkerController;
use App\Models\User;
use App\Models\Service;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use App\Models\Company;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Rutes d'accés per adminstradors
Route::resource('administrator/services', ServiceController::class)
    ->names('administrator.services');
Route::resource('administrator/users', UserController::class)
    ->names('administrator.users');
Route::resource('administrator/workers', WorkerController::class)
    ->names('administrator.workers');

// Ruta arrel. Redirigir a la pàgina de login si no està autenticat
Route::get('/', function () {
    if (Auth::check()) {
        return redirect()->route('dashboard');
    }
    return redirect()->route('login');
});

// Ruta dashboard. Mostrar el dashboard segons el tipus d'usuari
Route::get('/dashboard', function () {
    if (Auth::guard('web')->check()) {
        $services = Service::all();
        return Inertia::render('Client/Dashboard', [
            'services' => $services,
        ]);
    }

    if (Auth::guard('worker')->check()) {
        $user = Auth::guard('worker')->user();

        return $user->is_admin
            ? app(CompanyController::class)->index()
            : app(WorkerController::class)->index();
    }

    if (Auth::guard('company')->check()) {
        return app(CompanyController::class)->index();
    }
      // Si no està autenticat, redirigir a la pàgina de login
    return redirect()->route('login');
})->middleware('auth:company,web,worker')->name('dashboard');

Route::middleware('auth:company,web,worker')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/client/services/{service}', [ClientController::class, 'show'])
        ->name('client.services.show');
});

Route::middleware(['auth:company'])->group(function () {
    Route::get('/worker/create', [WorkerController::class, 'create'])->name('worker.create');
    Route::post('/worker', [WorkerController::class, 'store'])->name('worker.store');
    Route::get('/worker/{worker}/edit', [WorkerController::class, 'edit'])->name('worker.edit');
    Route::put('/worker/{worker}', [WorkerController::class, 'update'])->name('worker.update');
    Route::delete('/worker/{worker}', [WorkerController::class, 'destroy'])->name('worker.destroy');
});

Route::middleware(['auth:web'])->group(function () {
    Route::get('/services/{service}',
        [ClientController::class, 'show'])
        ->name('client.services.show');

    Route::get('/services/{service}/company/{company}',
        [ClientController::class, 'showAppointment'])
        ->name('client.cita.show');

    Route::post('/appointments',
        [ClientController::class, 'storeAppointment'])
        ->name('client.appointments.store');

    Route::get('/appointments',
        [ClientController::class, 'indexAppointments'])
        ->name('client.appointments.index');

    Route::get('/appointments/{appointment}',
        [ClientController::class, 'showAppointmentDetail'])
        ->name('client.appointments.show');

    Route::get('/services',
        [ClientController::class, 'indexServices'])
        ->name('client.services.index');
});

// Rutes per a Workers
Route::middleware('auth:worker')->group(function () {
    // Dashboard del worker
    Route::get('/worker/dashboard',
        [WorkerController::class, 'index'])
        ->name('worker.dashboard');

    // Gestión de citas del worker
    Route::get('/worker/appointments',
        [WorkerController::class, 'indexAppointments'])
        ->name('worker.appointments.index');

    Route::get('/worker/appointments/{appointment}',
        [WorkerController::class, 'showAppointment'])
        ->name('worker.appointments.show');
});



require __DIR__.'/auth.php';
