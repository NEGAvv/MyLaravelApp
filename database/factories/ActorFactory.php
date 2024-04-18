<?php
namespace Database\Factories;

use App\Models\Actor;
use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Generator as Faker;

class ActorFactory extends Factory
{
    protected $model = Actor::class;

    public function definition()
    {
        $faker = \Faker\Factory::create();
        // Custom function to generate a biography-like text
        $biography = function() use ($faker) {
            $sentences = $faker->sentences(3); 
            return implode(' ', $sentences);
        };
        return [
            'name' => $this->faker->name,
            'role' => $this->faker->firstName . ' ' . $this->faker->lastName,
            'biography' => $biography(),
            'birth_date' => $this->faker->date,
            'gender' => $this->faker->randomElement(['male', 'female']),
            'nationality' => $this->faker->country,
        ];
    }
}

