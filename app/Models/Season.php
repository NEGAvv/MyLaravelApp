<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Season extends Model
{
    use HasFactory;

    protected $fillable = [
        't_v__series_id',
        'title', 
    ];

    public function tvSeries()
    {
        return $this->belongsTo(TV_Series::class);
    }
    
    public function episodes()
    {
        return $this->hasMany(Episode::class);
    }
}
