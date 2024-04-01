<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        // $this->call(TVSeriesSeeder::class);
        // $this->call(SeasonSeeder::class);
        // $this->call(EpisodeSeeder::class);
        $this->call(UsersTableSeeder::class);
        $this->call(ActorsTableSeeder::class);
        $this->call(SeriesTableSeeder::class);
        $this->call(CategoriesTableSeeder::class);
        $this->call(CommentsTableSeeder::class);
        $this->call(SeriesCastTableSeeder::class);
        $this->call(SeriesCategoriesTableSeeder::class);
        
    }
}
