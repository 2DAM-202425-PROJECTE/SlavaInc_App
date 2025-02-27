<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\User;
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
        $user1 = User::create([
            'name'  => 'Empresa Demo',
            'email' => 'empresa@demo.com',
            'password' => Hash::make('password'),
            'role' => 'company',
        ]);

        Company::create([
            'user_id' => $user1->id,
            'name'    => $user1->name,
            'address' => 'Carrer de l\'Empresa, 10',
            'city'    => 'Barcelona',
            'state'   => 'Catalunya',
            'zip_code'=> '08002',
            'phone'   => '123456789',
        ]);

        // Segona empresa
        $user2 = User::create([
            'name'  => 'Empresa Demo 2',
            'email' => 'empresa2@demo.com',
            'password' => Hash::make('password'),
            'role' => 'company',
        ]);

        Company::create([
            'user_id' => $user2->id,
            'name'    => $user2->name,
            'address' => 'Avinguda de l\'Empresa, 20',
            'city'    => 'València',
            'state'   => 'Comunitat Valenciana',
            'zip_code'=> '46001',
            'phone'   => '987654321',
        ]);
    }
}
