<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Testing\WithFaker;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Illuminate\Foundation\Testing\RefreshDatabase;

class StocksController extends TestCase
{
    private $prefix = '/api/stocks';
    /**
     * Retrieve all stocks of a particular store.
     *
     * @return void
     */
    public function test_all_stocks()
    {
        $admin = User::whereHas('User_Roles', function (Builder $query){
            $query->where('Role_Name', 'ROLE_ADMIN');
        })->first();

        $token = JWTAuth::fromUser($admin);
        $response = $this->json('GET', $this->prefix. '/all-stocks/1', [], [
            'Authorization' => "Bearer $token",
        ]);

        $response->assertStatus(200);
    }

    public function test_all_available_stocks()
    {
        $storeOwner = User::whereHas('User_Roles', function (Builder $query){
            $query->where('Role_Name', 'ROLE_STORE_OWNER');
        })->where('store_id', 1)->first();

        $token = JWTAuth::fromUser($storeOwner);

        $response = $this->json('GET', $this->prefix. '/all-available-stocks/1', [], [
            "Authorization" => "Bearer $token",
        ]);

        $response->assertStatus(200);
    }

    public function test_add_stocks()
    {
        $admin = User::whereHas('User_Roles', function (Builder $query){
            $query->where('Role_Name', 'ROLE_ADMIN');
        })->first();

        $token = JWTAuth::fromUser($admin);
        $response = $this->json('POST', $this->prefix. '/add_stocks', [
            'store' => 1,
            'product' => 4,
            'amount' => 1,
        ],[
            "Authorization" => "Bearer $token",
        ]);

        $response->assertStatus(200);
    }

    public function test_transfer_stocks()
    {
        $admin = User::whereHas('User_Roles', function (Builder $query){
            $query->where('Role_Name', 'ROLE_ADMIN');
        })->first();

        $token = JWTAuth::fromUser($admin);

        $response = $this->json('PUT', $this->prefix. '/transfer-stocks/1',[
            'store' => 1,
            'amount' => 1,
        ],[
            "Authorization" => "Bearer $token",
        ]);

        $response->assertStatus(200);
    }

    public function test_delete_stocks()
    {
        $admin = User::whereHas('User_Roles', function (Builder $query){
            $query->where('Role_Name', 'ROLE_ADMIN');
        })->first();

        $token = JWTAuth::fromUser($admin);
        $response = $this->json('DELETE', $this->prefix. '/delete-stock/1', [], [
            "Authorization" => "Bearer $token",
        ]);

        $response->assertStatus(200);
    }
}
