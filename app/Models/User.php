<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class User extends Model
{
    use HasFactory;
    protected $fillable = [
        'username',
        'email', 
        'password', 
        'is_admin'
    ];

    protected $hidden = ['password'];

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
