<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TV_Series extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'genre',
        'description',
        'rating',
        'release_year',
        'creator'
    ];


    public function seasons()
    {
        return $this->hasMany(Season::class);
    }

}
