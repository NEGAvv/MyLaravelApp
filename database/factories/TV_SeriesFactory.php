<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\TV_Series;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TV_Series>
 */
class TV_SeriesFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = TV_Series::class; // Corrected namespace reference

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->realText(50),
            'genre' => $this->faker->randomElement(['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Thriller']),
            'description' => $this->faker->realText(),
            'rating' => $this->faker->numberBetween(1, 10),
            'release_year' => $this->faker->numberBetween(1980, 2022), 
            'creator' => $this->faker->name, 
        ];
    }
}
