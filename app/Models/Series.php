<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Series extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_user',
        'name', 
        'description',
        'quantity_of_series',
        'rating', 
        'quantity_of_seasons',
        'date_of_creation',
        'img_url'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }
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
        return $this->hasMany(Comment::class, 'id_series');
    }
}
