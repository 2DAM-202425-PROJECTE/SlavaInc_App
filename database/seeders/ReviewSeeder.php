<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;
use Carbon\Carbon;

class ReviewSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        $appointments = DB::table('appointments')->get();

        if ($appointments->isEmpty()) {
            return;
        }

        foreach (range(1, 50) as $i) {
            $appointment = $appointments->random();

            if (
                !$appointment->user_id ||
                !$appointment->company_service_id ||
                !$appointment->id
            ) {
                continue;
            }

            DB::table('reviews')->insert([
                'client_id' => $appointment->user_id,
                'company_service_id' => $appointment->company_service_id,
                'appointment_id' => $appointment->id,
                'rate' => $faker->numberBetween(1, 5),
                'comment' => $faker->sentence(),
                'created_at' => Carbon::now()->subDays(rand(1, 180)),
                'updated_at' => Carbon::now(),
            ]);
        }

    }
}
