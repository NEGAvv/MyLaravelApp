<?php
namespace App\Http\Controllers;

use App\Models\Actor;
use Illuminate\Http\Request;


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
