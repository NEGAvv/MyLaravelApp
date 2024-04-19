<?php
namespace Database\Factories;

use App\Models\Actor;
use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Generator as Faker;

class ActorFactory extends Factory
{
    protected $model = Actor::class;
    protected $usedMaleImgUrls = [];
    protected $usedFemaleImgUrls = [];

    public function definition()
    {
        $faker = \Faker\Factory::create();

        // Generate a unique img_url
        $gender = $this->faker->randomElement(['male', 'female']);
        $imgUrl = $this->generateUniqueImgUrl($gender);
        

        return [
            'name' => $this->faker->name,
            'role' => $this->faker->firstName . ' ' . $this->faker->lastName,
            'biography' => $this->faker->realText(200),
            'birth_date' => $this->faker->date,
            'gender' => $gender,
            'nationality' => $this->faker->country,
            'img_url' => 'images/actors/' . $imgUrl . '.jpg'
        ];
    }

    // Function to generate a unique img_url based on gender
    protected function generateUniqueImgUrl($gender)
    {
        do {
            if ($gender === 'male') {
                $imgUrl = $this->faker->numberBetween(1, 30);
            } else {
                $imgUrl = $this->faker->numberBetween(52, 80);
            }
        } while ($this->isImgUrlUsed($gender, $imgUrl));

        // Add the used img_url to the appropriate list
        $this->markImgUrlAsUsed($gender, $imgUrl);

        return $imgUrl;
    }

    // Function to check if an img_url is already used based on gender
    protected function isImgUrlUsed($gender, $imgUrl)
    {
        if ($gender === 'male') {
            return in_array($imgUrl, $this->usedMaleImgUrls);
        } else {
            return in_array($imgUrl, $this->usedFemaleImgUrls);
        }
    }

    // Function to mark an img_url as used based on gender
    protected function markImgUrlAsUsed($gender, $imgUrl)
    {
        if ($gender === 'male') {
            $this->usedMaleImgUrls[] = $imgUrl;
        } else {
            $this->usedFemaleImgUrls[] = $imgUrl;
        }
    }
}

