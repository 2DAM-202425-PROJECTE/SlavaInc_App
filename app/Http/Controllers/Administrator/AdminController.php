<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
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
            'admins' => $admins
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
            'password' => 'required|string|min:8|confirmed',
        ]);

        Admin::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return redirect()->route('administrator.admins.index');
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
            'password' => 'nullable|string|min:8|confirmed',
        ]);

        $admin->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        if ($request->password) {
            $admin->update([
                'password' => Hash::make($request->password),
            ]);
        }

        return redirect()->route('administrator.admins.index');
    }

    /**
     * Eliminar un administrador.
     */
    public function destroy(Admin $admin)
    {
        $admin->delete();

        return redirect()->route('administrator.admins.index');
    }
}
