<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

/**
 * API Controller for CRUD in Category table
 *
 * Only admin can access this.
 */
class CategoryController extends Controller
{

    public function __construct()
    {
        //$this->middleware(['auth:api', 'auth.allrole:ROLE_ADMIN']);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if($request['query'] == null){
            return response()->json(
                Category::all(), 200
            );
        }else{
            return response()->json(
                Category::where('Category_Name', 'LIKE', '%'.$request['query'].'%')->get(),
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
        $validate = Validator::make($request->all(),
            [
                'Category_Name' => ['required','string'],
                'Category_Desc' => ['required','string'],
            ]
        );

        if($validate->fails()){
            return response()->json(['errors' => $validate->errors()], 422);
        }

        return response()
            ->json(
                Category::create([
                    'Category_Name' => $request['Category_Name'],
                    'Category_Desc' => $request['Category_Desc'],
                ]),
                201
            );
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($category)
    {
        return (Category::find($category) == null) ?
            response()->json('resource not found', 404) :
            response()->json(Category::find($category), 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $category)
    {
        $validate = Validator::make($request->all(),
            [
                'Category_Name' => ['required', 'string'],
                'Category_Desc' => ['required', 'string'],
            ]
        );

        if($validate->fails()){
            return response()->json($validate->errors(), 422);
        }

        $category_target = Category::find($category);
        return ($category_target == null) ?
            response()->json(
                [
                    'resource does not exist therefore unable to be updated',
                    400
                ]
            ):
            response()->json(
                $category_target->update([
                    'Category_Name' => $request['Category_Name'],
                    'Category_Desc' => $request['Category_Desc'],
                ]),
                200
            );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($category)
    {
        if (Category::find($category) == null) {
            return response()->json('resource not found', 404);
        }else{
            Category::find($category)->delete();
            return response()->json(Category::all(), 200);
        }
    }
}
