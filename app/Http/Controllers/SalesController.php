<?php

namespace App\Http\Controllers;

use App\Models\Stock;
use App\Models\Purchase;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class SalesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        ]);

        if($validate->fails()){
            return response()->json([['status' => 'bad request'], $validate->errors()], 400);
        }

        $purchase = Purchase::create([
            'Purchase_By' => $request->customer,
            'Purchase_Date' => date('Y-m-d H:i:s'),
            'Purchase_Payable' => $request->Payable,
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

            $stock->update([
                'Stock_Quantity' => $stock->Stock_Quantity - $item['quantity'],
            ]);
        }

        return response()->json([['status' => 'success']], 200);
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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
