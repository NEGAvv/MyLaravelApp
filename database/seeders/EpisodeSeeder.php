<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Episode;

class EpisodeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Define how many episodes want to create
        $numberOfEpisodes = 10;

        Episode::factory()->count($numberOfEpisodes)->create();

    }
}
