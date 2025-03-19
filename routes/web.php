<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WorkerController;
use App\Models\Service;
use Illuminate\Foundation\Application;
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
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/Worker/dashboard', function () {
    return Inertia::render('Worker/dashboard');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/company/dashboard', [CompanyController::class, 'index'])->name('company.dashboard');
});

Route::get('/workers/create', [WorkerController::class, 'create'])->name('workers.create');

// Add near other routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/client/services/{service}', [ClientController::class, 'show'])
        ->name('client.services.show');
});

// web.php

Route::middleware(['auth', 'verified'])->group(function () {
    // Ruta per mostrar el formulari de reserva
    Route::get('/client/cita/{company}', [ClientController::class, 'showAppointment'])
        ->name('client.cita.show');

    // Ruta per processar la reserva
    Route::post('/client/cita', [ClientController::class, 'showAppointment'])
        ->name('client.cita.store');
});
require __DIR__.'/auth.php';
