<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    // Ruta per al formulari de registre
    Route::get('register', [RegisteredUserController::class, 'create'])
        ->name('register');

    // Ruta per processar el registre (amb rol: client o company)
    Route::post('register', [RegisteredUserController::class, 'store']);

    // Ruta per al formulari de login
    Route::get('login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');

    // Ruta per processar el login (amb rol: client o company)
    Route::post('login', [AuthenticatedSessionController::class, 'store'])
        ->middleware('throttle:5,1'); // Limita els intents de login

    // Rutes per a la recuperació de contrasenya
    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
        ->name('password.request');

    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
        ->name('password.email');

    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
        ->name('password.reset');

    Route::post('reset-password', [NewPasswordController::class, 'store'])
        ->name('password.store');
});

Route::middleware('auth')->group(function () {
    // Rutes per a la verificació de correu electrònic
    Route::get('verify-email', EmailVerificationPromptController::class)
        ->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('verification.send');

    // Rutes per a la confirmació de contrasenya
    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
        ->name('password.confirm');

    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

    // Ruta per actualitzar la contrasenya
    Route::put('password', [PasswordController::class, 'update'])->name('password.update');

    // Ruta per tancar sessió
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});
