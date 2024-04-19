<?php

namespace App\Http\Controllers;
use App\Models\Series;
use Inertia\Inertia;
use Illuminate\Http\Request;

class SeriesController extends Controller
{
    public function index()
    {
        $series = Series::withCount('comments')->with('user')->paginate(10);

        return Inertia::render('Dashboard', ['series' => $series]);
    }

    public function show(Series $series)
    {
        //Fetch data 
        $userComments = $series->comments()->with('user')->get();
        $seriesImg = asset($series->img_url);
        // Fetch actor images
        $actorImages = [];
        foreach ($series->actors as $actor) {
            $actorImages[] = asset($actor->img_url);
        }

        // Count the number of comments for this series
        $numComments = $series->comments->count();

        // Load the categories and actors relationships
        $series->load('categories', 'actors');


        return inertia('SeriesShowDetails', [
            'series' => $series,
            'userComments' => $userComments,
            'numComments' => $numComments,
            'imageUrl' => $seriesImg,
            'actorImages' => $actorImages,
        ]);
    }
}
