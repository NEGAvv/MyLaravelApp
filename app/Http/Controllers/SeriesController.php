<?php

namespace App\Http\Controllers;
use App\Models\Series;
use App\Models\Category;
use App\Models\Actor;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
class SeriesController extends Controller
{
    public function index(Request $request)
    {
        $series = Series::withCount('comments')->with('user')->get();

        // Define the maximum number of items per page
        $perPage = 10;
        $totalSeriesCount = Series::count();

        // Calculate the maximum number of pages based on the total number of series and items per page
        $maxPages = ceil($totalSeriesCount / $perPage);

        // Get the requested page number from the query parameters, default to 1 if not provided or invalid
        $requestedPage = $request->query('page', 1);

        // Ensure the requested page is within the valid range
        if ($requestedPage < 1 || $requestedPage > $maxPages) {
            return Redirect::to(route('dashboard'));
        }

        // Retrieve the paginated series data for the requested page
        $seriesPaginated = Series::withCount('comments')->with('user')->paginate($perPage, ['*'], 'page', $requestedPage);

        return Inertia::render('Dashboard', [
            'seriesPaginated' => $seriesPaginated,
            'series' => $series,
        ]);
    }

    public function show(Series $series)
    {
            // Check if the series ID is valid
        if (!$series) {
            // Handle the case where the series is not found
            abort(404);
        }
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
 
    public function createForm()
    {
        return Inertia::render('SeriesCreate');
    }

    public function store(Request $request)
    {
        // Validate request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:500',
            'quantity_of_series' => 'required|integer',
            'rating' => 'required|numeric',
            'quantity_of_seasons' => 'required|integer',
            'date_of_creation' => 'required|date',
            'img_url' => 'required|url',
        ]);

        // Associate the logged-in user with the created series
        $validatedData['id_user'] = Auth::id();

        // Create a new series
        $series = Series::create($validatedData);

        // Redirect or return a response
        return redirect()->route('series.show', ['series' => $series->id])->with('success', 'Series created successfully!');
    }

    public function edit(Series $series)
    {
        // Check if the current user is the creator of the series, or an admin
        $isCreatorOrAdmin = ($series->id_user === Auth::id()) || (Auth::user()->isAdmin);

        // If the user is neither the creator nor an admin, redirect them
        if (!$isCreatorOrAdmin) {
            return Redirect::route('dashboard')->with('error', 'You are not authorized to edit this series.');
        }

        // Fetch all categories
        $allCategories = Category::all();
        $allActors = Actor::all();

        // Fetch categories associated with this series
        $seriesCategories = $series->categories;
        $seriesActors = $series->actors;

        return inertia('SeriesEdit', [
            'series' => $series,
            'allCategories' => $allCategories,
            'seriesCategories' => $seriesCategories,
            'allActors' => $allActors,
            'seriesActors'=> $seriesActors,
        ]);
    }

    public function update(Request $request, Series $series)
    {
        // Check if the current user is the creator of the series, or an admin
        $isCreatorOrAdmin = ($series->id_user === Auth::id()) || (Auth::user()->isAdmin);
    
        // If the user is neither the creator nor an admin, redirect them
        if (!$isCreatorOrAdmin) {
            return Redirect::route('dashboard')->with('error', 'You are not authorized to update this series.');
        }
    
        // Validate the request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:500',
            'quantity_of_series' => 'required|integer',
            'rating' => 'required|numeric',
            'quantity_of_seasons' => 'required|integer',
            'date_of_creation' => 'required|date',
            'img_url' => 'required|url',
            'categories' => 'nullable|array', 
            'actors' => 'nullable|array',
        ]);
    
        // Update the series with the validated data
        $series->update($validatedData);
        
        
        // Update categories associated with the series
        if (isset($validatedData['categories'])) {
            // Sync categories by their IDs
            $series->categories()->sync($validatedData['categories']);
        } else {
            // If no categories are provided, detach all existing categories
            $series->categories()->detach();
        }

        if (isset($validatedData['actors'])) {
            $actorsIds = array_column($validatedData['actors'], 'value');
            $series->actors()->sync($actorsIds);
        } else {
            $series->actors()->detach();
        }
    
        // Redirect the user back or return a response indicating success
        return Redirect::route('series.show', ['series' => $series->id])->with('success', 'Series updated successfully!');
    }
    

    public function destroy(Request $request,Series $series)
    {
        // Check if the user is authenticated
        if (!$request->user()) {
            return response()->json(['error' => 'Unauthenticated'], 401);
        }
        // Ensure the authenticated user can delete the comment
        if ($request->user()->isAdmin || $series->id_user === $request->user()->id) {
            $series->delete();
            return Redirect::back()->with('success', 'Comment deleted successfully');
        }

        // If the user is not authorized, return a 403 Forbidden response
        return response()->json(['error' => 'Unauthorized action.'], 403);
    }
}
