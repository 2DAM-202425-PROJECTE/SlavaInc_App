<?php

namespace Database\Seeders;

use App\Models\LoginCompany;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class LoginCompaniesSeeder extends Seeder
{
    public function run(): void
    {
        // Empresa 1 - Especialista en neteja domèstica i garatges
        $user1 = User::create([
            'name'  => 'Neteja Express',
            'email' => 'info@netegaexpress.com',
            'password' => Hash::make('password'),
            'role' => 'company',
        ]);

        LoginCompany::create([
            'user_id' => $user1->id,
            'name'    => $user1->name,
            'address' => 'Carrer dels Lladres, 42',
            'city'    => 'Barcelona',
            'state'   => 'Catalunya',
            'zip_code' => '08001',
            'phone'   => '933112233',
            'logo'    => ('logos/neteja_express.jpg'), // Logo existent
        ]);

        // Empresa 2 - Especialista en vehicles i piscines
        $user2 = User::create([
            'name'  => 'AquaClean',
            'email' => 'contacte@aquaclean.com',
            'password' => Hash::make('password'),
            'role' => 'company',
        ]);

        LoginCompany::create([
            'user_id' => $user2->id,
            'name'    => $user2->name,
            'address' => 'Avinguda del Mar, 15',
            'city'    => 'València',
            'state'   => 'Comunitat Valenciana',
            'zip_code' => '46002',
            'phone'   => '961234567',
            'logo'    => ('logos/aquaclean.jpg'), // Logo existent
        ]);

        // Empresa 3 - Empresa generalista
        $user3 = User::create([
            'name'  => 'Neteges Integral',
            'email' => 'info@netegesintegral.cat',
            'password' => Hash::make('password'),
            'role' => 'company',
        ]);

        LoginCompany::create([
            'user_id' => $user3->id,
            'name'    => $user3->name,
            'address' => 'Carrer Major, 77',
            'city'    => 'Lleida',
            'state'   => 'Catalunya',
            'zip_code' => '25002',
            'phone'   => '973451234',
            'logo'    => ('logos/neteges_integral.jpg'), // Logo existent
        ]);

        // Empresa 4 - Especialistes en llars
        $user4 = User::create([
            'name'  => 'Llar Neta',
            'email' => 'servei@llarneta.cat',
            'password' => Hash::make('password'),
            'role' => 'company',
        ]);

        LoginCompany::create([
            'user_id' => $user4->id,
            'name'    => $user4->name,
            'address' => 'Travessera de Gràcia, 123',
            'city'    => 'Barcelona',
            'state'   => 'Catalunya',
            'zip_code' => '08006',
            'phone'   => '932345678',
            'logo'    => ('logos/llar_net.jpg'), // Logo existent
        ]);

        // Empresa 5 - Especialistes en garatges
        $user5 = User::create([
            'name'  => 'GarageMasters',
            'email' => 'garatges@garagemasters.com',
            'password' => Hash::make('password'),
            'role' => 'company',
        ]);

        LoginCompany::create([
            'user_id' => $user5->id,
            'name'    => $user5->name,
            'address' => 'Carrer dels Tallers, 8',
            'city'    => 'Tarragona',
            'state'   => 'Catalunya',
            'zip_code' => '43002',
            'phone'   => '977891234',
            'logo'    => ('logos/garagemasters.jpg'), // Logo existent
        ]);

        // Empresa 6 - Rentat de vehicles premium
        $user6 = User::create([
            'name'  => 'AutoShine',
            'email' => 'contacte@autoshine.cat',
            'password' => Hash::make('password'),
            'role' => 'company',
        ]);

        LoginCompany::create([
            'user_id' => $user6->id,
            'name'    => $user6->name,
            'address' => 'Avinguda Meridiana, 300',
            'city'    => 'Barcelona',
            'state'   => 'Catalunya',
            'zip_code' => '08016',
            'phone'   => '934567890',
            'logo'    => ('logos/autoshine.jpg'), // Logo existent
        ]);

        // Empresa 7 - Especialista en serveis diversos
        $user7 = User::create([
            'name'  => 'Serveis Diversos SL',
            'email' => 'info@diversos.com',
            'password' => Hash::make('password'),
            'role' => 'company',
        ]);

        LoginCompany::create([
            'user_id' => $user7->id,
            'name'    => $user7->name,
            'address' => 'Carrer Versàtil, 77',
            'city'    => 'Tarragona',
            'state'   => 'Catalunya',
            'zip_code' => '43003',
            'phone'   => '977445566',
            'logo'    => 'logos/autoshine.jpg',
        ]);
    }
}
