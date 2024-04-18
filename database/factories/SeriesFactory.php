<?php
namespace Database\Factories;

use App\Models\Series;
use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Generator as Faker;
use App\Models\User;

class SeriesFactory extends Factory
{
    protected $model = Series::class;

    public function definition()
{
    $user = User::inRandomOrder()->first() ?? User::factory()->create();
    $quantityOfSeasons = $this->faker->numberBetween(1, 10);
    
    // Ensure quantity_of_series is a multiple of quantity_of_seasons within a certain range
    $minSeriesMultiplier = 4; 
    $maxSeriesMultiplier = 11; 
    $seriesMultiplier = $this->faker->numberBetween($minSeriesMultiplier, $maxSeriesMultiplier);
    $quantityOfSeries = $quantityOfSeasons * $seriesMultiplier;

    return [
        'id_user' => $user->id,
        'name' => $this->faker->realText(30),
        'description' => $this->faker->realText(
            $this->faker->numberBetween(160, 300), // min and max number of characters
            $this->faker->numberBetween(1, 2)     // index size
        ),
        'quantity_of_series' => $quantityOfSeries,
        'rating' => $this->faker->randomFloat(1, 0, 10),
        'quantity_of_seasons' => $quantityOfSeasons,
    ];
}


}
