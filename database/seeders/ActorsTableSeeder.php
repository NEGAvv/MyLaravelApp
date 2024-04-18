<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Actor;

class ActorsTableSeeder extends Seeder
{
    public function run()
    {
        Actor::factory()->count(40)->create();
    }
}
