<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login'); // 👈 Redirigeix a la ruta de login
});

Route::get('/dashboard', function () {
    // Redirigir a la pàgina de dashboard corresponent segons el tipus d'usuari
    if (auth()->user()->role === 'client') {
        return Inertia::render('Client/dashboard');
    } elseif (auth()->user()->role === 'company') {
        return Inertia::render('Company/dashboard');
    }
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::get('/Empresa/index', function () {
    return Inertia::render('Empresa/Index');
});

require __DIR__.'/auth.php';
