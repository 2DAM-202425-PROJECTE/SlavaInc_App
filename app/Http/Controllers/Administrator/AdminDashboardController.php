<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Service;
use App\Models\Worker;
use App\Models\Company;

class AdminDashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Administrator/AdminDashboard', [
            'stats' => [
                'users' => User::count(),
                'services' => Service::count(),
                'workers' => Worker::count(),
                'companies' => Company::count(),
            ]
        ]);
    }
}
