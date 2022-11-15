<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\SalesController;
use App\Http\Controllers\StocksController;
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
    ->group(function(){
        Route::get('roles', 'allAvailableRoles')->middleware(['auth.anyrole:ROLE_ADMIN,ROLE_STORE_OWNER']);
        Route::get('logout', 'logout');
        Route::get('current-user', 'getUser');
        Route::get('all-users', 'getAllUser')->middleware(['auth.anyrole:ROLE_ADMIN,ROLE_STORE_OWNER']);
        Route::post('login', 'login');
        Route::post('register', 'register')->middleware(['auth.anyrole:ROLE_ADMIN,ROLE_STORE_OWNER']);
        Route::post('refresh', 'refresh');
        Route::post('has-permission', 'hasRole');
        Route::post('has-any-roles', 'hasAnyRole');
        Route::post('has-all-roles', 'hasAllRoles');
        Route::patch('update-user-profile', 'editUser');
        Route::delete('delete-user/{user}', 'deleteUser')->middleware(['auth.anyrole:ROLE_ADMIN,ROLE_STORE_OWNER']);
    });

/**
 * Route group for store interactions
 */
Route::controller(StoreController::class)
    ->prefix('/stores')
    ->group(function(){
        Route::get('all-stores', 'index')->middleware('auth.allrole:ROLE_ADMIN');
        Route::get('store/{store}', 'show');
        Route::post('add-store', 'store')->middleware('auth.allrole:ROLE_ADMIN');
        Route::patch('update-store/{store}', 'update')->middleware('auth.allrole:ROLE_ADMIN');
        Route::delete('delete-store/{store}', 'destroy')->middleware('auth.allrole:ROLE_ADMIN');
    });

/**
 * Route group for supplier interactions
 */
Route::controller(SupplierController::class)
    ->prefix('/suppliers')
    ->group(function(){
        Route::get('all-suppliers', 'index');
        Route::get('supplier/{supplier}', 'show');
        Route::post('add-supplier', 'store');
        Route::patch('update-supplier/{supplier}', 'update');
        Route::delete('delete-supplier/{supplier}', 'destroy');
    });

/**
 * Route group for products interactions
 */
Route::controller(ProductsController::class)
    ->prefix('/products')
    ->group(function(){
        Route::get('all-products', 'index');
        Route::get('product/{product}', 'show');
        Route::post('add-product', 'store');
        Route::patch('update-product/{product}', 'update');
        Route::put('add-payable/{product}', 'add_payable');
        Route::put('add-paid/{product}', 'add_paid');
        Route::delete('delete-product/{product}', 'destroy');
    });

/**
 * Route group for stocks interactions
 */
Route::controller(StocksController::class)
    ->prefix('/stocks')
    ->group(function(){
        Route::get('all-stocks/{store}', 'index');
        Route::get('all-available-stocks/{store}', 'available_stocks')->middleware('auth.anyrole:ROLE_STORE_OWNER,ROLE_EMPLOYEE');
        Route::post('add-stocks', 'store')->middleware('auth.anyrole:ROLE_ADMIN');
        Route::put('transfer-stocks/{stock}', 'transferStocks')->middleware('auth.anyrole:ROLE_ADMIN');
        Route::delete('delete-stock/{stock}', 'destroy')->middleware('auth.anyrole:ROLE_ADMIN');
    });

/**
 * Route group for purchases interactions
 */
Route::controller(SalesController::class)
    ->prefix('/sales')
    ->group(function(){
        Route::get('sales-history/{store}', 'index');
        Route::get('purchase/{purchase}', 'show');
        Route::post('add-sales', 'store');
        Route::delete('delete-sales/{purchase}', 'destroy');
    });
