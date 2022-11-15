<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Stock;
use App\Models\Store;
use App\Models\Product;
use App\Models\Category;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Database\Seeders\StocksSeeder;
use App\Http\Controllers\Controller;
use App\Models\Purchase;
use Illuminate\Database\Eloquent\Builder;

/**
 * Controller for dashboard related processes
 */
class DashboardController extends Controller
{
    public function __construct(){
        $this->middleware(['auth:api']);
    }

    /**
     * Controller method for admin dashboard
     *
     * @return Response
     */
    public function admin_dashboard(){
        $userCount = User::whereHas('User_Roles', function(Builder $query){
            $query->where('Role_Name', "!=", 'ROLE_ADMIN');
        })->count();

        $categoryCount = Category::all()->count();
        $supplierCount = Supplier::all()->count();

        $productPayableCount = 0;
        $productPaidCount = 0;
        $products = Product::all();
        $storeCount = Store::all()->count();

        foreach ($products as $product){
            $productPayableCount += $product['Product_Payable'];
            $productPaidCount += $product['Product_Paid'];
        }

        return response()->json([['status'=> 'success'],
            [
                'Employees' => $userCount,
                'Categories' => $categoryCount,
                'Suppliers' => $supplierCount,
                'ProductsPaid' => $productPaidCount,
                'ProductsPayable' => $productPayableCount,
                'Stores' => $storeCount,
            ]
        ], 200);
    }

    /**
     * Controller method for store owner dashboard
     *
     * @param Request $request
     * @return Response
     */
    public function store_owner_dashboard(Request $request){
        $stocksAvailableCount = Stock::where('Store_Id', $request->user()->store_id)
            ->where('Stock_Status', 'Available')
            ->get()
            ->count();
        $salesCount = Purchase::where('store_id', $request->user()->store_id)
            ->get()
            ->count();
        $userCount = User::where('store_id',$request->user()->store_id)
            ->whereHas('User_Roles', function (Builder $query){
                $query->where('Role_Name', '!=', 'ROLE_STORE_OWNER')
                    ->where('Role_Name', '!=', 'ROLE_ADMIN');
            })
            ->get()
            ->count();
        return response()->json([['status' => 'success'],
            [
                'Employees' => $userCount,
                'Sales' => $salesCount,
                'AvailableStocks' => $stocksAvailableCount,
            ]
        ], 200);
    }
}
