<?php
namespace App\Http\Controllers;

use App\Models\Actor;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Auth;

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

    public function createForm()
    {
        return Inertia::render('ActorCreate');
    }

    public function store(Request $request)
    {
        // Validate request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'biography' => 'required|string',
            'birth_date' => 'required|date',
            'gender' => 'required|string|in:Male,Female',
            'nationality' => 'required|string|max:255',
            'img_url' => 'nullable|url',
        ]);

        // Create a new series
        $actor = Actor::create($validatedData);

        // Redirect or return a response
        return redirect()->route('actors.show', ['actor' => $actor->id])->with('success', 'Actor created successfully!');
    }

    public function edit(Actor $actor)
    {
        // Check if the current user is the creator of the series, or an admin
        $isAdmin = (Auth::user()->isAdmin);

        // If the user is neither the creator nor an admin, redirect them
        if (!$isAdmin) {
            return Redirect::route('dashboard')->with('error', 'You are not authorized to edit this series.');
        }

        $actor->load('series');
        return inertia('ActorEdit', [
            'actor' => $actor,
        ]);
    }

    public function update(Request $request, Actor $actor)
    {
        
        // Check if the current user is the creator of the series, or an admin
        $isAdmin = (Auth::user()->isAdmin);

        // If the user is neither the creator nor an admin, redirect them
        if (!$isAdmin) {
            return Redirect::route('dashboard')->with('error', 'You are not authorized to edit this series.');
        }

        $validatedData = $request->validate([
            'name' => 'required|string',
            'role' => 'required|string',
            'biography' => 'required|string',
            'birth_date' => 'required|date',
            'gender' => 'required|string',
            'nationality' => 'required|string',
            'img_url' => 'required|string',
            'id_series' => 'array',
        ]);

        $actor->update($validatedData);

        $actor->series()->sync($validatedData['id_series']);

        return Redirect::route('actors.show', ['actor' => $actor->id])->with('success', 'Actor updated successfully!');
    }

    public function destroy(Request $request, Actor $actor)
    {
        // Check if the user is authenticated
        if (!$request->user()) {
            return response()->json(['error' => 'Unauthenticated'], 401);
        }

        // Ensure the authenticated user can delete the actor
        if ($request->user()->isAdmin) {
            $actor->delete();
            return Redirect::route('dashboard')->with(['success', 'Actor deleted successfully']);
        }

        // If the user is not authorized, return a 403 Forbidden response
        return response()->json(['error' => 'Unauthorized action.'], 403);
    }
}
