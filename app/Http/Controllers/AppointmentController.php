<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Support\Facades\Auth;

class AppointmentController extends Controller
{
    public function markAsCompleted($id)
    {
        $company = Auth::guard('company')->user();

        $appointment = Appointment::where('company_id', $company->id)
            ->where('id', $id)
            ->firstOrFail();

        $appointment->status = 'completed';
        $appointment->save();
        $this->createSystemNotification($company, 'appointment_completed', [
            'appointmentId' => $appointment->id,
            'date' => $appointment->date,
        ], 'Una cita ha estat completada.');

        return redirect()->back()->with('success', 'Cita marcada com a completada.');
    }

    public function markAsCancelled($id)
    {
        $company = Auth::guard('company')->user();

        $appointment = Appointment::where('company_id', $company->id)
            ->where('id', $id)
            ->firstOrFail();

        $appointment->status = 'cancelled';
        $appointment->save();
        $this->createSystemNotification($company, 'appointment_cancelled', [
            'appointmentId' => $appointment->id,
            'date' => $appointment->date,
        ], 'Una cita ha estat cancel·lada.');

        return redirect()->back()->with('success', 'Cita cancel·lada correctament.');
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
