<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class QuotesSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('quotes')->insert([
            [
                'user_id' => 1, // Harvey Glover
                'company_id' => 1, // Neteja Express
                'service_id' => 1, // Assuming House Cleaning
                'description' => 'Quote for deep cleaning of a 2-bedroom apartment in Barcelona.',
                'preferred_date' => Carbon::create(2025, 5, 25), // May 25, 2025
                'preferred_time' => '10:00:00',
                'amount' => null, // Pending, so no amount yet
                'message' => 'Please confirm if eco-friendly products are used.',
                'status' => 'pending',
                'created_at' => Carbon::create(2025, 5, 19, 17, 35), // Current time: 05:35 PM CEST, May 19, 2025
                'updated_at' => Carbon::create(2025, 5, 19, 17, 35),
            ],
            [
                'user_id' => 1, // Harvey Glover
                'company_id' => 1, // Neteja Express
                'service_id' => 1, // Assuming House Cleaning
                'description' => 'Quote for carpet cleaning in a 3-bedroom house.',
                'preferred_date' => Carbon::create(2025, 5, 27),
                'preferred_time' => '14:00:00',
                'amount' => 175.50, // Quoted amount
                'message' => 'Can you provide an estimated duration?',
                'status' => 'quoted',
                'created_at' => Carbon::create(2025, 5, 18, 10, 0), // Yesterday
                'updated_at' => Carbon::create(2025, 5, 18, 10, 0),
            ],
            [
                'user_id' => 2, // Another user (e.g., from previous UsersTableSeeder, like Jane Smith)
                'company_id' => 1, // Neteja Express
                'service_id' => 1, // Assuming House Cleaning
                'description' => 'Quote for office cleaning for a small startup.',
                'preferred_date' => null,
                'preferred_time' => null,
                'amount' => 250.00,
                'message' => 'Quote accepted, please schedule.',
                'status' => 'accepted',
                'created_at' => Carbon::create(2025, 5, 17, 9, 0), // Two days ago
                'updated_at' => Carbon::create(2025, 5, 18, 12, 0),
            ],
            [
                'user_id' => 1, // Harvey Glover
                'company_id' => 1, // Neteja Express
                'service_id' => 1, // Assuming House Cleaning
                'description' => 'Quote for upholstery and carpet cleaning in a living room.',
                'preferred_date' => Carbon::create(2025, 5, 22),
                'preferred_time' => '11:30:00',
                'amount' => 100.00,
                'message' => 'Declined due to budget constraints.',
                'status' => 'accepted',
                'created_at' => Carbon::create(2025, 5, 16, 15, 0), // Three days ago
                'updated_at' => Carbon::create(2025, 5, 17, 15, 0),
            ],
            [
                'user_id' => 1, // Harvey Glover
                'company_id' => 1, // Neteja Express
                'service_id' => 1, // Assuming House Cleaning
                'description' => 'Quote for upholstery and carpet cleaning in a living room.',
                'preferred_date' => Carbon::create(2025, 5, 22),
                'preferred_time' => '11:30:00',
                'amount' => 100.00,
                'message' => 'Declined due to budget constraints.',
                'status' => 'declined',
                'created_at' => Carbon::create(2025, 5, 16, 15, 0), // Three days ago
                'updated_at' => Carbon::create(2025, 5, 17, 15, 0),
            ],
        ]);
    }
}
