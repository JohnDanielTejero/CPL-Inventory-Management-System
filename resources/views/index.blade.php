<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>{{ config('app.name') }}</title>
        <link rel="icon" href="{{ URL::asset('favicon.ico') }}" type="image/x-icon"/>
        <link rel = "stylesheet" type = "text/css" href='https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/css/intlTelInput.css'/>
    </head>
    <body class="antialiased">
        <div id = "app" class = "main-bg">
        </div>
        @viteReactRefresh
        @vite('resources/js/react-entry-point.js')
    </body>
</html>
