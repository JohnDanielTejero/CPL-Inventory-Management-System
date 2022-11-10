<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Builder;
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
                'first_name' => ['required', 'string'],
                'last_name' => ['required', 'string'],
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
        $store = Store::find($request->store);

        if($role != null && $store != null){

            $user = User::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' =>  $request->email,
                'password' => Hash::make($request->password),
                'store_id' => $request->store,
            ]);

            $user->User_Roles()->attach($role);
            return response()->json([['status' => 'created']], 200);

        }else{
            $error_response = [['status' => 'missing entity']];
            if ($role == null){
                $error_response.array_push(['role' => 'role does not exist']);
            }

            if ($store == null){
                $error_response.array_push(['store' => 'store does not exist']);
            }
            return response()->json($error_response, 400);
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
            $user = User::join('stores', 'users.store_id', '=', 'stores.stores_id')
                ->with('User_Roles')
                ->where('users.user_id', $request->user()->user_id)
                ->first(['users.*', 'stores.Store_Name', 'stores.Store_Address']);
            return response()->json($user);
        }else{
            return response()->json(User::with('User_Roles')->where('user_id', $request->user()->user_id)->first());
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
        if($request['query'] == null || $request['query'] == ""){

            switch ($request) {
                case $request->user()->hasPermission('ROLE_ADMIN'):
                    return response()->json(
                        User::join('stores', 'store_id', '=', 'stores.stores_id')->whereHas('User_Roles', function (Builder $query){
                            $query->where('role_name', '!=', 'ROLE_ADMIN');
                        })->where('users.user_id', '!=', $request->user()->user_id)
                        ->latest('users.created_at')
                        ->get(['users.*', 'stores.Store_Name', 'stores.Store_Address']), 200
                    );
                    break;
                case $request->user()->hasPermission('ROLE_STORE_OWNER'):
                    return response()->json(
                        User::join('stores', 'store_id', '=', 'stores.stores_id')->whereHas('User_Roles', function (Builder $query){
                            $query->where('role_name', '!=', 'ROLE_ADMIN')->where('role_name', '!=', 'ROLE_STORE_OWNER');
                        })->where('users.user_id', '!=', $request->user()->user_id)
                        ->where('store_id', $request->user()->store->stores_id)
                        ->latest('users.created_at')
                        ->get(['users.*', 'stores.Store_Name', 'stores.Store_Address']), 200
                    );
                    break;

                default:
                    return response()->json([['status'=>'forbidden']], 403);
                    break;
            }

        }else{
            switch ($request) {
                case $request->user()->hasPermission('ROLE_ADMIN'):
                    return response()->json(
                        User::join('stores', 'store_id', '=', 'stores.stores_id')
                            ->where('first_name', 'LIKE', '%'.$request['query'].'%')
                            ->orWhere('last_name', 'LIKE','%'.$request['query'].'%')
                            ->whereHas('User_Roles', function (Builder $query){
                                $query->where('role_name', '!=', 'ROLE_ADMIN');
                            })->where('users.user_id', '!=', $request->user()->user_id)
                            ->latest('users.created_at')
                            ->get(['users.*', 'stores.Store_Name', 'stores.Store_Address']),
                        200
                    );
                    break;

                case $request->user()->hasPermission('ROLE_STORE_OWNER'):
                    return response()->json(
                        User::join('stores', 'store_id', '=', 'stores.stores_id')
                            ->where('first_name', 'LIKE', '%'.$request['query'].'%')
                            ->orWhere('last_name', 'LIKE','%'.$request['query'].'%')
                            ->whereHas('User_Roles', function (Builder $query){
                                $query->where('role_name', '!=', 'ROLE_ADMIN')
                                    ->where('role_name', '!=', 'ROLE_STORE_OWNER');
                            })->where('users.user_id', '!=', $request->user()->user_id)
                            ->where('store_id', $request->user()->store->stores_id)
                            ->latest('users.created_at')
                            ->get(['users.*', 'stores.Store_Name', 'stores.Store_Address']),
                        200
                    );
                    break;

                default:
                    return response()->json([['status'=>'forbidden']], 403);
                    break;
            }

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

    /**
     * Delete a user record
     *
     * Only admin can delete user!
     *
     * @param User $user user entity, in request takes id as argument
     * @return JsonResponse deletion message.
     */
    public function deleteUser(Request $request, User $user){
        if ($user != null){
            if($user->delete()){
                return $this->getAllUser($request);
            }
        }else{
            return response()->json([['status' => 'resource not found']], 404);
        }
    }

    /**
     * For admin display only!!
     *
     * Display all available roles.
     *
     * @return JsonResponse collection of roles.
     */
    public function allAvailableRoles(){
        return response()->json(Role::where('Role_Name', '!=', 'ROLE_ADMIN')->get(), 200);
    }

    /**
     * Function for user to edit own's profile
     *
     * @return JsonResponse current user's updated profile
     */
    public function editUser(Request $request){

        if ($request->user() == null){
            return response()->json([['status' => 'not found'], ['message' => 'user does not exist']], 404);
        }

        $validator = Validator::make($request->all(),
            [
                'first_name' => ['required', 'string'],
                'last_name' => ['required', 'string'],
                'password'=>['required', 'string'],
            ]
        );

        if($validator->fails()){
            return response()->json([
                ['status' => 'failed validation'],
                $validator->errors(),
            ], 400);
        }

        if( $request->user()->update([
            'first_name' => $request['first_name'],
            'last_name' => $request['last_name'],
            'password'=> Hash::make($request['password']),
        ])){
            return response()->json([['status' => 'updated'], $request->user()], 200);
        }


    }
}
