<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StoreController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:api']);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if($request['query'] == null || $request['query'] == ''){
            return response()->json(Store::all(), 200);
        }else{
            return response()->json(Store::where('Store_Name','LIKE','%'.$request['query'].'%')->latest('modified_at')->get(), 200);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'Store_Name' => ['required', 'string'],
            'Store_Address' => ['required', 'string'],
        ]);

        if($validate->fails()){
            return response()->json([['status' => 'bad request'], $validate->errors()] ,400);
        }

        return response()->json([
                    ['status' => 'resource created successfully'],
                    Store::create([
                        'Store_Name' => $request['Store_Name'],
                        'Store_Address' => $request['Store_Address'],
                    ])
                ], 201);


    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Store $store)
    {
        return response()->json($store, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Store $store)
    {

        if($store == null) return response()->json([['status' => 'resource not found']], 404);

        $validate = Validator::make($request->all(), [
            'Store_Name' => ['required', 'string'],
            'Store_Address' => ['required', 'string'],
        ]);

        if($validate->fails()){
            return response()->json([['status' => 'bad request'], $validate->errors()] ,400);
        }

        return response()->json([
                ['status' => 'updated'],
                $store->update([
                    'Store_Name' => $request->Store_Name,
                    'Store_Address' => $request->Store_Address,
                ])
            ], 200);



    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Store $store)
    {
        if ($store != null){
            if($store->delete()){
                return $this->index($request);
            }
        }else{
            return response()->json([['status' => 'resource not found']], 404);
        }
    }
}
