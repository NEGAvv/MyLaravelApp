<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

class CategoryFactory extends Factory
{
    protected $model = Category::class;

    public function definition()
    {
        $categories = [
            'Action', 
            'Adventure', 
            'Animation', 
            'Biography', 
            'Comedy', 
            'Cooking', 
            'Crime', 
            'Documentary', 
            'Drama', 
            'Educational', 
            'Family', 
            'Fantasy', 
            'History', 
            'Horror', 
            'Legal', 
            'Music', 
            'Musical', 
            'Mystery', 
            'Nature', 
            'Political', 
            'Reality-TV', 
            'Romance', 
            'Sci-Fi', 
            'Sport', 
            'Supernatural', 
            'Thriller', 
            'Travel', 
            'War', 
            'Western',
        ];

        $category = $this->faker->randomElement($categories);

        return [
            'name' => $category,
        ];
    }
}
