<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\TV_Series;

class TVSeriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Manual seeding example
        TV_Series::create([
            'title' => 'Game of Thrones',
            'genre' => 'Fantasy',
            'description' => 'A story of power, betrayal, and dragons.',
            "rating" => '8',
            'release_year' =>'2011',
            'creator' =>'David Benioff and D. B. Weiss',
        ]);

        TV_Series::create([
            'title' => 'Breaking Bad',
            'genre' => 'Drama',
            'description' => 'A high school chemistry teacher turned methamphetamine manufacturer.',
            "rating" => '7',
            'release_year' =>'2008',
            'creator' =>'George Vincent Gilligan Jr.',
        ]);

        // Define how many episodes want to create
        $numberOfSeries = 10;


        TV_Series::factory()->count($numberOfSeries)->create();
    }
}
