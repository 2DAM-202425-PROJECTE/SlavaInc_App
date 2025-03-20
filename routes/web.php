<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WorkerController;
use App\Models\Service;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/dashboard', function () {
    if (auth()->user()->role === 'client') {
        return Inertia::render('Client/Dashboard', [
            'services' => Service::all()
        ]);
    } elseif (auth()->user()->role === 'company') {
        return Inertia::render('Worker/dashboard');
    }
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    // Rutes perfil
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Rutes client
    Route::prefix('client')->group(function () {
        // Llistat d'empreses per servei: /client/services/1
        Route::get('/services/{service}', [ClientController::class, 'show'])
            ->name('client.services.show');

        // Formulari de cita: /client/services/1/company/2
        Route::get('/services/{service}/company/{company}', [ClientController::class, 'showAppointment'])
            ->name('client.cita.show');

        // Processar cita
        Route::post('/cita', [ClientController::class, 'storeAppointment'])
            ->name('client.cita.store');
    });

    // Rutes companyia
    Route::prefix('company')->group(function () {
        Route::get('/dashboard', [CompanyController::class, 'index'])
            ->name('company.dashboard');
    });

    // Rutes treballador
    Route::prefix('worker')->group(function () {
        Route::get('/dashboard', function () {
            return Inertia::render('Worker/dashboard');
        });
        Route::get('/create', [WorkerController::class, 'create'])
            ->name('workers.create');
    });
});

require __DIR__.'/auth.php';
