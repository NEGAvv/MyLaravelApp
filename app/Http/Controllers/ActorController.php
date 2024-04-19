<?php
namespace App\Http\Controllers;

use App\Models\Actor;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Series;
use App\Models\Comment;

class ActorController extends Controller
{
    public function show(Actor $actor)
    {
        $actor->load('series');
        $actorImg = asset($actor->img_url);

        return inertia('ActorShowDetails', [
            'actor' => $actor,
            'actorImg'=> $actorImg
        ]);
    }
}
