<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Series;
use App\Models\Comment;

class UserController extends Controller
{
    public function show(User $user)
    {
        // Fetch the user's comments with series data
        $userSeries = $user->series()->get();
        $userComments = $user->comments()->with('series')->get();

        // Count the number of series and comments
        $numSeries = $userSeries->count();
        $numComments = $userComments->count();
    
        return inertia('UserShowDetails', [
            'user' => $user,
            'userSeries' => $userSeries,
            'userComments' => $userComments,
            'numSeries' => $numSeries,
            'numComments' => $numComments,
        ]);
    }
}
