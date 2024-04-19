<?php

namespace Database\Factories;

use App\Models\Series;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

class SeriesFactory extends Factory
{
    protected $model = Series::class;
    protected $usedImgUrls = [];

    public function definition()
    {
        $user = User::inRandomOrder()->first() ?? User::factory()->create();
        $quantityOfSeasons = $this->faker->numberBetween(1, 10);
        
        // Ensure quantity_of_series is a multiple of quantity_of_seasons within a certain range
        $minSeriesMultiplier = 4; 
        $maxSeriesMultiplier = 11; 
        $seriesMultiplier = $this->faker->numberBetween($minSeriesMultiplier, $maxSeriesMultiplier);
        $quantityOfSeries = $quantityOfSeasons * $seriesMultiplier;

        // Generate a unique img_url
        $imgUrl = $this->generateUniqueImgUrl();

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
            'date_of_creation' => $this->faker->dateTimeBetween('-2 years', 'now')->format('Y-m-d'),
            'img_url' => 'images/posters/' . $imgUrl . '.jpg'
        ];
    }

    // Function to generate a unique img_url
    protected function generateUniqueImgUrl()
    {
        do {
            $imgUrl = $this->faker->numberBetween(1, 51);
        } while (in_array($imgUrl, $this->usedImgUrls));

        // Add the used img_url to the list
        $this->usedImgUrls[] = $imgUrl;

        return $imgUrl;
    }
}
