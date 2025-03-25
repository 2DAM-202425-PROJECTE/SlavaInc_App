<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\Worker;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class WorkersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Obtenir totes les empreses existents
        $companies = Company::all();

        foreach ($companies as $company) {
            // Treballador 1
            Worker::create([
                'company_id' => $company->id,
                'name' => 'Treballador 1 de ' . $company->name,
                'email' => 'treballador1@' . $company->name . '.com',
                'password' => Hash::make('password'), // Poses una contrasenya segura
                'phone' => '600111222',
                'address' => $company->address,
//                'is_admin' => false,
            ]);

            // Treballador 2
            Worker::create([
                'company_id' => $company->id,
                'name' => 'Treballador 2 de ' . $company->name,
                'email' => 'treballador2@' . $company->name . '.com',
                'password' => Hash::make('password'),
                'phone' => '600222333',
                'address' => $company->address,
//                'is_admin' => false,
            ]);

            // Treballador 3
            Worker::create([
                'company_id' => $company->id,
                'name' => 'Treballador 3 de ' . $company->name,
                'email' => 'treballador3@' . $company->name . '.com',
                'password' => Hash::make('password'),
                'phone' => '600333444',
                'address' => $company->address,
//                'is_admin' => false,
            ]);

            // Treballador 4
            Worker::create([
                'company_id' => $company->id,
                'name' => 'Treballador 4 de ' . $company->name,
                'email' => 'treballador4@' . $company->name . '.com',
                'password' => Hash::make('password'),
                'phone' => '600444555',
                'address' => $company->address,
//                'is_admin' => false,
            ]);

            // Treballador 5
            Worker::create([
                'company_id' => $company->id,
                'name' => 'Treballador 5 de ' . $company->name,
                'email' => 'treballador5@' . $company->name . '.com',
                'password' => Hash::make('password'),
                'phone' => '600555666',
                'address' => $company->address,
//                'is_admin' => false,
            ]);
        }
    }
}
