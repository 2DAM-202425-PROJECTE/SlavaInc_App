<?php

namespace Database\Seeders;

use App\Models\Plan;
use Illuminate\Database\Seeder;

class PlanSeeder extends Seeder
{
    public function run(): void
    {
        Plan::create([
            'name' => 'Bàsic',
            'price' => 49.99,
            'features' => [
                'Fins a 5 treballadors',
                'Fins a 3 serveis',
                'Sense accés a estadístiques',
            ],
            'max_workers' => 5,
            'max_services' => 3,
            'extra_stats' => false,
            'can_view_stats' => false,
        ]);

        Plan::create([
            'name' => 'Professional',
            'price' => 99.99,
            'features' => [
                'Fins a 15 treballadors',
                'Fins a 10 serveis',
                'Accés a estadístiques bàsiques',
            ],
            'max_workers' => 15,
            'max_services' => 10,
            'extra_stats' => false,
            'can_view_stats' => true,
        ]);

        Plan::create([
            'name' => 'Premium',
            'price' => 199.99,
            'features' => [
                'Treballadors il·limitats',
                'Serveis il·limitats',
                'Estadístiques avançades',
            ],
            'max_workers' => null,
            'max_services' => null,
            'extra_stats' => true,
            'can_view_stats' => true,
        ]);
    }
}
