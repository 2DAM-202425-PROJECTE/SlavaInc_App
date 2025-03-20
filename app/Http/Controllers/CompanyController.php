<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Worker;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CompanyController extends Controller
{
    public function index(){

        $user = Auth::guard('company')->user(); // Assegurem que estem al guard correcte

        if (!$user) {
            abort(403, 'Accés no autoritzat.');
        }

        // Carregar la informació de l'empresa i els seus treballadors
        $company = Company::where('id', $user->id)->with('workers')->first();

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
//            'is_admin' => 'nullable|boolean', // El rol admin es pot activar o desactivar
//        ]);
//
//        // Crear el treballador amb el rol is_company desactivat per defecte
//        $worker = Worker::create([
//            'company_id' => Auth::guard('company')->user()->id,
//            'name' => $request->name,
//            'email' => $request->email,
//            'phone' => $request->phone,
//            'address' => $request->address,
//            'is_admin' => $request->is_admin ?? false, // Només es pot activar si s'indica
//            'is_company' => false, // Sempre desactivat
//        ]);
//
//        return redirect()->route('company.dashboard')->with('success', 'Treballador creat correctament.');
//    }

}
