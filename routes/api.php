<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
        'prefix'=>'/category'
    ],
    function(){
        Route::get('categories', [CategoryController::class, 'index']);
        Route::post('add-category', [CategoryController::class, 'store']);
        Route::get('category-information/{category}', [CategoryController::class, 'show']);
        Route::patch('update-category/{category}', [CategoryController::class, 'update']);
        Route::delete('delete-category/{category}', [CategoryController::class, 'destroy']);
    }
);

Route::controller(AuthController::class)
    ->prefix('/users')
    ->group(function () {
        Route::post('login', 'login');
        Route::post('register', 'register');
        Route::post('logout', 'logout');
        Route::post('refresh', 'refresh');
        Route::get('current-user', 'getUser');
        Route::post('has-permission', 'hasRole');
        Route::post('has-any-roles', 'hasAnyRole');
        Route::post('has-all-roles', 'hasAllRoles');
});
