<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CompanyOrWorkerAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Verificar si el usuario es una empresa
        if (Auth::guard('company')->check()) {
            return $next($request);
        }

        // Verificar si el usuario es un trabajador con permisos de administrador
        if (Auth::guard('worker')->check() && Auth::guard('worker')->user()->is_admin) {
            return $next($request);
        }

        // Si no cumple ninguna de las condiciones anteriores, redirigir al login
        return redirect()->route('login')->with('error', 'No tienes permisos para acceder a esta página');
    }
}
