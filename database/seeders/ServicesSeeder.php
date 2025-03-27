<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\Service;
use Illuminate\Database\Seeder;

class ServicesSeeder extends Seeder
{
    public function run(): void
    {
        // Eliminar registres existents
        Service::query()->delete();
        \DB::table('companies_services')->delete();

        // Crear serveis base
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
                'name' => 'Altres serveis',
                'description' => 'Serveis de neteja especialitzats o personalitzats',
                'type' => 'altres'
            ]
        ];

        foreach ($services as $serviceData) {
            Service::create($serviceData);
        }

        // Assignar entre 3 i 5 serveis aleatoris a cada empresa
        $companies = Company::all();
        $servicesIds = Service::pluck('id');
        // Configuració de preus per tipus de servei
        $serviceConfig = [
            'casa' => [
                'unit' => 'm²',
                'price_per_unit' => 5.50,
                'min_price' => 100,
                'max_price' => 500
            ],
            'garatge' => [
                'unit' => 'm²',
                'price_per_unit' => 8.00,
                'min_price' => 50,
                'max_price' => 300
            ],
            'cotxe' => [
                'unit' => 'mida',
                'price_per_unit' => null,
                'min_price' => 50,
                'max_price' => 200
            ],
            'piscina' => [
                'unit' => 'mida',
                'price_per_unit' => null,
                'min_price' => 80,
                'max_price' => 500
            ]
        ];

        // Obtenir totes les companyies
        $companies = Company::all();

        // Assignar serveis a companyies
        $companies[0]->services()->attach([1, 3], [
            'price_per_unit' => $serviceConfig['casa']['price_per_unit'],
            'unit' => $serviceConfig['casa']['unit'],
            'min_price' => $serviceConfig['casa']['min_price'],
            'max_price' => $serviceConfig['casa']['max_price'],
            'logo' => $companies[0]->logo,
        ]);

        $companies[1]->services()->attach([2, 4], [
            'price_per_unit' => $serviceConfig['cotxe']['price_per_unit'],
            'unit' => $serviceConfig['cotxe']['unit'],
            'min_price' => $serviceConfig['cotxe']['min_price'],
            'max_price' => $serviceConfig['cotxe']['max_price'],
            'logo' => $companies[1]->logo,
        ]);

        $companies[2]->services()->attach([1, 2, 3, 4], [
            'price_per_unit' => 7.00,
            'unit' => 'm²',
            'min_price' => 80,
            'max_price' => 400,
            'logo' => $companies[2]->logo,
        ]);

        $companies[3]->services()->attach(1, [
            'price_per_unit' => $serviceConfig['casa']['price_per_unit'],
            'unit' => $serviceConfig['casa']['unit'],
            'min_price' => $serviceConfig['casa']['min_price'],
            'max_price' => $serviceConfig['casa']['max_price'],
            'logo' => $companies[3]->logo,
        ]);

        $companies[4]->services()->attach([3, 4], [
            'price_per_unit' => $serviceConfig['garatge']['price_per_unit'],
            'unit' => $serviceConfig['garatge']['unit'],
            'min_price' => $serviceConfig['garatge']['min_price'],
            'max_price' => $serviceConfig['garatge']['max_price'],
            'logo' => $companies[4]->logo,
        ]);

        $companies[5]->services()->attach(2, [
            'price_per_unit' => $serviceConfig['cotxe']['price_per_unit'],
            'unit' => $serviceConfig['cotxe']['unit'],
            'min_price' => $serviceConfig['cotxe']['min_price'],
            'max_price' => $serviceConfig['cotxe']['max_price'],
            'logo' => $companies[5]->logo,
        ]);

        $companies[0]->services()->attach(5, [
            'price_per_unit' => 25.00,
            'unit' => 'hores',
            'min_price' => null,
            'max_price' => null,
            'logo' => $companies[0]->logo,
        ]);

        $companies[2]->services()->attach(5, [
            'price_per_unit' => 15.50,
            'unit' => 'unitats',
            'min_price' => null,
            'max_price' => null,
            'logo' => $companies[2]->logo,
        ]);

        $companies[4]->services()->attach(5, [
            'price_per_unit' => 40.00,
            'unit' => 'projecte',
            'min_price' => null,
            'max_price' => null,
            'logo' => $companies[4]->logo,
        ]);
    }
}
