<?php

use App\Http\Controllers\ActorController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Series;
use App\Http\Controllers\SeriesController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CommentController;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
}); 

Route::get('/dashboard', [SeriesController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/series/create-form', [SeriesController::class, 'createForm'])->name('series.createForm');
Route::post('/series', [SeriesController::class, 'store'])->name('series.store');
Route::get('/series/{series}/edit', [SeriesController::class, 'edit'])->name('series.edit');
Route::put('/series/{series}', [SeriesController::class, 'update'])->name('series.update');
Route::delete('/series/{series}', [SeriesController::class, 'destroy'])->name('series.destroy');
Route::get('/series/{series}', [SeriesController::class, 'show'])->name('series.show');

Route::get('/user/{user}', [UserController::class, 'show'])->name('user.show');

Route::get('/actors/create-form', [ActorController::class, 'createForm'])->name('actors.createForm');
Route::post('/actors', [ActorController::class, 'store'])->name('actors.store');
Route::get('/actors/{actor}/edit', [ActorController::class, 'edit'])->name('actors.edit');
Route::put('/actors/{actor}', [ActorController::class, 'update'])->name('actors.update');
Route::delete('/actors/{actor}', [ActorController::class, 'destroy'])->name('actors.destroy');
Route::get('/actors/{actor}', [ActorController::class, 'show'])->name('actors.show');


Route::post('/series/{seriesId}/comments', [CommentController::class, 'store'])->name('comments.store');
Route::put('/comments/{comment}', [CommentController::class, 'update'])->name('comments.update');
Route::delete('/comments/{comment}', [CommentController::class, 'destroy'])->name('comments.destroy');

require __DIR__.'/auth.php';
