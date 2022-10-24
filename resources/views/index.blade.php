<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>{{ config('app.name') }}</title>
        <link rel="icon" href="{{ URL::asset('favicon.ico') }}" type="image/x-icon"/>
    </head>
    <body class="antialiased">
        <div id = "app">
        </div>
        @viteReactRefresh
        @vite('resources/js/react-entry-point.js')
    </body>
</html>
