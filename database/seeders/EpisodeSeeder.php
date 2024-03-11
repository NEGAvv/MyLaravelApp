<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Episode;
use App\Models\TV_Series;

class EpisodeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //   // Retrieve TV series to associate episodes with
        //   $tvSeries = TV_Series::all();

        //   // Loop through each TV series and create episodes
        //   $tvSeries->each(function ($series) {
        //       // Create 5 episodes for each TV series
        //       Episode::factory(5)->create(['t_v__series_id' => $series->id]);
        //   });
    }
}
