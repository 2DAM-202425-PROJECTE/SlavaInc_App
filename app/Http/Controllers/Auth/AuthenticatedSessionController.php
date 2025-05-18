<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthenticatedSessionController extends Controller
{
    public function create()
    {
        return Inertia::render('Auth/Login');
    }

    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $guards = ['admin', 'web', 'worker', 'company'];

        foreach ($guards as $guard) {
            Auth::guard($guard)->logout();
        }

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // Intenta iniciar sessió amb cada guard amb el següent ordre ['web', 'worker', 'company']
        foreach ($guards as $guard) {
            if (Auth::guard($guard)->attempt($request->only('email', 'password'))) {
                $request->session()->regenerate();

                if ($guard == 'admin') {
                    return redirect()->route('administrator.dashboard');
                }
                return redirect()->intended('dashboard');
            }
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }


    public function destroy(Request $request)
    {
        $guards = ['admin', 'web', 'worker', 'company'];

        foreach ($guards as $guard) {
            if (Auth::guard($guard)->check()) {
                Auth::guard($guard)->logout();
            }
        }

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
