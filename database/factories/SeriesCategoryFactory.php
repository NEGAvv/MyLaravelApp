<?php
namespace Database\Factories;

use App\Models\SeriesCategory;
use App\Models\Series;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Generator as Faker;

class SeriesCategoryFactory extends Factory
{
    protected $model = SeriesCategory::class;

    public function definition()
    {
        $series = Series::inRandomOrder()->first();

        $category = Category::inRandomOrder()->first();

        return [
            'id_series' => $series->id,
            'id_category' => $category->id,
        ];
    }
}
