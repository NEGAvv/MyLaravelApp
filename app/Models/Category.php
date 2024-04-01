<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Category extends Model
{
    use HasFactory;
    protected $fillable = [
        'name'
    ];

    public function series()
    {
        return $this->belongsToMany(Series::class, 'series_categories', 'id_category', 'id_series');
    }
}
