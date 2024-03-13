<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\TV_Series;
use App\Models\Season;
use App\Models\Episode;

class TVSeriesController extends Controller
{
    public function index()
    {
        $tvSeries = TV_Series::all();

        return view('index', ['tvSeries' => $tvSeries]);
    }

    public function showSeasons($id)
    {
        $tvSeries = TV_Series::findOrFail($id);

        return view('seasons', ['tvSeries' => $tvSeries]);
    }

    public function showEpisodes($series_id, $season_id)
{
    $season = Season::findOrFail($season_id);
    $episodes = $season->episodes;

    return view('tv_series_info', ['tvSeries' => $season->tvSeries, 'episodes' => $episodes]);
}

}
