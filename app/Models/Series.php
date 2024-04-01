<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Series extends Model
{
    use HasFactory;
    protected $fillable = [
        'name', 
        'quantity_of_series',
        'rating', 
        'quantity_of_seasons'
    ];

    public function actors()
    {
        return $this->belongsToMany(Actor::class, 'series_casts', 'id_series', 'id_actor');
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'series_categories', 'id_series', 'id_category');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
