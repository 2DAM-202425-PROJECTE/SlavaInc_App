<?php


namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Faker\Factory as Faker;

class AppointmentSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('appointments')->insert([
            [
                'user_id' => 1,
                'company_id' => 1,
                'service_id' => 1,
                'company_service_id' => 1,
                'date' => Carbon::today()->addDays(1),
                'time' => '10:00:00',
                'price' => 50.00,
                'notes' => 'First appointment',
                'status' => 'pending',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => 1,
                'company_id' => 1,
                'service_id' => 2,
                'company_service_id' => 2,
                'date' => Carbon::today()->addDays(2),
                'time' => '14:00:00',
                'price' => 75.00,
                'notes' => 'Follow-up appointment',
                'status' => 'completed',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => 1,
                'company_id' => 2,
                'service_id' => 1,
                'company_service_id' => 3,
                'date' => Carbon::today()->addDays(3),
                'time' => '09:00:00',
                'price' => 45.00,
                'notes' => null,
                'status' => 'completed',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => 1,
                'company_id' => 2,
                'service_id' => 1,
                'company_service_id' => 3,
                'date' => Carbon::today()->addDays(3),
                'time' => '09:00:00',
                'price' => 45.00,
                'notes' => null,
                'status' => 'cancelled',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
