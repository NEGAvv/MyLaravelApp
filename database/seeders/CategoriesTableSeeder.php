<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;
class CategoriesTableSeeder extends Seeder
{
    public function run()
    {
        Category::factory(30)->create();
    }
}
