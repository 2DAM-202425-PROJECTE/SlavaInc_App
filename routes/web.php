<?php

use App\Http\Controllers\Administrator\AdminCompanyController;
use App\Http\Controllers\Administrator\AdminCompanyServicesController;
use App\Http\Controllers\Administrator\AdminDashboardController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\CompanyServiceController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WorkerController;
use App\Http\Controllers\Administrator\AdminWorkerController;
use App\Models\Service;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// RUTA INICIAL
Route::get('/', function () {
    return Auth::guard('web')->check() || Auth::guard('worker')->check() || Auth::guard('company')->check()
        ? redirect()->route('dashboard')
        : redirect()->route('login');
});

// RUTES D’ADMINISTRADOR
Route::prefix('admin')
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

// DASHBOARD segons el tipus d’usuari
Route::get('/dashboard', function () {
    if (session('impersonating_client')) {
        $services = Service::all();
        return Inertia::render('Client/Dashboard', [
            'services' => $services,
            'impersonating_client' => true,
        ]);
    }

    if (Auth::guard('web')->check()) {
        $services = Service::all();
        return Inertia::render('Client/Dashboard', [
            'services' => $services,
            'impersonating_client' => false,
        ]);
    }

    if (Auth::guard('worker')->check()) {
        $user = Auth::guard('worker')->user();
        return $user->is_admin
            ? app(\App\Http\Controllers\CompanyController::class)->index()
            : app(\App\Http\Controllers\WorkerController::class)->index();
    }

    if (Auth::guard('company')->check()) {
        return app(\App\Http\Controllers\CompanyController::class)->index();
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
                'company' => app(CompanyController::class)->getCompanyFullData(),
            ]);
        }



        return redirect()->route('login');
    })->middleware('auth:company,web,worker')->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/client/services/{service}', [ClientController::class, 'show'])->name('client.services.show');
    Route::get('/services/companies/{company}', [ClientController::class, 'showCompany'])->name('client.companies.show');
    Route::get('/services/companies/{company}', [ClientController::class, 'showCompany'])->name('client.companies.show');
    Route::get('/companies/{company}', [CompanyController::class, 'show'])
        ->name('client.companies.show')
        ->where('company', '[0-9]+');
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
    Route::patch('/company/appointments/{appointment}/complete', [\App\Http\Controllers\AppointmentController::class, 'markAsCompleted'])->name('appointments.complete');
    Route::patch('/company/appointments/{appointment}/cancel', [\App\Http\Controllers\AppointmentController::class, 'markAsCancelled'])->name('appointments.cancel');
    Route::patch('/company/settings/notifications', [CompanyController::class, 'updateNotifications'])
        ->name('company.notifications.update')
        ->middleware('auth:company');
    Route::patch('/notifications/{id}/read', [NotificationController::class, 'markAsRead'])->name('notifications.read');
    Route::patch('/notifications/mark-all-read', [NotificationController::class, 'markAllAsRead'])->name('notifications.markAllAsRead');
    Route::middleware('auth:company')->put('/company/profile', [CompanyController::class, 'updateProfile'])->name('company.updateProfile');
    Route::middleware('auth:company')->put('/company/change-plan', [CompanyController::class, 'changePlan'])->name('company.changePlan');

    Route::get('/company/preview-client', [CompanyController::class, 'previewClient'])->name('company.previewClient');
    Route::get('/company/exit-preview', [CompanyController::class, 'exitPreview'])->name('company.exitPreview');

    Route::put('/company/change-password', [CompanyController::class, 'changePassword'])->name('company.changePassword');

});


// RUTES PER A CLIENTS (WEB USERS)
Route::middleware(['auth:web'])->group(function () {
    Route::get('/services', [ClientController::class, 'indexServices'])->name('client.services.index');
    Route::get('/services/{service}/company/{company}', [ClientController::class, 'showAppointment'])->name('client.cita.show');
    Route::get('/services/companies/{company}', [ClientController::class, 'showCompany'])->name('client.companies.show');
    Route::get('/companies/{company}', [CompanyController::class, 'show'])
        ->name('client.companies.show')
        ->where('company', '[0-9]+');


    // Cites
    Route::get('/appointments', [ClientController::class, 'indexAppointments'])->name('client.appointments.index');
    Route::post('/appointments', [ClientController::class, 'storeAppointment'])->name('client.appointments.store');
    Route::get('/appointments/{appointment}', [ClientController::class, 'showAppointmentDetail'])->name('client.appointments.show');

    // Reviews
    Route::get('/reviews/create', [ClientController::class, 'createReview'])->name('client.reviews.create');
    Route::post('/reviews', [ClientController::class, 'storeReview'])->name('client.reviews.store');
    Route::put('/reviews/{review}', [ClientController::class, 'updateReview'])->name('client.reviews.update');
    Route::delete('/reviews/{review}', [ClientController::class, 'destroyReview'])->name('client.reviews.destroy');
    Route::patch('/client/appointments/{appointment}/cancel', [ClientController::class, 'cancelAppointment'])->name('client.appointments.cancel');

});

// RUTES PER A TREBALLADORS (WORKERS)
Route::middleware('auth:worker')->group(function () {
    Route::get('/worker/dashboard', function () {
        $worker = Auth::guard('worker')->user();

        return $worker->is_admin
            ? app(AdminWorkerController::class)->index()
            : app(WorkerController::class)->index();
    })->name('worker.dashboard');
    Route::get('/worker/appointments', [AdminWorkerController::class, 'indexAppointments'])->name('worker.appointments.index');
    Route::get('/worker/appointments/{appointment}', [WorkerController::class, 'showAppointment'])->name('worker.appointments.show');
    Route::patch('/worker/appointments/{appointment}/complete', [WorkerController::class, 'markAppointmentCompleted'])->name('worker.appointments.complete');
    Route::patch('/worker/appointments/{appointment}/cancel', [WorkerController::class, 'cancelAppointment'])->name('worker.appointments.cancel');
});

Route::get('/appointments/occupied', [ClientController::class, 'getOccupiedSlots'])
    ->name('client.get.occupied.slots');

// ALTRES
Route::get('/privacy', function () {return Inertia::render('Other/Privacy');})->name('privacy');
Route::get('/terms', function () { return Inertia::render('Other/Terms'); })->name('terms');

// RUTES D’AUTENTICACIÓ
require __DIR__.'/auth.php';

// Rutes per restablir la contrasenya
Route::get('/forgot-password', [PasswordResetLinkController::class, 'create'])
    ->middleware('guest')
    ->name('password.request');

Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
    ->middleware('guest')
    ->name('password.email');

Route::get('/reset-password', function () {
    return redirect()->route('login');
})->middleware('guest');


Route::get('/reset-password/{token}', [NewPasswordController::class, 'create'])
    ->middleware('guest')
    ->name('password.reset');

Route::post('/reset-password', [NewPasswordController::class, 'store'])
    ->middleware('guest')
    ->name('password.store');

// Rutes per tancar la sessió
Route::post('/logout', function () {
    if (Auth::guard('web')->check()) {
        Auth::guard('web')->logout();
    } elseif (Auth::guard('company')->check()) {
        Auth::guard('company')->logout();
    } elseif (Auth::guard('worker')->check()) {
        Auth::guard('worker')->logout();
    }

    request()->session()->invalidate();
    request()->session()->regenerateToken();

    return redirect('/login');
})->name('logout');
