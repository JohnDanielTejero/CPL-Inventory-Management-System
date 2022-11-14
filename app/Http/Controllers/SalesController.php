<?php

namespace App\Http\Controllers;

use App\Models\Stock;
use App\Models\Purchase;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Store;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class SalesController extends Controller
{
    public function __constructor(){
        $this->middleware(['auth:api', 'auth.anyrole:ROLE_STORE_OWNER, ROLE_EMPLOYEE']);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, Store $store)
    {
        $purchase = Purchase::where('store_id', $store->stores_id)->get();
        return response()->json([['status' => 'success'], $purchase], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validate = Validator::make($request->all(),[
            'items' => ['required','array'],
            'customer' => ['required','string'],
            'Payable' => ['required'],
            'store' => ['required'],
        ]);

        if($validate->fails()){
            return response()->json([['status' => 'bad request'], $validate->errors()], 400);
        }

        $purchase = Purchase::create([
            'Purchase_By' => $request->customer,
            'Purchase_Date' => date('Y-m-d H:i:s'),
            'Purchase_Payable' => $request->Payable,
            'store_id' => $request->store,
        ]);

        foreach($request->items as $item){
            $stock = Stock::find($item['stock']);
            $purchase->stock()->attach($stock);

            DB::table('stock__purchases')
                ->where('stock_id', $item['stock'])
                ->where('purchase_id', $purchase->purchase_id)
                ->update([
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                ]);

            $currentStockQuantity = $stock->Stock_Quantity - $item['quantity'];
            $stock->update([
                'Stock_Quantity' => $currentStockQuantity,
                'Stock_Status' => $currentStockQuantity > 0 ? "Available" : "Out of stock",
            ]);
        }

        return response()->json([['status' => 'success']], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  Purchase $purchase
     * @return \Illuminate\Http\Response
     */
    public function show(Purchase $purchase)
    {
        $purchase = Purchase::where('purchase_id', $purchase->purchase_id)->with(['stock' => function($query){
            $query->with('product')->get();
        }])->first();
       return response()->json($purchase);
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

    /**
     * Remove the specified resource from storage.
     *
     * @param   Request $request
     * @param   Purchase $purchase
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Purchase $purchase)
    {
        if ($purchase->delete()){
            return $this->index($request, Store::find($request->store));
        }
        return response()->json([['status' => "resource not found"]], 404);
    }
}
