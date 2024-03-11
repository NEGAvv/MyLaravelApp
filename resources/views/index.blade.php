<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>All TV Series</title>
</head>
<body>
    <h1>All TV Series</h1>

    <ul>
        <!-- Loop through TV series data and display dynamically -->
        @foreach ($tvSeries as $series)
            <li>
                <a href="{{ route('tv-series.episodes', ['id' => $series->id]) }}">
                    {{ $series->title }}
                </a>
            </li>
        @endforeach
    </ul>
</body>
</html>
