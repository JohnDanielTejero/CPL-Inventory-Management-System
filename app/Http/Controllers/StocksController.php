<?php

namespace App\Http\Controllers;

use App\Models\Stock;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Store;
use Illuminate\Support\Facades\Validator;

class StocksController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Store $store
     * @return \Illuminate\Http\Response
     */
    public function index(Store $store)
    {
        return response()->json([
            ['status' => 'success'],
            Stock::where('Store_Id', $store->stores_id)->with('product')->join('categories', 'categories.category_id','product_id')->get(),
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'store' => ['required'],
            'product' => ['required'],
            'amount' => ['required', 'gt:0'],
        ]);

        if($validate->fails()){
            return response()->json([['status' => 'invalid request'], $validate->errors()], 400);
        }

        $store = Store::find($request->store);
        if($store == null) return response()->json([['status' => 'store not found']],404);

        $product = Product::find($request->product);
        if($product == null) return response()->json([['status' => 'store not found']], 404);

        if(Stock::create(
            [
                'Stock_Quantity' => $request['amount'],
                'Stock_Status' => $request['amount'] > 0 ? "Available" : "Out of Stock",
                'Product_Id' => $request['product'],
                'Store_Id' => $request['store'],
            ]
        ) && $product->update([
            'Product_Paid' => $product['Product_Paid'] - $request['amount'],
        ])){
            return $this->index($store);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    public function transferStocks(Request $request, Stock $stock)
    {
        $validate = Validator::make($request->all(), [
            'store' => ['required'],
            'amount' => ['required', 'gt:0'],
        ]);

        if($validate->fails()){
            return response()->json([['status' => 'invalid request'], $validate->errors()], 400);
        }

        $store = Store::find($request->store);
        if($store == null) return response()->json([['status' => 'store not found']], 404);

        $product = Product::find($stock->Product_Id);
        if($product == null) return response()->json([['status' => 'store not found']], 404);

        if($stock->update([
                'Stock_Quantity' => $stock->Stock_Quantity + $request['amount'],
            ]) &&
            $product->update([
                'Product_Paid' => $product['Product_Paid'] - $request['amount'],
            ])
        ){
            return $this->index($store);
        }

    }

    /**
     * Remove the specified resource from storage.
     * @param Request $request
     * @param  Stock $stock
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Stock $stock)
    {
        if(Stock::find($stock->stock_id) == null) return response()->json([['status' => 'stock not found']],404);

        $store = Store::find($request->store);
        if($store == null) return response()->json([['status' => 'store not found']], 404);

        if($stock->delete()){
            return $this->index($store);
        }
    }
}
