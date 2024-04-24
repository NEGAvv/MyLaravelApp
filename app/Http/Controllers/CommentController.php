<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;
use Illuminate\Support\Facades\Redirect;

class CommentController extends Controller
{
    public function store(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'series_id' => 'required|exists:series,id',
            'comment' => 'required|string',
        ]);

        // Get the authenticated user ID, if available
        $userId = auth()->id();

        // Create the comment
        $comment = Comment::create([
            'id_series' => $validatedData['series_id'],
            'comment' => $validatedData['comment'],
            'date_of_creation' => now(), // Or any other way you want to handle date
            'id_user' => $userId, // Associate the comment with the authenticated user, if available
        ]);

        // Optionally, you can return a response indicating success
        
        return redirect()->route('series.show', ['series' => $validatedData['series_id']])
                        ->with('success', 'Comment created successfully!');
    }

    public function update(Request $request, Comment $comment)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'comment' => 'required|string',
        ]);

        // Update the comment
        $comment->update([
            'comment' => $validatedData['comment'],
        ]);

        // Optionally, you can return a response indicating success
        return Redirect::back()->with('success', 'Comment updated successfully!');
    }

    public function destroy(Request $request, Comment $comment)
    {
        // Check if the user is authenticated
        if (!$request->user()) {
            return response()->json(['error' => 'Unauthenticated'], 401);
        }

        // Ensure the authenticated user can delete the comment
        if ($request->user()->isAdmin || $comment->id_user === $request->user()->id) {
            $comment->delete();
            return Redirect::back()->with('success', 'Comment deleted successfully');
        }

        // If the user is not authorized, return a 403 Forbidden response
        return response()->json(['error' => 'Unauthorized action.'], 403);
    }

}
