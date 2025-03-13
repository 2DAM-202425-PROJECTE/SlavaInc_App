<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\Service;
use Illuminate\Database\Seeder;

class ServicesSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            [
                'name' => 'Neteja de casa',
                'description' => 'Servei de neteja domèstica i manteniment del llar',
                'type' => 'casa'
            ],
            [
                'name' => 'Neteja de cotxe',
                'description' => 'Rentat i neteja integral de vehicles',
                'type' => 'cotxe'
            ],
            [
                'name' => 'Neteja de garatge',
                'description' => 'Organització i neteja de espais de emmagatzematge',
                'type' => 'garatge'
            ],
            [
                'name' => 'Neteja de piscina',
                'description' => 'Manteniment i neteja estacional de piscines',
                'type' => 'piscina'
            ],
            [
                'name' => 'Neteja postobres',
                'description' => 'Neteja profunda després de obres o reformes',
                'type' => 'postobres'
            ],
            [
                'name' => 'Neteja ecològica',
                'description' => 'Serveis de neteja amb productes ecològics i sostenibles',
                'type' => 'ecologica'
            ],
            [
                'name' => 'Neteja de vidres',
                'description' => 'Neteja especialitzada de finestres i superfícies de vidre',
                'type' => 'vidre'
            ]
        ];

        foreach ($services as $serviceData) {
            Service::create($serviceData);
        }

        // Assignar entre 3 i 5 serveis aleatoris a cada empresa
        $companies = Company::all();
        $servicesIds = Service::pluck('id');

        foreach ($companies as $company) {
            $company->services()->attach(
                $servicesIds->random(rand(3, 5))->unique()
            );
        }
    }
}
