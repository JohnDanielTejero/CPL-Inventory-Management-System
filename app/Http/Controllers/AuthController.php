<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

/**
 * Controller for authenticating and authorization of user
 *
 * Can be used for CRUD operations of users
 */
class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','register','isLoggedIn']]);
    }

    /**
     * creates new JWT to login user
     *
     * @return JsonResponse bearer token
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $credentials = $request->only('email', 'password');

        $token = Auth::attempt($credentials);
        if (!$token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }

        $user = Auth::user();
        return response()->json([
                'status' => 'success',
                'user' => $user,
                'authorisation' => [
                    'token' => $token,
                    'type' => 'bearer',
                ]
            ]);

    }

    /**
     * creates new user
     *
     * Only admin can add new user
     *
     * @param Request $request - for input validation
     * @return JsonResponse a failure or success message
     */
    public function register(Request $request){

        $validator = Validator::make($request->all(),
            [
                'name' => ['required', 'string'],
                'email' => ['required', 'string', 'email', 'unique:users'],
                'password'=>['required', 'string'],
                'role' => ['required'],
                'store' => ['required']
            ]
        );

        if($validator->fails()){
            return response()->json([
                ['status' => 'failed validation'],
                $validator->errors(),
            ], 400);
        }

        $role = Role::find($request->role);

        if($role != null){

            $user = User::create([
                'name' => $request->name,
                'email' =>  $request->email,
                'password' => Hash::make($request->password),
                'store_id' => $request->store,
            ]);
            $user->User_Roles()->attach($role);

            return response()->json(['status' => 'created'], 201);

        }else{
            return response()->json(['status' => 'missing role'], 400);
        }

    }

    /**
     * Log out the user
     *
     * @return JsonResponse message for log out
     */
    public function logout()
    {
        Auth::logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ], 200);
    }

    /**
     * retrieves a specific user information of logged user
     *
     * @return JsonResponse User object
     */
    public function getUser(Request $request){

        if($request->user()->store_id != null){
            $user = User::join('stores', 'store_id', '=', 'stores.id')->where('users.id', $request->user()->id)->first();
            return response()->json($user);
        }else{
            return response()->json(Auth::user());
        }
    }

    /**
     * Checks if a user is signed in
     *
     * @return bool
     */
    public function isLoggedIn(){
        return response()->json(Auth::check());
    }


    /**
     * for admin usage
     *
     * Get all registered users
     * @param Request $request solely for the user query.
     * @return JsonResponse collection of users
     */
    public function getAllUser(Request $request){
        if($request['query'] == null){
            return response()->json(
                User::join('stores', 'store_id', '=', 'stores.id')->whereHas('User_Roles', function (Builder $query){
                    $query->where('role_name', '!=', 'ROLE_ADMIN');
                })->where('user.id', '!=', $request->user()->id)->get(), 200
            );
        }else{
            return response()->json(
                User::join('stores', 'store_id', '=', 'stores.id')
                    ->where('first_name', 'LIKE', '%'.$request['query'].'%')
                    ->orWhere('last_name', 'LIKE','%'.$request['query'].'%')
                    ->whereHas('User_Roles', function (Builder $query){
                        $query->where('role_name', '!=', 'ROLE_ADMIN');
                    })->get(),
                200
            );
        }
    }

    /**
     * invalidates auth token and generates a new token
     *
     * @return JsonResponse status, user, and token
     */
    public function refresh()
    {
        return response()->json([
            'status' => 'success',
            'user' => Auth::user(),
            'authorisation' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ]
        ]);
    }

    /**
     * Check if user has role
     *
     * @param Request $request string of role
     * @return bool|string
     */
    public function hasRole(Request $request){
        if (!Auth::check()) return response()->json('unauthenticated user cannot use this endpoint', 401);
        else{
            return response()->json($request->user()->hasPermission($request['permission']), 200);
        }
    }

    /**
     * check if user has any role
     *
     * @param Request $request array of roles
     * @return bool|string
     */
    public function hasAnyRole(Request $request){
        if (!Auth::check()) return response()->json(['unauthenticated user cannot use this endpoint', 401]);
        else{
            return response()->json($request->user()->hasAnyRole($request['permission']), 200);
        }
    }

    /**
     * check if user has all roles
     *
     * @param Request $request array of roles
     * @return bool|string
     */
    public function hasAllRoles(Request $request){
        if (!Auth::check()) return response()->json(['unauthenticated user cannot use this endpoint', 401]);
        else{
            return response()->json($request->user()->hasRoles($request['permission']), 200);
        }
    }

}
