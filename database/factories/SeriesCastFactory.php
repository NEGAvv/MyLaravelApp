<?php
namespace Database\Factories;

use App\Models\SeriesCast;
use App\Models\Series;
use App\Models\Actor;
use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Generator as Faker;

class SeriesCastFactory extends Factory
{
    protected $model = SeriesCast::class;

    public function definition()
    {
        $series = Series::inRandomOrder()->first();

        $actor = Actor::inRandomOrder()->first();

        return [
            'id_series' => $series->id,
            'id_actor' => $actor->id,
        ];
    }
}
