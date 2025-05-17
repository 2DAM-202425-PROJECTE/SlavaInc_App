<?php

use App\Http\Controllers\Administrator\AdminCompanyController;
use App\Http\Controllers\Administrator\AdminCompanyServicesController;
use App\Http\Controllers\Administrator\AdminDashboardController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\CompanyServiceController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WorkerController;
use App\Http\Controllers\Administrator\AdminWorkerController;
use App\Models\Service;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// RUTES D’ADMINISTRADOR
Route::prefix('administrator')
    ->middleware('auth:worker')
    ->name('administrator.')
    ->group(function () {
        // Ruta principal del panell d'administració
        Route::get('/', [AdminDashboardController::class, 'index'])->name('dashboard');
        // Altres recursos
        Route::resource('services', ServiceController::class)->names('services');
        Route::resource('users', UserController::class)->names('users');
        Route::resource('workers', AdminWorkerController::class)->names('workers');
        Route::resource('company-services', AdminCompanyServicesController::class);
        Route::resource('companies', AdminCompanyController::class);
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
    Route::get('/profile', function () {
        if (Auth::guard('web')->check()) {
            return Inertia::render('Client/Profile');
        }

        if (Auth::guard('worker')->check()) {
            $user = Auth::guard('worker')->user();
            return $user->is_admin
                ? Inertia::render('Company/Profile')
                : Inertia::render('Worker/Profile');
        }

        if (Auth::guard('company')->check()) {
            return Inertia::render('Company/Profile', [
                'company' => app(\App\Http\Controllers\CompanyController::class)->getCompanyFullData(),
            ]);
        }



        return redirect()->route('login');
    })->middleware('auth:company,web,worker')->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/client/services/{service}', [ClientController::class, 'show'])->name('client.services.show');
});


// RUTES PER A EMPRESES (COMPANY)
Route::middleware(['auth:company'])->group(function () {
    // CRUD Treballadors
    Route::get('/worker/create', [AdminWorkerController::class, 'create'])->name('worker.create');
    Route::post('/worker', [AdminWorkerController::class, 'store'])->name('worker.store');
    Route::get('/worker/{worker}/edit', [AdminWorkerController::class, 'edit'])->name('worker.edit');
    Route::put('/worker/{worker}', [AdminWorkerController::class, 'update'])->name('worker.update');
    Route::delete('/worker/{worker}', [AdminWorkerController::class, 'destroy'])->name('worker.destroy');
    Route::get('/worker/list', [AdminWorkerController::class, 'list'])->name('worker.list');

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
    Route::get('/services/companies/{company}', [ClientController::class, 'showCompany'])->name('client.companies.show'); // Nova ruta
    Route::get('/companies/{company}', [CompanyController::class, 'show'])
        ->name('client.companies.show')
        ->where('company', '[0-9]+');

    // Cites
    Route::post('/appointments', [ClientController::class, 'storeAppointment'])->name('client.appointments.store');
    Route::get('/appointments', [ClientController::class, 'indexAppointments'])->name('client.appointments.index');
    Route::get('/appointments/{appointment}', [ClientController::class, 'showAppointmentDetail'])->name('client.appointments.show');
});

// RUTES PER A TREBALLADORS (WORKERS)
Route::middleware('auth:worker')->group(function () {
    Route::get('/worker/dashboard', [AdminWorkerController::class, 'index'])->name('worker.dashboard');
    Route::get('/worker/appointments', [AdminWorkerController::class, 'indexAppointments'])->name('worker.appointments.index');
    Route::get('/worker/appointments/{appointment}', [AdminWorkerController::class, 'showAppointment'])->name('worker.appointments.show');
});

Route::get('/appointments/occupied', [ClientController::class, 'getOccupiedSlots'])
    ->name('client.get.occupied.slots');

// ALTRES
Route::get('/privacy', function () {return Inertia::render('Other/Privacy');})->name('privacy');
Route::get('/terms', function () { return Inertia::render('Other/Terms'); })->name('terms');

// RUTES D’AUTENTICACIÓ
require __DIR__.'/auth.php';
