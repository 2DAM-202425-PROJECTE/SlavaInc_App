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
// Verificar si l'usuari és un treballador
        if (Auth::guard('worker')->check()) {
            $user = Auth::guard('worker')->user();

            // Si és treballador i no és admin (is_admin == 0), mostrar la seva pròpia dashboard

            if ($user->is_admin == 1) {
                return Inertia::render('Company/Dashboard');  // Vista de treballador sense permisos d'admin
            }

            // Si és treballador i és admin (is_admin == 1), redirigir a la company dashboard
            return Inertia::render('Worker/Dashboard');  // Vista d'empresa per treballadors amb permisos
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
