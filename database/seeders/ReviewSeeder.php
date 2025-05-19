<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;
use Carbon\Carbon;

class ReviewSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('reviews')->insert([
            [
                'client_id' => 1,
                'company_service_id' => 1,
                'appointment_id' => 1,
                'rate' => 4.5,
                'comment' => 'Great service, very professional!',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'client_id' => 2,
                'company_service_id' => 2,
                'appointment_id' => 2,
                'rate' => 3.8,
                'comment' => 'Good experience, but a bit rushed.',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'client_id' => 1,
                'company_service_id' => 3,
                'appointment_id' => 3,
                'rate' => 5.0,
                'comment' => 'Excellent, will come back!',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
