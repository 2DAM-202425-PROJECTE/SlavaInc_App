<?php

namespace App\Http\Controllers;

use App\Models\LoginCompany;
use App\Models\Service;
use App\Models\Appointment;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ClientController extends Controller
{
    /**
     * Mostra la informació del servei i les empreses associades.
     *
     * @param Service $service
     * @return Response
     */
    public function show(Service $service): Response
    {
        if (auth()->user()->role !== 'client') {
            abort(403);
        }
        // Carrega les companyies amb les dades del pivot
        $service->load(['companies' => function($query) {
            $query->withPivot('price_per_unit', 'unit', 'min_price', 'max_price', 'logo');
        }]);

        return Inertia::render('Client/ServiceInfo', [
            'service' => $service,
            'companies' => $service->companies
        ]);
    }
    /**
     * Mostra el formulari de reserva de cita.
     *
     * @param Request $request
     * @return Response
     */
    public function showAppointment(Service $service, LoginCompany $company): Response
    {
        // Verificar que la companyia té aquest servei
        if (!$company->services->contains($service->id)) {
            abort(404, 'Aquesta empresa no ofereix aquest servei');
        }

        // Carregar dades del pivot
        $company->load(['services' => function($query) use ($service) {
            $query->where('services.id', $service->id)
                ->withPivot('price_per_unit', 'unit', 'min_price', 'max_price', 'logo');
        }]);

        return Inertia::render('Client/CitesClients', [
            'service' => $service,
            'company' => $company
        ]);
    }

    /**
     * Guarda una nova cita a la base de dades.
     *
     * @param Request $request
     * @return RedirectResponse
     */
    public function storeAppointment(Request $request): RedirectResponse
    {
        $request->validate([
            'company_id' => 'required|exists:login_companies,id', // Corregit aquí
            'service_id' => 'required|exists:services,id',
            'date' => 'required|date|after_or_equal:today',
            'time' => 'required|date_format:H:i',
            'price' => 'required|numeric',
            'notes' => 'nullable|string|max:500'
        ]);

        Appointment::create([
            'user_id' => auth()->id(),
            'company_id' => $request->company_id,
            'service_id' => $request->service_id,
            'date' => $request->date,
            'time' => $request->time,
            'price' => $request->price,
            'notes' => $request->notes
        ]);

        return redirect()->route('client.dashboard')->with('success', 'Cita reservada correctament.');
    }
}
