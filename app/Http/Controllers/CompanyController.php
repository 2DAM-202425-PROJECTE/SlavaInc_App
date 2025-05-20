<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Company;
use App\Models\Review;
use App\Models\Notification;
use App\Models\Worker;
use App\Services\CompanyStatsService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use App\Models\Plan;
use Inertia\Response;

class CompanyController extends Controller
{
    public function index(): Response
    {
        $companyId = auth('company')->id() ?? auth('worker')->user()?->company_id;

        if (!$companyId || (auth('worker')->check() && !auth('worker')->user()->is_admin)) {
            abort(403, 'No tens permisos');
        }

        $companyStats = (new CompanyStatsService($companyId))->getAll();

        return Inertia::render('Company/Dashboard', [
            'company' => $companyStats,
        ]);
    }



    public function show(Company $company, Request $request): Response
    {
        $averageRating = Review::whereHas('companyService', function ($query) use ($company) {
            $query->where('company_id', $company->id);
        })->avg('rate');

        $reviews = Review::whereHas('companyService', function ($query) use ($company) {
            $query->where('company_id', $company->id);
        })->select('rate', 'comment', 'created_at')->get();

        return Inertia::render('Client/CompanyInfo', [
            'company' => [
                'id' => $company->id,
                'name' => $company->name,
                'email' => $company->email,
                'phone' => $company->phone,
                'address' => $company->address,
                'city' => $company->city,
                'state' => $company->state,
                'zip_code' => $company->zip_code,
                'logo' => $company->logo,
                'description' => $company->description,
                'average_rating' => $averageRating ? round($averageRating, 1) : null,
                'reviews' => $reviews,
            ],
            'serviceId' => $request->input('serviceId')
        ]);
    }

    public function updateNotifications(Request $request)
    {
        // Determinar si el usuario es una empresa o un trabajador administrador
        if (Auth::guard('company')->check()) {
            $company = Auth::guard('company')->user();
        } elseif (Auth::guard('worker')->check()) {
            $worker = Auth::guard('worker')->user();
            if (!$worker->is_admin) {
                abort(403, 'No tienes permisos para realizar esta acción');
            }
            $company = Company::findOrFail($worker->company_id);
        } else {
            abort(403, 'No tienes permisos para realizar esta acción');
        }

        $validated = $request->validate([
            'field' => 'required|in:notifications_system,notifications_appointments,notifications_reviews',
            'value' => 'required|boolean',
        ]);

        $company->update([
            $validated['field'] => $validated['value'],
        ]);

        return redirect()->route('dashboard')->with('success', 'Preferència de notificació actualitzada correctament.');
    }

    public function updateProfile(Request $request)
    {
        // Determinar si el usuario es una empresa o un trabajador administrador
        if (Auth::guard('company')->check()) {
            $company = Auth::guard('company')->user();
        } elseif (Auth::guard('worker')->check()) {
            $worker = Auth::guard('worker')->user();
            if (!$worker->is_admin) {
                abort(403, 'No tienes permisos para realizar esta acción');
            }
            $company = Company::findOrFail($worker->company_id);
        } else {
            abort(403, 'No tienes permisos para realizar esta acción');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'vat_number' => 'nullable|string|max:255',
            'founded_year' => 'nullable|integer',
            'company_type' => 'nullable|string|max:255',
            'description' => 'nullable|string',

            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'state' => 'nullable|string|max:255',
            'zip_code' => 'nullable|string|max:20',
            'phone' => 'nullable|string|max:20',
            'email' => 'required|email|max:255',
            'website' => 'nullable|string|max:255',
        ]);

        $company->update($validated);
        $this->createSystemNotification($company, 'profile_updated', [], "S'ha actualitzat el perfil de l'empresa.");

        return response()->json([
            'message' => 'Perfil actualitzat correctament.',
            'company' => $company,
        ]);
    }

    public function changePlan(Request $request)
    {
        // Determinar si el usuario es una empresa o un trabajador administrador
        if (Auth::guard('company')->check()) {
            $company = Auth::guard('company')->user();
        } elseif (Auth::guard('worker')->check()) {
            $worker = Auth::guard('worker')->user();
            if (!$worker->is_admin) {
                abort(403, 'No tienes permisos para realizar esta acción');
            }
            $company = Company::findOrFail($worker->company_id);
        } else {
            abort(403, 'No tienes permisos para realizar esta acción');
        }

        $validated = $request->validate([
            'plan_id' => 'required|exists:plans,id',
        ]);

        $company->update(['plan_id' => $validated['plan_id']]);

        $company->refresh();
        $this->createSystemNotification($company, 'plan_changed', [
            'plan_id' => $validated['plan_id'],
        ], "S'ha canviat el pla de subscripció.");
        return response()->json([
            'message' => 'Subscripció canviada correctament.',
            'plan_id' => $company->plan_id,
        ]);
    }

    public function previewClient()
    {
        session(['impersonating_client' => true]);
        return redirect()->route('dashboard');
    }

    public function exitPreview()
    {
        session()->forget('impersonating_client');
        return redirect()->route('dashboard');
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => ['required'],
            'new_password' => ['required', 'min:8', 'confirmed'],
        ]);

        // Determinar si el usuario es una empresa o un trabajador administrador
        if (Auth::guard('company')->check()) {
            $company = Auth::guard('company')->user();

            if (!\Hash::check($request->current_password, $company->password)) {
                return response()->json([
                    'message' => 'La contrasenya actual no és correcta.',
                ], 422);
            }

            $company->password = bcrypt($request->new_password);
            $company->save();
            $this->createSystemNotification(
                $company,
                'password_updated',
                [],
                "La contrasenya s'ha actualitzat correctament."
            );
        } elseif (Auth::guard('worker')->check()) {
            $worker = Auth::guard('worker')->user();
            if (!$worker->is_admin) {
                abort(403, 'No tienes permisos para realizar esta acción');
            }

            if (!\Hash::check($request->current_password, $worker->password)) {
                return response()->json([
                    'message' => 'La contrasenya actual no és correcta.',
                ], 422);
            }

            $worker->password = bcrypt($request->new_password);
            $worker->save();

            // Notificar a la empresa asociada
            $company = Company::findOrFail($worker->company_id);
            $this->createSystemNotification(
                $company,
                'worker_password_updated',
                ['worker_id' => $worker->id, 'worker_name' => $worker->name],
                "El treballador {$worker->name} ha actualitzat la seva contrasenya."
            );
        } else {
            abort(403, 'No tienes permisos para realizar esta acción');
        }


        return response()->json([
            'message' => 'Contrasenya actualitzada correctament.',
        ]);
    }

    protected function createSystemNotification($company, $action, $data = [], $message = null)
    {
        if (!$company->notifications_system) return;

        $company->notifications()->create([
            'type' => 'system',
            'action' => $action,
            'data' => $data,
            'message' => $message,
        ]);
    }
}
