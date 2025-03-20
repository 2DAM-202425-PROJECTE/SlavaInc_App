<?php

use App\Http\Controllers\CompanyController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WorkerController;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use App\Models\Company;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login'); // Redirigeix a la ruta de login
});

Route::get('/dashboard', function () {
    // Verificar primer els clients (guard 'web')
    if (Auth::guard('web')->check()) {
        return Inertia::render('Client/Dashboard');
    }

    // Verificar després els treballadors/admins (guard 'company')
    if (Auth::guard('company')->check()) {
        return app(CompanyController::class)->index();
    }

    if (Auth::guard('worker')->check()) {
        return app(WorkerController::class)->index();
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



require __DIR__.'/auth.php';
