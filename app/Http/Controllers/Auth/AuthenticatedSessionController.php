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
            'role' => 'required|in:client,company',
        ]);

        if ($request->role === 'client') {
            if (Auth::guard('web')->attempt($request->only('email', 'password'))) {
                $request->session()->regenerate();
                return redirect()->intended('dashboard');
            }
        }

        // Intentar autenticar com a empresa
        if (Auth::guard('company')->attempt($request->only('email', 'password'))) {
            $request->session()->regenerate();
            return redirect()->intended('dashboard');
        }

        // Intentar autenticar com a treballador
        if (Auth::guard('worker')->attempt($request->only('email', 'password'))) {
            $request->session()->regenerate();

            $user = Auth::guard('worker')->user();
            return $user->is_admin
                ? redirect()->intended(route('company.dashboard'))
                : redirect()->intended(route('worker.dashboard'));
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }


    public function destroy(Request $request)
    {
        // Tancar la sessió segons el guard actual
        if (Auth::guard('web')->check()) {
            Auth::guard('web')->logout();
        } elseif (Auth::guard('company')->check()) {
            Auth::guard('company')->logout();
        }

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
