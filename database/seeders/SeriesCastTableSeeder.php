<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\SeriesCast;
class SeriesCastTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        SeriesCast::factory()->count(50)->create();
    }
}
