<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>{{ config('app.name') }}</title>
    </head>
    <body class="antialiased">
        <div id = "app">
        </div>
        @viteReactRefresh
        @vite('resources/js/react-entry-point.js')
    </body>
</html>
