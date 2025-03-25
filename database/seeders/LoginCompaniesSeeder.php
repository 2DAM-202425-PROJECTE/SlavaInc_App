<?php

namespace Database\Seeders;

use App\Models\Company;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class LoginCompaniesSeeder extends Seeder
{
    public function run(): void
    {
        // Empresa 1 - Especialista en neteja domèstica i garatges
        Company::create([
            'name'    => 'Neteja Express',
            'email'   => 'info@netegaexpress.com',
            'password' => Hash::make('password'),
            'address' => 'Carrer dels Lladres, 42',
            'city'    => 'Barcelona',
            'state'   => 'Catalunya',
            'zip_code'=> '08001',
            'phone'   => '933112233',
            'is_admin' => true
        ]);

        // Empresa 2 - Especialista en vehicles i piscines
        Company::create([
            'name'    => 'AquaClean',
            'email'   => 'contacte@aquaclean.com',
            'password' => Hash::make('password'),
            'address' => 'Avinguda del Mar, 15',
            'city'    => 'València',
            'state'   => 'Comunitat Valenciana',
            'zip_code'=> '46002',
            'phone'   => '961234567',
            'is_admin' => true
        ]);

        // Empresa 3 - Empresa generalista
        Company::create([
            'name'    => 'Neteges Integral',
            'email'   => 'info@netegesintegral.cat',
            'password' => Hash::make('password'),
            'address' => 'Carrer Major, 77',
            'city'    => 'Lleida',
            'state'   => 'Catalunya',
            'zip_code'=> '25002',
            'phone'   => '973451234',
            'is_admin' => true
        ]);

        // Empresa 4 - Especialistes en llars
        Company::create([
            'name'    => 'Llar Neta',
            'email'   => 'servei@llarneta.cat',
            'password' => Hash::make('password'),
            'address' => 'Travessera de Gràcia, 123',
            'city'    => 'Barcelona',
            'state'   => 'Catalunya',
            'zip_code'=> '08006',
            'phone'   => '932345678',
            'is_admin' => true
        ]);

        // Empresa 5 - Especialistes en garatges
        Company::create([
            'name'    => 'GarageMasters',
            'email'   => 'garatges@garagemasters.com',
            'password' => Hash::make('password'),
            'address' => 'Carrer dels Tallers, 8',
            'city'    => 'Tarragona',
            'state'   => 'Catalunya',
            'zip_code'=> '43002',
            'phone'   => '977891234',
            'is_admin' => true
        ]);

        // Empresa 6 - Rentat de vehicles premium
        Company::create([
            'name'    => 'AutoShine',
            'email'   => 'contacte@autoshine.cat',
            'password' => Hash::make('password'),
            'address' => 'Avinguda Meridiana, 300',
            'city'    => 'Barcelona',
            'state'   => 'Catalunya',
            'zip_code'=> '08016',
            'phone'   => '934567890',
            'is_admin' => true
        ]);
    }
}
