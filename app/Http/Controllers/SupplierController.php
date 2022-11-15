<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * Controller class for suppliers processes
 */
class SupplierController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:api','auth.allrole:ROLE_ADMIN']);
    }
    /**
     * Display a listing of the resource.
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if($request['query'] == null || $request['query'] == ''){
            return response()->json(Supplier::all(), 200);
        }else{
            return response()->json(Supplier::where('Supp_Name','LIKE','%'.$request['query'].'%')->latest('modified_at')->get(), 200);
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
            'Supp_Name' => ['required', 'string'],
            'Store_Email' => ['required', 'string', 'email'],
            'Supp_ContactNo' => ['required', 'string'],
        ]);

        if($validate->fails()){
            return response()->json([['status' => 'bad request'], $validate->errors()] ,400);
        }

        return response()->json([
            ['status' => 'resource created successfully'],
            Supplier::create([
                'Supp_Name' => $request['Supp_Name'],
                'Supp_Address' => $request['Supp_Email'],
                'Supp_ContactNo' => $request['Supp_ContactNo'],
                ])
            ], 201);

        }

        /**
         * Display the specified resource.
         *
         * @param  Supplier $supplier
         * @return \Illuminate\Http\Response
         */
        public function show(Supplier $supplier)
        {
            if($supplier == null) return response()->json([['status' => 'resource not found']], 404);
            return response()->json($supplier, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  Supplier $supplier
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Supplier $supplier)
    {

        if($supplier == null) return response()->json([['status' => 'resource not found']], 404);

        $validate = Validator::make($request->all(), [
            'Supp_Name' => ['required', 'string'],
            'Supp_Email' => ['required', 'string', 'email'],
            'Supp_ContactNo' => ['required', 'string'],
        ]);

        if($validate->fails()){
            return response()->json([['status' => 'bad request'], $validate->errors()] ,400);
        }

        return response()->json([
            ['status' => 'updated'],
            $supplier->update([
                'Supp_Name' => $request->Supp_Name,
                'Supp_Email' => $request->Supp_Email,
                'Supp_ContactNo' => $request->Supp_ContactNo,
                ])
            ], 200);


    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Request $request
     * @param Supplier $supplier
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Supplier $supplier)
    {
        if ($supplier != null){
            if($supplier->delete()){
                return $this->index($request);
            }
        }else{
            return response()->json([['status' => 'resource not found']], 404);
        }
    }
}
