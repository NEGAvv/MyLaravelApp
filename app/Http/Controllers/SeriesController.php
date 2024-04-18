<?php

namespace App\Http\Controllers;
use App\Models\Series;
use Inertia\Inertia;
use Illuminate\Http\Request;

class SeriesController extends Controller
{
    public function index()
    {
        $series = Series::with('user')->get();
        return Inertia::render('Dashboard', ['series' => $series]);
    }

    public function show(Series $series)
    {
    //Fetch data 
    $userComments = $series->comments()->with('user')->get();
     
    // Count the number of comments for this series
    $numComments = $series->comments->count();

    return inertia('PostShowDetails', [
        'series' => $series,
        'userComments' => $userComments,
        'numComments' => $numComments,
    ]);
    }
}
