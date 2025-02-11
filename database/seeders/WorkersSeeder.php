<?php

namespace Database\Seeders;

use App\Models\LoginCompany;
use App\Models\Worker;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WorkersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Obtenir totes les empreses existents
        $companies = LoginCompany::all();

        foreach ($companies as $company) {
            // Treballador 1
            Worker::create([
                'company_id' => $company->id,
                'name' => 'Treballador 1 de ' . $company->name,
                'schedule' => '08:00-16:00',
                'address' => $company->address,
                'city' => $company->city,
                'state' => $company->state,
                'zip_code' => $company->zip_code,
                'phone' => '600111222'
            ]);

            // Treballador 2
            Worker::create([
                'company_id' => 2,
                'name' => 'Treballador 2 de ' . $company->name,
                'schedule' => '09:00-17:00',
                'address' => $company->address,
                'city' => $company->city,
                'state' => $company->state,
                'zip_code' => $company->zip_code,
                'phone' => '600333444'
            ]);
        }
    }
}
