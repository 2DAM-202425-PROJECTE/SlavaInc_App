<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    // Mostra la llista d'usuaris
    public function index()
    {
        $users = User::all();
        return Inertia::render('Administrator/Users/Index', [
            'users' => $users,
        ]);
    }

    // Mostra el formulari per crear un usuari
    public function create()
    {
        return Inertia::render('Administrator/Users/Create');
    }

    // Guarda un nou usuari
    public function store(Request $request)
    {
        // Validació de dades
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|string|in:company,admin,worker',
        ]);

        // Crea l'usuari
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        // Redirigeix a la llista d'usuaris
        return redirect()->route('administrator.users.index');
    }

    // Mostra els detalls d'un usuari
    public function show(User $user)
    {
        return Inertia::render('Administrator/Users/Show', [
            'user' => $user,
        ]);
    }

    // Mostra el formulari per editar un usuari
    public function edit(User $user)
    {
        return Inertia::render('Administrator/Users/Edit', [
            'user' => $user,
        ]);
    }

    // Actualitza un usuari
    public function update(Request $request, User $user)
    {
        // Validació de dades
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8|confirmed', // La contrasenya és opcional en l'actualització
            'role' => 'required|string|in:company,admin,worker',
        ]);

        // Actualitza l'usuari
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
        ]);

        // Si es proporciona una nova contrasenya, actualitza-la
        if ($request->password) {
            $user->update([
                'password' => Hash::make($request->password),
            ]);
        }

        // Redirigeix a la llista d'usuaris
        return redirect()->route('administrator.users.index');
    }

    // Elimina un usuari
    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('administrator.users.index');
    }
}
