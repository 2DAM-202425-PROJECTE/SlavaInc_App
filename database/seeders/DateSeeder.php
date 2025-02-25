<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DateSeeder extends Seeder
{
    public function run()
    {
        $dates = [
            [
                'user_id' => 1,
                'service_id' => 1,
                'date' => Carbon::now()->addDays(1)->toDateString(),
            ],
            [
                'user_id' => 1,
                'service_id' => 2,
                'date' => Carbon::now()->addDays(1)->toDateString(),
            ],
            [
                'user_id' => 1,
                'service_id' => 3,
                'date' => Carbon::now()->addDays(3)->toDateString(),
            ],
            [
                'user_id' => 4,
                'service_id' => 4,
                'date' => Carbon::now()->addDays(4)->toDateString(),
            ],
        ];

        DB::table('dates')->insert($dates);
    }
}
