<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\Plan;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class RegisteredUserController extends Controller
{
    public function create()
    {
        return Inertia::render('Auth/Register');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email|unique:companies,email',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // Crear l'usuari a la taula corresponent
        if ($request->role === 'client') {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            Auth::guard('web')->login($user);

            event(new Registered($user));

            return redirect()->route('profile.edit');
        } else if ($request->role === 'company') {
            $basicPlan = Plan::where('name', 'Bàsic')->first();

            $company = Company::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'plan_id' => $basicPlan?->id,
            ]);

            Auth::guard('company')->login($company);

            event(new Registered($company));

            return redirect()->route('dashboard');
        }
    
    }
}
