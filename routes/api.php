<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Models\Role;
use App\Models\Store;
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

/**
 * Route group for categories
 */
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


/**
 * Route group for auth controller.
 */
Route::controller(AuthController::class)
    ->prefix('/users')
    ->group(function () {
        Route::get('roles', 'allAvailableRoles');
        Route::get('logout', 'logout');
        Route::get('current-user', 'getUser');
        Route::get('all-users', 'getAllUser');
        Route::post('login', 'login');
        Route::post('register', 'register');
        Route::post('refresh', 'refresh');
        Route::post('has-permission', 'hasRole');
        Route::post('has-any-roles', 'hasAnyRole');
        Route::post('has-all-roles', 'hasAllRoles');
        Route::patch('update-user-profile', 'editUser');
        Route::delete('delete-user/{user}', 'deleteUser');
    });

//temporary controller for retrieving stores
Route::get('/stores', function(){
    return response()->json(Store::all(), 200);
});
