<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProductsController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:api', 'auth.allrole:ROLE_ADMIN']);
    }
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if($request['query'] == null){
            return response()->json(
                Product::with('category')
                    ->get(),
                     200
            );
        }else{
            return response()->json(
                Product::where('Product_Name', 'LIKE', '%'.$request['query'].'%')
                    ->with('category')
                    ->get(),
                200
            );
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
            'Product_Name' => ['required','string'],
            'Product_Desc' => ['required', 'string'],
            'Product_Price' => ['required','numeric','gt:0'],
            'Product_Markup' => ['required','numeric','gt:0'],
            'Product_Image' => ['required','image','mimes:jpg,png,gif,jpeg,svg,JPG'],
            'supplier' => ['required'],
            'category' => ['required'],
        ]);

        if ($validate->fails()){
            return response()->json([['status' => 'bad request'], $validate->errors()], 400);
        }

         //file upload
        $destination = 'public';
        $file = Storage::disk($destination)->put('products', $request->file('Product_Image'));
        $expiry = $request['Product_Expiry'] != null ? $request['Product_Expiry'] : null;

        return response()->json([
            ['status' => 'created'],
            Product::create([
                'Product_Name' => $request['Product_Name'],
                'Product_Desc' => $request['Product_Desc'],
                'Product_Price' => $request['Product_Price'],
                'Product_Markup' => $request['Product_Markup'],
                'Product_Paid' => 0,
                'Product_Payable' => 0,
                'Product_Image' => env('APP_URL').":8000/storage/products/".basename($file),
                'Product_Expiry' => $expiry,
                'Supplier_Id' => $request['supplier'],
                'Category_Id' => $request['category']
            ]),

        ], 200);

    }

    /**
     * Display the specified resource.
     *
     * @param  Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        return response()->json([['status' => 'success'], Product::where("product_id", $product->product_id)->with('supplier')->first()], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        if (Product::find($product->product_id) == null) return response()->json([['status' => 'resource not found']], 404);
        $validate = Validator::make($request->all(), [
            'Product_Name' => ['required','string'],
            'Product_Desc' => ['required', 'string'],
            'Product_Price' => ['required','numeric','gt:0'],
            'Product_Markup' => ['required','numeric','gt:0'],
        ]);

        if ($validate->fails()){
            return response()->json([['status' => 'bad request'], $validate->errors()], 400);
        }

        //file upload
        $destination = 'public';
        $file = $request->file('Product_Image') != null ? Storage::disk($destination)->put('products', $request->file('Product_Image')) : null;
        $expiry = $request['Product_Expiry'] != null ? $request['Product_Expiry'] : null;

        return response()->json([
            ['status' => 'updated'],
            $product->update([
                'Product_Name' => $request['Product_Name'],
                'Product_Desc' => $request['Product_Desc'],
                'Product_Price' => $request['Product_Price'],
                'Product_Markup' => $request['Product_Markup'],
                'Product_Image' => $file != null ? env('APP_URL').":8000/storage/products/".basename($file) : $product->Product_Image,
                'Product_Expiry' => $expiry,
                'Supplier_Id' => $request['supplier'] != null || $request['supplier'] != "" ? $request['supplier'] : $product['Supplier_Id'],
                'Category_Id' => $request['category'] != null || $request['category'] != "" ? $request['category'] : $product['Category_Id'],
            ]),

        ], 200);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Request $request
     * @param  Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Product $product)
    {
        if ($product != null){
            if($product->delete()){
                return $this->index($request);
            }
        }else{
            return response()->json([['status' => 'resource not found']], 404);
        }
    }

    /**
     * Adds payable amount to the resource
     *
     * @param Request $request
     * @param  Product  $product
     * @return \Illuminate\Http\Response
     */
    public function add_payable(Request $request, Product $product){
        if (Product::find($product->product_id) == null) return response()->json([['status' => 'resource not found']], 404);

        $validate = Validator::make($request->all(), [
            'add_payable' => ['required', 'numeric', 'gt:0'],
        ]);

        if ($validate->fails()){
            return response()->json([['status' => 'invalid request'], $validate->errors()], 400);
        }

        $product->update([
            'Product_Payable' => $product->Product_Payable + $request->add_payable,
        ]);

        return $this->show($product);
    }


    /**
     * Reduce payable amount to the resource and adds to the paid.
     *
     * @param Request $request
     * @param  Product  $product
     * @return \Illuminate\Http\Response
     */
    public function add_paid(Request $request, Product $product){
        if (Product::find($product->product_id) == null) return response()->json([['status' => 'resource not found']], 404);

        $validate = Validator::make($request->all(), [
            'add_paid' => ['required', 'numeric', 'gt:0'],
        ]);

        if ($validate->fails()){
            return response()->json([['status' => 'invalid request'], $validate->errors()], 400);
        }
        $product->update([
            'Product_Payable' => $product->Product_Payable - $request->add_paid,
            'Product_Paid' => $product->Product_Paid + $request->add_paid,
        ]);
        return $this->show($product);
    }
}
