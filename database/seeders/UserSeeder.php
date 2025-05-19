<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'name' => 'Harvey Glover',
                'email' => 'harvey@gmail.com',
                'email_verified_at' => Carbon::now(),
                'password' => Hash::make('123'),
                'city' => 'Barcelona',
                'address' => '123',
                'remember_token' => null,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Steven Romero',
                'email' => 'steven@gmail.com',
                'email_verified_at' => Carbon::now(),
                'password' => Hash::make('123'),
                'city' => 'Lleida',
                'address' => '123',
                'remember_token' => null,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
