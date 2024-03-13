<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TVSeriesController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return redirect()->route('tv-series.index');
});



// Define the route for listing TV series
Route::get('/tv-series', function () {
    return app(\App\Http\Controllers\TVSeriesController::class)->index();
})->name('tv-series.index');

// Define the route for displaying seasons of a TV series 
Route::get('/tv-series/{id}/seasons', function ($id) {
    return app(\App\Http\Controllers\TVSeriesController::class)->showSeasons($id);
})->name('tv-series.seasons');

// Define the route for displaying episodes of a TV series 
Route::get('/tv-series/{series_id}/seasons/{season_id}/episodes', function ($series_id, $season_id) {
    return app(TVSeriesController::class)->showEpisodes($series_id, $season_id);
})->name('tv-series.episodes');

// Route::get('/tv-series/{series_id}/seasons/{season_id}/episodes', [TVSeriesController::class, 'showEpisodes'])->name('tv-series.episodes');


