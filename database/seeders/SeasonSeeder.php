<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Season;

class SeasonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Define how many seasons want to create
        $numberOfSeasons = 5;

        // Seed data for seasons
        // Season::factory($numberOfSeasons)->create();

        Season::factory()->count($numberOfSeasons)->create();
    }
}
