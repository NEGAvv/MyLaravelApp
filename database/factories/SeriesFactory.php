<?php
namespace Database\Factories;

use App\Models\Series;
use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Generator as Faker;

class SeriesFactory extends Factory
{
    protected $model = Series::class;

    public function definition()
    {
        return [
            'name' => $this->faker->realText(30),
            'quantity_of_series' => $this->faker->numberBetween(1, 10),
            'rating' => $this->faker->randomFloat(1, 0, 10),
            'quantity_of_seasons' => $this->faker->numberBetween(1, 20),
        ];
    }
}
