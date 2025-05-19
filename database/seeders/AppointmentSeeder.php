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
        $faker = Faker::create();

        $companyServices = DB::table('companies_services')->get();
        $clients = DB::table('users')->pluck('id')->toArray();

        if ($companyServices->isEmpty() || empty($clients)) {
            $this->command->warn('❌ No hi ha serveis d’empresa o clients per generar cites.');
            return;
        }

        foreach (range(1, 50) as $i) {
            $cs = $companyServices->random();

            DB::table('appointments')->insert([
                'user_id' => $faker->randomElement($clients),
                'company_id' => $cs->company_id,
                'service_id' => $cs->service_id,
                'company_service_id' => $cs->id,
                'status' => $faker->randomElement(['pending', 'confirmed', 'completed']),
                'date' => Carbon::now()->addDays(rand(1, 30)),
                'time' => $faker->time(),
                'price' => $faker->randomFloat(2, 30, 150),
                'notes' => $faker->sentence(),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $this->command->info('✅ Cites creades amb company_service_id assignat.');
    }
}
