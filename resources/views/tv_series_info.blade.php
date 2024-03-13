<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $tvSeries->title }} Episodes</title>
</head>
<body>
    <h1>{{ $tvSeries->title }} Episodes</h1>

    <!-- Display TV series information -->
    <p><strong>Description:</strong> {{ $tvSeries->description }}</p>
    <p><strong>Creator:</strong> {{ $tvSeries->creator }}</p>
    <p><strong>Release Year:</strong> {{ $tvSeries->release_year }}</p>
    <p><strong>Genre:</strong> {{ $tvSeries->genre }}</p>
    <p><strong>Rating:</strong> {{ $tvSeries->rating }}</p>

    <hr>

    <h2>Seasons</h2>

    <!-- Loop through seasons -->
    @foreach ($tvSeries->seasons as $season)
        <h3>Season {{ $loop->iteration }}: {{ $season->title }}</h3>
        <ul>
            <!-- Loop through episodes of the current season -->
            @foreach ($season->episodes as $episode)
                <li>
                    <strong>Episode {{ $loop->iteration }}:</strong> {{ $episode->title }}
                </li>
            @endforeach
        </ul>
    @endforeach
</body>
</html>
