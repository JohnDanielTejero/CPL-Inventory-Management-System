<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\StoreController;
use App\Http\Controllers\SupplierController;
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

/**
 * Route group for store interaction
 */
Route::controller(StoreController::class)
    ->prefix('/stores')
    ->group(function () {
        Route::get('all-stores', 'index');
        Route::get('store/{store}', 'show');
        Route::post('add-store', 'store');
        Route::patch('update-store/{store}', 'update');
        Route::delete('delete-store/{store}', 'destroy');
    });

/**
 * Route group for supplier interaction
 */
Route::controller(SupplierController::class)
    ->prefix('/suppliers')
    ->group(function () {
        Route::get('all-suppliers', 'index');
        Route::get('supplier/{supplier}', 'show');
        Route::post('add-supplier', 'store');
        Route::patch('update-supplier/{supplier}', 'update');
        Route::delete('delete-supplier/{supplier}', 'destroy');
    });

Route::controller(ProductsController::class)
    ->prefix('/products')
    ->group(function () {
        Route::get('all-products', 'index');
        Route::get('product/{product}', 'show');
        Route::post('add-product', 'store');
        Route::patch('update-product/{product}', 'update');
        Route::put('add-payable/{product}', 'add_payable');
        Route::put('add-paid/{product}', 'add_paid');
        Route::delete('delete-product/{product}', 'destroy');
    });
