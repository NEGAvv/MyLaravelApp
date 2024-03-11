<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\TV_Series;

class TVSeriesController extends Controller
{
    public function index()
    {
        $tvSeries = TV_Series::all();

        return view('index', ['tvSeries' => $tvSeries]);
    }

    public function episodes($id)
    {
        $tvSeries = TV_Series::findOrFail($id);
        $episodes = $tvSeries->episodes()->paginate(10); // Assuming you want to paginate episodes

        return view('episodes', compact('tvSeries', 'episodes'));
    }
}
