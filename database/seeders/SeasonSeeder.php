<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Season;
use App\Models\Episode;
use App\Models\TV_Series;


class SeasonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Define how many seasons want to create for each TV series
        $minSeasons = 1;
        $maxSeasons = 11;

        // Retrieve all TV series
        $tvSeries = TV_Series::all();

        // Seed data for seasons for each TV series
        foreach ($tvSeries as $series) {
            $numberOfSeasons = rand($minSeasons, $maxSeasons);

            // Create seasons for the current TV series
            $series->seasons()->createMany(
                Season::factory()->count($numberOfSeasons)->raw()
            );
        }
    }
}