<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Inertia\Inertia;

class ClientController extends Controller
{
    public function show(Service $service): \Inertia\Response
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
}
