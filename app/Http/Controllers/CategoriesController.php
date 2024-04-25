<?php

namespace App\Http\Controllers;
use App\Models\Series;
use App\Models\Category;
use App\Models\SeriesCategory;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
class CategoriesController extends Controller
{
   
public function store(Request $request)
    {
        $request->validate([
            'category' => 'required|string|max:255'
        ]);
    
        // Create the category
        $category = Category::create([
            'name' => $request->category
        ]);
    
        // Associate the category with the current series
        $series->categories()->attach($category->id);
    
        // Redirect or return a response
        return redirect()->route('series.show', ['series' => $series->id])->with('success', 'Series created successfully!');
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
