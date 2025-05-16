<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Appointment;
use App\Models\CompanyService;

class AppointmentCompanyServiceSeeder extends Seeder
{
    public function run(): void
    {
        $appointments = Appointment::all();

        foreach ($appointments as $appointment) {
            $companyService = CompanyService::where('company_id', $appointment->company_id)
                ->where('service_id', $appointment->service_id)
                ->first();

            if ($companyService) {
                $appointment->update(['company_service_id' => $companyService->id]);
            }
        }
    }
}
