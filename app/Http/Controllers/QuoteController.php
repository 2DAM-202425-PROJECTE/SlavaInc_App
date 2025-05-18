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
        // Només els clients (guard 'web') poden crear pressupostos
        if (!Auth::guard('web')->check()) {
            return redirect()->route('login');
        }

        return Inertia::render('Client/QuoteRequest', [
            'serviceId' => $serviceId,
            'companyId' => $companyId,
        ]);
    }

    // Desa la sol·licitud
    public function store(Request $request)
    {
        if (!Auth::guard('web')->check()) {
            return redirect()->route('login');
        }

        $attrs = $request->validate([
            'service_id' => 'required|exists:services,id',
            'company_id' => 'required|exists:companies,id',
            'description' => 'required|string',
            'preferred_date' => 'nullable|date',
            'preferred_time' => 'nullable|date_format:H:i',
        ]);

        $attrs['user_id'] = Auth::id();
        Quote::create($attrs);

        return Inertia::location('/quotes');
    }

    // Llista de pressupostos
    public function index(): Response
    {
        if (Auth::guard('web')->check()) {
            $userType = 'client';
            $quotes = Quote::with(['company', 'service'])
                ->where('user_id', Auth::id())
                ->latest()
                ->get();
        } elseif (Auth::guard('company')->check()) {
            $userType = 'company';
            $quotes = Quote::with(['user', 'service'])
                ->where('company_id', Auth::id())
                ->latest()
                ->get();
        } else {
            return redirect()->route('login');
        }

        return Inertia::render('Client/QuotesList', [
            'quotes' => $quotes,
            'userType' => $userType,
        ]);
    }

    // Detall del pressupost
    public function show(Quote $quote): Response
    {
        if (Auth::guard('web')->check()) {
            $userType = 'client';
            if ($quote->user_id !== Auth::id()) {
                abort(403, 'No tens permís per veure aquest pressupost.');
            }
            $quote->load(['company', 'service']);
        } elseif (Auth::guard('company')->check()) {
            $userType = 'company';
            if ($quote->company_id !== Auth::id()) {
                abort(403, 'No tens permís per veure aquest pressupost.');
            }
            $quote->load(['user', 'service']);
        } else {
            return redirect()->route('login');
        }

        return Inertia::render('Client/QuoteDetail', [
            'quote' => $quote,
            'userType' => $userType,
        ]);
    }

    // L'empresa respon al pressupost
    public function respond(Request $request, Quote $quote): RedirectResponse
    {
        if (!Auth::guard('company')->check() || $quote->company_id !== Auth::id()) {
            abort(403);
        }

        $data = $request->validate([
            'amount' => 'required|numeric',
            'message' => 'nullable|string',
        ]);

        $quote->update([
            'amount' => $data['amount'],
            'message' => $data['message'],
            'status' => 'quoted',
        ]);

        return redirect()->back()->with('success', 'Resposta enviada!');
    }

    // El client accepta o rebutja el pressupost
    public function updateStatus(Request $request, Quote $quote): RedirectResponse
    {
        if (!Auth::guard('web')->check() || $quote->user_id !== Auth::id() || $quote->status !== 'quoted') {
            abort(403);
        }

        $data = $request->validate([
            'status' => 'required|in:accepted,declined',
        ]);

        $quote->update([
            'status' => $data['status'],
        ]);

        return redirect()->back()->with('success', 'Estat actualitzat!');
    }
}
