<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class SeriesCategory extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_series', 
        'id_category'
    ];
}
