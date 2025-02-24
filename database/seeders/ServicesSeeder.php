<?php

namespace Database\Seeders;

use App\Models\LoginCompany;
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
            ]
        ];

        foreach ($services as $serviceData) {
            Service::create($serviceData);
        }

        // Dins del mètode run() del ServicesSeeder
        $companies = LoginCompany::all();

        // Neteja Express - Casa + Garatge
        $companies[0]->services()->attach([1, 3]);

        // AquaClean - Cotxe + Piscina
        $companies[1]->services()->attach([2, 4]);

        // Neteges Integral - Tots els serveis
        $companies[2]->services()->attach([1, 2, 3, 4]);

        // Llar Neta - Només casa
        $companies[3]->services()->attach(1);

        // GarageMasters - Garatge + Piscina
        $companies[4]->services()->attach([3, 4]);

        // AutoShine - Només cotxe
        $companies[5]->services()->attach(2);
    }
}
