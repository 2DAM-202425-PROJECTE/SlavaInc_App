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

        $service->load('companies');

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
    public function showAppointment(Request $request, LoginCompany $company): Response
    {
        // Validar que el servei existeix (passat com a query parameter)
        $serviceId = $request->query('service_id');
        $service = Service::findOrFail($serviceId);

        // Obtenir el preu estimat (passat com a query parameter)
        $priceEstimate = $request->query('priceEstimate');

        // Obtenir el logo del pivot (si existeix)
        $logo = $company->getLogoFromPivot($service->id);

        // Afegir el logo al objecte company
        $company->pivot = ['logo' => $logo];

        return Inertia::render('Client/CitesClients', [
            'company' => $company,
            'service' => $service,
            'priceEstimate' => $priceEstimate
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
        if (auth()->user()->role !== 'client') {
            abort(403);
        }

        $request->validate([
            'company_id' => 'required|exists:companies,id',
            'service_id' => 'required|exists:services,id',
            'date' => 'required|date|after_or_equal:today',
            'time' => 'required|date_format:H:i',
            'price' => 'required|numeric',
            'notes' => 'nullable|string|max:500'
        ]);

        // Crear la cita
        Appointment::create([
            'user_id' => auth()->id(),
            'company_id' => $request->company_id,
            'service_id' => $request->service_id,
            'date' => $request->date,
            'time' => $request->time,
            'price' => $request->price,
            'notes' => $request->notes,
            'status' => 'pending' // Estat per defecte
        ]);

        return redirect()->route('client.dashboard')->with('success', 'Cita reservada correctament.');
    }
}
