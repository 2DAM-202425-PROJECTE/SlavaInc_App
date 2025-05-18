<?php

namespace App\Providers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        \Illuminate\Support\Facades\Vite::prefetch(concurrency: 3);

        Inertia::share([
            'auth' => function () {
                $guard = null;

                if (Auth::guard('web')->check()) {
                    $guard = 'web';
                } elseif (Auth::guard('company')->check()) {
                    $guard = 'company';
                } elseif (Auth::guard('worker')->check()) {
                    $guard = 'worker';
                }

                return [
                    'user' => Auth::user(),
                    'guard' => $guard,
                ];
            },
        ]);
    }
}
