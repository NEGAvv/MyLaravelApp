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
        return [
            'name' => $this->faker->name,
            'birth_date' => $this->faker->date,
            'gender' => $this->faker->randomElement(['male', 'female']),
            'nationality' => $this->faker->country,
        ];
    }
}

