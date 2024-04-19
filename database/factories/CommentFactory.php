<?php
namespace Database\Factories;

use App\Models\Comment;
use App\Models\User;
use App\Models\Series;
use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Generator as Faker;

class CommentFactory extends Factory
{
    protected $model = Comment::class;

    public function definition()
    {
        $users = User::all();
        $user = $users->random();
        $series = Series::inRandomOrder()->first();

        // Determine the creation date of the comment, ensuring it's after the series creation date
        $seriesCreationDate = $series->date_of_creation;
        $currentDate = now();
        $creationDate = $this->faker->dateTimeBetween($seriesCreationDate, $currentDate)->format('Y-m-d');

        return [
            'id_user' => $user->id,
            'id_series' => $series->id,
            'comment' => $this->faker->realText(200),
            'date_of_creation' => $creationDate,
        ];
    }
}


