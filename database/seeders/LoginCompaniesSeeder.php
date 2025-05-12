<?php
namespace Database\Seeders;

use App\Models\Company;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class LoginCompaniesSeeder extends Seeder
{
    public function run(): void
    {
        Company::create([
            'name'    => 'Neteja Express',
            'email'   => 'info@netegaexpress.com',
            'password'=> Hash::make('password'),
            'address' => 'Carrer dels Lladres, 42',
            'city'    => 'Barcelona',
            'state'   => 'Catalunya',
            'zip_code'=> '08001',
            'phone'   => '933112233',
            'logo'    => 'https://images.unsplash.com/photo-1581090700227-1e8e07db9b9c?auto=format&fit=crop&w=150&q=80',
        ]);

        Company::create([
            'name'    => 'AquaClean',
            'email'   => 'contacte@aquaclean.com',
            'password'=> Hash::make('password'),
            'address' => 'Avinguda del Mar, 15',
            'city'    => 'València',
            'state'   => 'Comunitat Valenciana',
            'zip_code'=> '46002',
            'phone'   => '961234567',
            'logo'    => 'https://images.unsplash.com/photo-1590650046871-bb234f49dca5?auto=format&fit=crop&w=150&q=80',
        ]);

        Company::create([
            'name'    => 'Neteges Integral',
            'email'   => 'info@netegesintegral.cat',
            'password'=> Hash::make('password'),
            'address' => 'Carrer Major, 77',
            'city'    => 'Lleida',
            'state'   => 'Catalunya',
            'zip_code'=> '25002',
            'phone'   => '973451234',
            'logo'    => 'https://images.unsplash.com/photo-1607082349513-57e6c7e44a37?auto=format&fit=crop&w=150&q=80',
        ]);

        Company::create([
            'name'    => 'Llar Neta',
            'email'   => 'servei@llarneta.cat',
            'password'=> Hash::make('password'),
            'address' => 'Travessera de Gràcia, 123',
            'city'    => 'Barcelona',
            'state'   => 'Catalunya',
            'zip_code'=> '08006',
            'phone'   => '932345678',
            'logo'    => 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=150&q=80',
        ]);

        Company::create([
            'name'    => 'GarageMasters',
            'email'   => 'garatges@garagemasters.com',
            'password'=> Hash::make('password'),
            'address' => 'Carrer dels Tallers, 8',
            'city'    => 'Tarragona',
            'state'   => 'Catalunya',
            'zip_code'=> '43002',
            'phone'   => '977891234',
            'logo'    => 'https://images.unsplash.com/photo-1612831662124-e9523d05e6e4?auto=format&fit=crop&w=150&q=80',
        ]);

        Company::create([
            'name'    => 'AutoShine',
            'email'   => 'contacte@autoshine.cat',
            'password'=> Hash::make('password'),
            'address' => 'Avinguda Meridiana, 300',
            'city'    => 'Barcelona',
            'state'   => 'Catalunya',
            'zip_code'=> '08016',
            'phone'   => '934567890',
            'logo'    => 'https://images.unsplash.com/photo-1573164574394-d2eabedb04b4?auto=format&fit=crop&w=150&q=80',
        ]);
    }
}
