<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Episode extends Model
{
    use HasFactory;

    protected $fillable = [
        'season_id',
        'title',
        'rating',
    ];

    public function seasons()
    {
        return $this->belongsTo(Season::class);
    }
}
