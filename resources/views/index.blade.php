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
                <!-- Check if there are any seasons associated with the TV series -->
                @if ($series->seasons->isNotEmpty())
                    <!-- Provide the series_id and season_id parameters -->
                    <a href="{{ route('tv-series.episodes', ['series_id' => $series->id, 'season_id' => $series->seasons->first()->id]) }}">
                        {{ $series->title }}
                    </a>
                @else
                    <!-- Handle case where there are no seasons associated with the TV series -->
                    {{ $series->title }} (No Seasons Available)
                @endif
            </li>
        @endforeach
    </ul>
</body>
</html>
