<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Actor extends Model
{
    use HasFactory;
    protected $fillable = [
        'name', 
        'role',
        'biography',
        'birth_date', 
        'gender', 
        'nationality',
        'img_url'
    ];

    public function series()
    {
        return $this->belongsToMany(Series::class, 'series_casts', 'id_actor', 'id_series');
    }
}
