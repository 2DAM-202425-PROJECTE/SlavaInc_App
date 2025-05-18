<?php

namespace App\Http\Controllers;

use App\Models\Quote;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class QuoteController extends Controller
{
    // Form de sol·licitud per al client
    public function create($serviceId, $companyId): Response
    {
        return Inertia::render('Client/QuoteRequest', [
            'serviceId' => $serviceId,
            'companyId' => $companyId,
        ]);
    }

    // Desa la sol·licitud
    public function store(Request $request)
    {
        // Validem les dades rebudes
        $attrs = $request->validate([
            'service_id' => 'required|exists:services,id',
            'company_id' => 'required|exists:companies,id',
            'description' => 'required|string',
        ]);

        // Afegim l'ID de l'usuari autenticat
        $attrs['user_id'] = Auth::id();

        // Creem la sol·licitud a la base de dades
        Quote::create($attrs);

        // Redirigim amb Inertia::location
        return Inertia::location('/services/5');
    }

    // Llista de pressupostos per a l’empresa
    public function index(): Response
    {
        $quotes = Quote::with(['user', 'service'])
            ->where('company_id', Auth::id())
            ->latest()
            ->get();

        return Inertia::render('Company/QuotesList', [
            'quotes' => $quotes,
        ]);
    }

    // Detall i resposta
    public function show(Quote $quote): Response
    {
        return Inertia::render('Company/QuoteDetail', [
            'quote' => $quote,
        ]);
    }

    // L’empresa respon al pressupost
    public function respond(Request $request, Quote $quote): RedirectResponse
    {
        $data = $request->validate([
            'amount'  => 'required|numeric',
            'message' => 'nullable|string',
            'status'  => 'required|in:quoted,accepted,declined',
        ]);

        $quote->update($data);

        return redirect()->back()->with('success', 'Resposta enviada!');
    }
}
