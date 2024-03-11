<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $tvSeries->title }} Episodes</title>
</head>
<body>
    <h1>{{ $tvSeries->title }} Episodes</h1>

    <ul>
        <!-- Loop through episodes and display dynamically -->
        @foreach ($episodes as $episode)
            <li>{{ $episode->title }}</li>
        @endforeach
    </ul>

    {{ $episodes->links() }} <!-- Pagination links -->
</body>
</html>
