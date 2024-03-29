<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Episode;
use App\Models\Season;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Episode>
 */
class EpisodeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Episode::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        // Get a random season ID
        $seasonId = Season::inRandomOrder()->first()->id;

        return [
            'season_id' => $seasonId,
            'title' => $this->faker->realText(20),
            'rating' => $this->faker->randomFloat(1, 0, 10), // Generate a random rating between 0 and 10 with one decimal place
        ];
    }
}
