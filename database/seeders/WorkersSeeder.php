<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\Worker;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class WorkersSeeder extends Seeder
{
    public function run(): void
    {
        // Obtenir totes les empreses existents
        $companies = Company::all();

        foreach ($companies as $company) {

            // Convertir el nom de la companyia en un format vàlid per correu
            $companySlug = Str::slug($company->name); // Ej: "LA MEVA EMPRESA" → "la-meva-empresa"

            for ($i = 1; $i <= 5; $i++) {
                Worker::create([
                    'company_id' => $company->id,
                    'name' => "Treballador $i de " . $company->name,
                    'email' => "treballador{$i}@{$companySlug}.com",
                    'password' => Hash::make('password'),
                    'phone' => '600' . str_pad($i . $i . $i, 6, $i, STR_PAD_LEFT),
                    'address' => $company->address,
                    'is_admin' => false,
                    'schedule' => '08:00-16:00',
                    'city' => $company->city,
                    'state' => $company->state,
                    'zip_code' => $company->zip_code,
                    'logo' => 'https://via.placeholder.com/150',
                ]);
            }
        }
    }
}
