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
        ]);

        TV_Series::create([
            'title' => 'Breaking Bad',
            'genre' => 'Drama',
            'description' => 'A high school chemistry teacher turned methamphetamine manufacturer.',
        ]);

        TV_Series::factory(10)->create();

    }
}
