<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\CompanyServiceController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WorkerController;
use App\Models\Service;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// RUTES D’ADMINISTRADOR
Route::prefix('administrator')
    ->middleware('auth:worker')
    ->name('administrator.')
    ->group(function () {
        Route::resource('services', ServiceController::class)->names('services');
        Route::resource('users', UserController::class)->names('users');
        Route::resource('workers', WorkerController::class)->names('workers');
    });

// RUTA INICIAL
Route::get('/', function () {
    return Auth::check()
        ? redirect()->route('dashboard')
        : redirect()->route('login');
});

// DASHBOARD segons el tipus d’usuari
Route::get('/dashboard', function () {
    if (Auth::guard('web')->check()) {
        $services = Service::all();
        return Inertia::render('Client/Dashboard', ['services' => $services]);
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

    return redirect()->route('login');
})->middleware('auth:company,web,worker')->name('dashboard');

// RUTES COMUNES AUTENTICATS
Route::middleware('auth:company,web,worker')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/client/services/{service}', [ClientController::class, 'show'])->name('client.services.show');
});

// RUTES PER A EMPRESES (COMPANY)
Route::middleware(['auth:company'])->group(function () {
    // CRUD Treballadors
    Route::get('/worker/create', [WorkerController::class, 'create'])->name('worker.create');
    Route::post('/worker', [WorkerController::class, 'store'])->name('worker.store');
    Route::get('/worker/{worker}/edit', [WorkerController::class, 'edit'])->name('worker.edit');
    Route::put('/worker/{worker}', [WorkerController::class, 'update'])->name('worker.update');
    Route::delete('/worker/{worker}', [WorkerController::class, 'destroy'])->name('worker.destroy');
    Route::get('/worker/list', [WorkerController::class, 'list'])->name('worker.list');

    // CRUD serveis associats a l'empresa (pivot company_service)
    Route::get('/company/services', [CompanyServiceController::class, 'index'])->name('company.services.index');
    Route::get('/company/services/create', [CompanyServiceController::class, 'create'])->name('company.services.create');
    Route::post('/company/services', [CompanyServiceController::class, 'store'])->name('company.services.store');
    Route::get('services/{service}/edit', [CompanyServiceController::class, 'edit'])->name('company.services.edit');
    Route::put('/company/services/{service}', [CompanyServiceController::class, 'update'])->name('company.services.update');
    Route::delete('/company/services/pivot/{pivotId}', [CompanyServiceController::class, 'destroy'])
        ->name('company.services.destroy');
    Route::get('/company/services', [CompanyServiceController::class, 'index'])->name('company.services.index');

});

// RUTES PER A CLIENTS (WEB USERS)
Route::middleware(['auth:web'])->group(function () {
    Route::get('/services', [ClientController::class, 'indexServices'])->name('client.services.index');
    Route::get('/services/{service}', [ClientController::class, 'show'])->name('client.services.show');
    Route::get('/services/{service}/company/{company}', [ClientController::class, 'showAppointment'])->name('client.cita.show');

    // Cites
    Route::post('/appointments', [ClientController::class, 'storeAppointment'])->name('client.appointments.store');
    Route::get('/appointments', [ClientController::class, 'indexAppointments'])->name('client.appointments.index');
    Route::get('/appointments/{appointment}', [ClientController::class, 'showAppointmentDetail'])->name('client.appointments.show');
});

// RUTES PER A TREBALLADORS (WORKERS)
Route::middleware('auth:worker')->group(function () {
    Route::get('/worker/dashboard', [WorkerController::class, 'index'])->name('worker.dashboard');
    Route::get('/worker/appointments', [WorkerController::class, 'indexAppointments'])->name('worker.appointments.index');
    Route::get('/worker/appointments/{appointment}', [WorkerController::class, 'showAppointment'])->name('worker.appointments.show');
});

// RUTES D’AUTENTICACIÓ
require __DIR__.'/auth.php';
