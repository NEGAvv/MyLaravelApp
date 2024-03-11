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



// Define the route for listing TV series with a closure function
Route::get('/tv-series', function () {
    return app(\App\Http\Controllers\TVSeriesController::class)->index();
})->name('tv-series.index');

// Define the route for displaying episodes of a TV series with a closure function
Route::get('/tv-series/{id}/episodes', function ($id) {
    return app(\App\Http\Controllers\TVSeriesController::class)->episodes($id);
})->name('tv-series.episodes');
