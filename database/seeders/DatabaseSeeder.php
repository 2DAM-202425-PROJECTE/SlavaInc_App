<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /** Seed the application's database.*/
    public function run(): void
    {
        $this->call([
            PlanSeeder::class,
            LoginCompaniesSeeder::class,
            ServicesSeeder::class,
            WorkersSeeder::class,
            UserSeeder::class,
            AppointmentSeeder::class,
            AppointmentCompanyServiceSeeder::class,
            AdminsSeeder::class,
            ReviewSeeder::class,
            QuotesSeeder::class,
        ]);
    }
}
