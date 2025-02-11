<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CompanyController extends Controller
{
    public function index()
    {
        // Carreguem l'usuari AMB company i workers
        $user = Auth::user()->load(['company.workers']);

        if ($user->role !== 'company' || !$user->company) {
            abort(403, 'Accés no autoritzat o empresa no registrada.');
        }

        return Inertia::render('Company/Dashboard', [
            'companyData' => [
                'user_info' => $user->only('id', 'name', 'email'),
                'company_details' => [
                    'info' => $user->company, // ✨ Dades de l'empresa
                    'workers' => $user->company->workers // ✨ Llista de treballadors
                ]
            ]
        ]);
    }
}
