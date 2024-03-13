<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Episode;
use App\Models\Season;

class EpisodeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Seed data for episodes for each season
        Season::all()->each(function ($season) {
            // Define how many episodes you want to create for each season
            $numberOfEpisodes = rand(2, 20); // Random number between 2 and 20

            // Create episodes for the current season
            $season->episodes()->createMany(
                Episode::factory()->count($numberOfEpisodes)->raw()
            );
        });
    }
}
