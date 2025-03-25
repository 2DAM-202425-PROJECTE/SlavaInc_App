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

// Rutes per a Serveis
Route::resource('administrator/services', ServiceController::class)
    ->names('administrator.services');

// Rutes per a Usuaris
Route::resource('administrator/users', UserController::class)
    ->names('administrator.users');

// Rutes per a Workers
Route::resource('administrator/workers', WorkerController::class)
    ->names('administrator.workers');

Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/dashboard', function () {
    // Verificar primer els clients (guard 'web')
    if (Auth::guard('web')->check()) {
        // Carregar els serveis (pots afegir filtratge segons sigui necessari)
        $services = Service::all();

        return Inertia::render('Client/Dashboard', [
            'services' => $services,
        ]);
    }

    // Verificar després els treballadors/admins (guard 'company')
    if (Auth::guard('company')->check()) {
        $user = Auth::guard('company')->user();

        return $user->is_admin
            ? app(CompanyController::class)->index()
            : app(WorkerController::class)->index();
    }

    if (Auth::guard('worker')->check()) {
        $user = Auth::guard('worker')->user();
        return $user->is_admin
            ? app(CompanyController::class)->index()
            : app(WorkerController::class)->index();
    }
      // Si no està autenticat, redirigir a la pàgina de login
    return redirect()->route('login');
})->middleware('auth:company,web,worker')->name('dashboard');

Route::middleware('auth:company,web,worker')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/worker/create', [WorkerController::class, 'create'])->name('worker.create');
    Route::post('/worker', [WorkerController::class, 'store'])->name('worker.store');
    Route::get('/worker/{worker}/edit', [WorkerController::class, 'edit'])->name('worker.edit');
    Route::put('/worker/{worker}', [WorkerController::class, 'update'])->name('worker.update');
    Route::delete('/worker/{worker}', [WorkerController::class, 'destroy'])->name('worker.destroy');

});



// Add near other routes
Route::middleware(['auth:web,company'])->group(function () {
    Route::get('/client/services/{service}', [ClientController::class, 'show'])
        ->name('client.services.show');
});
// Rutes client
Route::prefix('client')->group(function () {
    // Llistat d'empreses per servei: /client/services/1
    Route::get('/services/{service}', [ClientController::class, 'show'])
        ->name('client.services.show');

    // Formulari de cita: /client/services/1/company/2
    Route::get('/services/{service}/company/{company}', [ClientController::class, 'showAppointment'])
        ->name('client.cita.show');

    // Processar cita
    Route::post('/client/cita', [ClientController::class, 'storeAppointment'])
        ->name('client.cita.store')
        ->middleware(['auth', 'verified']);

    Route::get('/mis-citas', [ClientController::class, 'indexAppointments'])->name('client.appointments.index');
});


require __DIR__.'/auth.php';
