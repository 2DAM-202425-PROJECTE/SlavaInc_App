<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\Plan;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class LoginCompaniesSeeder extends Seeder
{
    public function run(): void
    {
        $basicPlanId = Plan::where('name', 'Bàsic')->first()?->id;

        Company::create([
            'name'          => 'Neteja Express',
            'email'         => 'info@netegaexpress.com',
            'password'      => Hash::make('123'),
            'address'       => 'Carrer dels Lladres, 42',
            'city'          => 'Barcelona',
            'state'         => 'Catalunya',
            'zip_code'      => '08001',
            'phone'         => '933112233',
            'website'       => 'https://netegaexpress.com',
            'logo'          => 'https://img.freepik.com/premium-vector/cleaning-icon-logo-vector-design-template_827767-1504.jpg',
            'description'   => 'Experts en neteja ràpida i eficient per a oficines i locals.',
            'founded_year'  => 2015,
            'vat_number'    => 'B12345678',
            'company_type'  => 'SL',
            'is_verified'   => true,
            'is_active'     => true,
            'latitude'      => 41.3851,
            'longitude'     => 2.1734,
            'notes'         => 'Client amb gran creixement i molt bona reputació.',
            'plan_id'       => $basicPlanId,
        ]);

        Company::create([
            'name'          => 'AquaClean',
            'email'         => 'contacte@aquaclean.com',
            'password'      => Hash::make('password'),
            'address'       => 'Avinguda del Mar, 15',
            'city'          => 'València',
            'state'         => 'Comunitat Valenciana',
            'zip_code'      => '46002',
            'phone'         => '961234567',
            'website'       => 'https://aquaclean.com',
            'logo'          => 'https://images.unsplash.com/photo-1590650046871-bb234f49dca5?auto=format&fit=crop&w=150&q=80',
            'description'   => 'Solucions de neteja ecològica per a espais marítims i humits.',
            'founded_year'  => 2012,
            'vat_number'    => 'B87654321',
            'company_type'  => 'SA',
            'is_verified'   => true,
            'is_active'     => true,
            'latitude'      => 39.4699,
            'longitude'     => -0.3763,
            'notes'         => 'Especialistes en neteja sostenible.',
            'plan_id'       => $basicPlanId,

        ]);

        Company::create([
            'name'          => 'Neteges Integral',
            'email'         => 'info@netegesintegral.cat',
            'password'      => Hash::make('password'),
            'address'       => 'Carrer Major, 77',
            'city'          => 'Lleida',
            'state'         => 'Catalunya',
            'zip_code'      => '25002',
            'phone'         => '973451234',
            'website'       => 'https://netegesintegral.cat',
            'logo'          => 'https://images.unsplash.com/photo-1607082349513-57e6c7e44a37?auto=format&fit=crop&w=150&q=80',
            'description'   => 'Neteja industrial i manteniment de grans superfícies.',
            'founded_year'  => 2010,
            'vat_number'    => 'B11223344',
            'company_type'  => 'SL',
            'is_verified'   => false,
            'is_active'     => true,
            'latitude'      => 41.6176,
            'longitude'     => 0.6200,
            'notes'         => null,
            'plan_id'       => $basicPlanId,

        ]);

        Company::create([
            'name'          => 'Llar Neta',
            'email'         => 'servei@llarneta.cat',
            'password'      => Hash::make('password'),
            'address'       => 'Travessera de Gràcia, 123',
            'city'          => 'Barcelona',
            'state'         => 'Catalunya',
            'zip_code'      => '08006',
            'phone'         => '932345678',
            'website'       => 'https://llarneta.cat',
            'logo'          => 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=150&q=80',
            'description'   => 'Especialitzats en neteja de domicilis particulars.',
            'founded_year'  => 2018,
            'vat_number'    => 'B33445566',
            'company_type'  => 'Autònom',
            'is_verified'   => true,
            'is_active'     => true,
            'latitude'      => 41.4036,
            'longitude'     => 2.1526,
            'notes'         => 'Ofereixen servei nocturn i caps de setmana.',
            'plan_id'       => $basicPlanId,

        ]);

        Company::create([
            'name'          => 'GarageMasters',
            'email'         => 'garatges@garagemasters.com',
            'password'      => Hash::make('password'),
            'address'       => 'Carrer dels Tallers, 8',
            'city'          => 'Tarragona',
            'state'         => 'Catalunya',
            'zip_code'      => '43002',
            'phone'         => '977891234',
            'website'       => 'https://garagemasters.com',
            'logo'          => 'https://images.unsplash.com/photo-1612831662124-e9523d05e6e4?auto=format&fit=crop&w=150&q=80',
            'description'   => 'Experts en neteja de garatges i zones subterrànies.',
            'founded_year'  => 2005,
            'vat_number'    => 'B55667788',
            'company_type'  => 'SL',
            'is_verified'   => false,
            'is_active'     => true,
            'latitude'      => 41.1189,
            'longitude'     => 1.2445,
            'notes'         => 'S’especialitzen en comunitats de veïns.',
            'plan_id'       => $basicPlanId,

        ]);

        Company::create([
            'name'          => 'AutoShine',
            'email'         => 'contacte@autoshine.cat',
            'password'      => Hash::make('password'),
            'address'       => 'Avinguda Meridiana, 300',
            'city'          => 'Barcelona',
            'state'         => 'Catalunya',
            'zip_code'      => '08016',
            'phone'         => '934567890',
            'website'       => 'https://autoshine.cat',
            'logo'          => 'https://images.unsplash.com/photo-1573164574394-d2eabedb04b4?auto=format&fit=crop&w=150&q=80',
            'description'   => 'Neteja especialitzada per a vehicles i tallers mecànics.',
            'founded_year'  => 2020,
            'vat_number'    => 'B99887766',
            'company_type'  => 'Autònom',
            'is_verified'   => true,
            'is_active'     => true,
            'latitude'      => 41.4380,
            'longitude'     => 2.1896,
            'notes'         => 'Clients habituals de grans tallers.',
            'plan_id'       => $basicPlanId,

        ]);
    }
}
