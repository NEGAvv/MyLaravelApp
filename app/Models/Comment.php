<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Comment extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_user', 
        'id_series', 
        'comment',
        'date_of_creation'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function series()
    {
        return $this->belongsTo(Series::class, 'id_series');
    }
}
