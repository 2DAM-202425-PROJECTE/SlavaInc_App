<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Worker;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CompanyController extends Controller
{
    public function index()
    {
        $user = null;

        if (Auth::guard('worker')->check()) {
            $user = Auth::guard('worker')->user();

            if ($user->is_admin) {
                // Carregar la informació de l'empresa associada al treballador
                $company = Company::where('id', $user->company_id)->with('workers')->first();
            }
        } elseif (Auth::guard('company')->check()) {
            $user = Auth::guard('company')->user();
            $company = Company::where('id', $user->id)->with('workers')->first();
        }

        if (!$user || !isset($company)) {
            return redirect()->route('login');
        }

        return Inertia::render('Company/Dashboard', [
            'companyData' => [
                'user_info' => $user->only('id', 'name', 'email'),
                'company_details' => [
                    'info' => $company,
                    'workers' => $company->workers ?? []
                ]
            ]
        ]);
    }

        //Funcio per crear treballadors associats a l'empresa
//    public function createWorker(Request $request)
//    {
//        $request->validate([
//            'name' => 'required|string|max:255',
//            'email' => 'required|string|email|max:255|unique:workers',
//            'phone' => 'required|string|max:20',
//            'address' => 'required|string|max:255',
//        ]);
//
//        // Crear el treballador amb el rol is_company desactivat per defecte
//        $worker = Worker::create([
//            'company_id' => Auth::guard('company')->user()->id,
//            'name' => $request->name,
//            'email' => $request->email,
//            'phone' => $request->phone,
//            'address' => $request->address,
//        ]);
//
//        return redirect()->route('company.dashboard')->with('success', 'Treballador creat correctament.');
//    }

}
