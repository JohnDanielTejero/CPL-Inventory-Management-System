<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;


class AuthControllerTest extends TestCase
{
    /**
     * Test the login functionality
     *
     * @return void
     */
    public function test_login(){
        $response = $this->json('POST','/api/users/login', [
            'email' => 'admin@gmail.com',
            'password' => 'wasd',
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'status',
            'user',
            'authorisation' => [
                'token',
                'type',
            ]
        ]);
    }

    /**
     * test the registration action of the api
     *
     * @return void
     */
    public function test_register_employee(){
        $admin = User::whereHas('User_Roles', function (Builder $query){
            $query->where('Role_Name', 'ROLE_ADMIN');
        })->first();

        $token = JWTAuth::fromUser($admin);

        $response = $this->json('POST', 'api/users/register', [
            'first_name' => "Test",
            'last_name' => "User",
            'email' => 'testuser@gmail.com',
            'password'=> 'wasd',
            'role' => '3',
            'store' => '1'
        ],[
            'Authorization' => 'Bearer '.$token
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            [
                'status'
            ]
        ]);
    }

    /**
     * Test the logout functionality
     *
     * @return void
     */
    public function test_logout(){
        $admin = User::whereHas('User_Roles', function (Builder $query){
            $query->where('Role_Name', 'ROLE_ADMIN');
        })->first();

        $token = JWTAuth::fromUser($admin);

        $response = $this->json('GET','/api/users/logout', [], [
            'Authorization' => 'Bearer '.$token
        ]);
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'status',
            'message',
        ]);
    }

    /**
     * Test the has permission functionality
     *
     * @return void
     */
    public function test_update_profile(){
        $admin = User::whereHas('User_Roles', function (Builder $query){
            $query->where('Role_Name', 'ROLE_ADMIN');
        })->first();

        $token = JWTAuth::fromUser($admin);

        $response = $this->json('PATCH', '/api/users/update-user-profile', [
            'first_name' => "Admin",
            'last_name' => "Update",
            'password'=> 'wasd',
        ],[
            'Authorization' => 'Bearer '.$token
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
                [
                    'status',
                ]
            ]);
    }
}
