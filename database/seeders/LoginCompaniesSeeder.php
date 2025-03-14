<?php

namespace Database\Seeders;

use App\Models\Company;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class LoginCompaniesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Primera empresa
        Company::create([
            'name'    => 'Empresa Demo',
            'email'   => 'empresa@demo.com',
            'password' => Hash::make('password'),
            'address' => "Carrer de l'Empresa, 10",
            'city'    => 'Barcelona',
            'state'   => 'Catalunya',
            'zip_code'=> '08002',
            'phone'   => '123456789',
            'is_company' => true,
            'is_admin' => true
        ]);

        // Segona empresa
        Company::create([
            'name'    => 'Empresa Demo 2',
            'email'   => 'empresa2@demo.com',
            'password' => Hash::make('password'),
            'address' => "Avinguda de l'Empresa, 20",
            'city'    => 'València',
            'state'   => 'Comunitat Valenciana',
            'zip_code'=> '46001',
            'phone'   => '987654321',
            'is_company' => true,
            'is_admin' => true
        ]);

        // Tercera empresa
        Company::create([
            'name'    => 'Empresa Demo 3',
            'email'   => 'empresa3@demo.com',
            'password' => Hash::make('password'),
            'address' => "Plaça de l'Empresa, 30",
            'city'    => 'Madrid',
            'state'   => 'Comunitat de Madrid',
            'zip_code'=> '28001',
            'phone'   => '654987321',
            'is_company' => true,
            'is_admin' => true
        ]);
    }
}
