<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Mostrar la llista d'administradors.
     */
    public function index()
    {
        $admins = Admin::all();

        return Inertia::render('Administrator/Admins/Index', [
            'admins' => $admins,
            'auth' => [
                'user' => Auth::user() // Asegúrate de pasar el usuario autenticado
            ]
        ]);
    }

    /**
     * Mostrar formulari per crear un nou administrador.
     */
    public function create()
    {
        return Inertia::render('Administrator/Admins/Create');
    }

    /**
     * Emmagatzemar un nou administrador a la base de dades.
     */
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

    /**
     * Mostrar informació detallada d'un administrador.
     */
    public function show(Admin $admin)
    {
        return Inertia::render('Administrator/Admins/Show', [
            'admin' => $admin,
        ]);
    }

    /**
     * Mostrar formulari per editar un administrador.
     */
    public function edit(Admin $admin)
    {
        return Inertia::render('Administrator/Admins/Edit', [
            'admin' => $admin,
        ]);
    }

    /**
     * Actualitzar la informació d'un administrador.
     */
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

    /**
     * Eliminar un administrador.
     */
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
        $admin = Auth::guard('admin')->user();

        if (!$admin) {
            return redirect()->route('admin.login');
        }

        return Inertia::render('Administrator/Profile', [
            'admin' => $admin // Només passem admin directament
        ]);
    }

    /**
     * Actualizar el perfil del administrador autenticado
     */
    public function updateProfile(Request $request)
    {
        $admin = Auth::guard('admin')->user();

        if (!$admin) {
            return redirect()->route('admin.login');
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:admins,email,' . $admin->id,
        ]);

        $admin->name = $request->name;
        $admin->email = $request->email;
        $admin->save();

        return back()->with('success', 'Perfil actualitzat correctament.');
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
