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
        $user = Auth::guard('company')->user();

        return $user->is_admin
            ? app(CompanyController::class)->index()
            : app(WorkerController::class)->index();
    }

    // Si no està autenticat, redirigir a la pàgina de login
    return redirect()->route('login');
})->middleware('auth:company,web')->name('dashboard');

Route::middleware('auth:company,web')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
