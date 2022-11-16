<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class StoreController extends TestCase
{
    private $prefix = "/api/stores/";

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_all_stores()
    {
        $admin = User::whereHas('User_Roles', function(Builder $query){
            $query->where('Role_Name', 'ROLE_ADMIN');
        })->first();

        $token = JWTAuth::fromUser($admin);

        $response = $this->json('GET', $this->prefix."/all-stores", [],[
            'Authorization' => "Bearer $token",
        ]);

        $response->assertStatus(200);
    }

    public function test_view_store()
    {
        $admin = User::whereHas('User_Roles', function(Builder $query){
            $query->where('Role_Name', 'ROLE_ADMIN');
        })->first();

        $token = JWTAuth::fromUser($admin);

        $response = $this->json('GET', $this->prefix."/store/1",[],[
            "Authorization" => "Bearer $token",
        ]);

        $response->assertStatus(200);
    }

    public function test_create_store()
    {
        $admin = User::whereHas('User_Roles', function(Builder $query){
            $query->where('Role_Name', 'ROLE_ADMIN');
        })->first();

        $token = JWTAuth::fromUser($admin);

        $response = $this->json('POST', $this->prefix."/add-store",[
            "Store_Name" => "Test Store Name",
            "Store_Address" => "Test Store Address",
        ],[
            "Authorization" => "Bearer $token",
        ]);

        $response->assertStatus(201);
    }

    public function test_update_store()
    {
        $admin = User::whereHas('User_Roles', function(Builder $query){
            $query->where('Role_Name', 'ROLE_ADMIN');
        })->first();

        $token = JWTAuth::fromUser($admin);

        $response = $this->json('PATCH', $this->prefix."/update-store/1", [
            "Store_Name" => "Update Store Name",
            "Store_Address" => "Update Store Address",
        ],[
            "Authorization" => "Bearer $token",
        ]);

        $response->assertStatus(200);
    }

    public function test_delete_store()
    {
        $admin = User::whereHas('User_Roles', function(Builder $query){
            $query->where('Role_Name', 'ROLE_ADMIN');
        })->first();

        $token = JWTAuth::fromUser($admin);

        $response = $this->json('DELETE', $this->prefix."/delete-store/4",[],[
            "Authorization" => "Bearer $token",
        ]);

        $response->assertStatus(200);
    }
}
