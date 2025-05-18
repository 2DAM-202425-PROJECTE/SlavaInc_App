<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function create()
    {
        return view('admin.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:admins,email',
            'password' => 'required|string|confirmed|min:8',
        ]);

        Admin::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return redirect()->route('administrator.admins.index')->with('success', 'Administrador creat correctament.');
    }

    public function show(Admin $admin)
    {
        return view('admin.show', compact('admin'));
    }

    public function edit(Admin $admin)
    {
        return view('admin.edit', compact('admin'));
    }

    public function update(Request $request, Admin $admin)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:admins,email,' . $admin->id,
            'password' => 'nullable|string|confirmed|min:8',
        ]);

        $admin->name = $request->name;
        $admin->email = $request->email;

        if ($request->filled('password')) {
            $admin->password = Hash::make($request->password);
        }

        $admin->save();

        return redirect()->route('administrator.admins.index')->with('success', 'Administrador actualitzat correctament.');
    }

    public function destroy(Admin $admin)
    {
        $admin->delete();

        return redirect()->route('administrator.admins.index')->with('success', 'Administrador eliminat correctament.');
    }

    /**
     * Mostrar el perfil del administrador autenticado
     */
    public function profile()
    {
        // Obtener el administrador autenticado
        $admin = Auth::guard('admin')->user();

        // Si no hay administrador autenticado, redirigir al login
        if (!$admin) {
            return redirect()->route('admin.login');
        }

        // Pasar los datos a la vista de perfil usando Inertia
        return Inertia::render('company/profile', [
            'auth' => [
                'user' => $admin,
            ],
        ]);
    }

    /**
     * Actualizar la contraseña del administrador autenticado
     */
    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required|string',
            'new_password' => 'required|string|min:8|confirmed',
        ]);

        $admin = Auth::guard('admin')->user();

        // Verificar la contraseña actual
        if (!Hash::check($request->current_password, $admin->password)) {
            return back()->withErrors([
                'current_password' => 'La contraseña actual no es correcta.',
            ]);
        }

        // Actualizar la contraseña
        $admin->password = Hash::make($request->new_password);
        $admin->save();

        return back()->with('success', 'Contraseña actualizada correctamente.');
    }
}
