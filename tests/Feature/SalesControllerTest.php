<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Testing\WithFaker;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Illuminate\Foundation\Testing\RefreshDatabase;

class SalesController extends TestCase
{
    private $prefix = '/api/sales';

    public function test_add_sales()
    {
        $storeOwner = User::whereHas('User_Roles', function (Builder $query){
            $query->where('Role_Name', 'ROLE_STORE_OWNER');
        })->where('store_id','1')->first();

        $token = JWTAuth::fromUser($storeOwner);

        $response = $this->json('POST', $this->prefix . '/api/add-sales',[
            'items' => [
                [
                    'stock' => 1,
                    'quantity' => 1,
                    'price' => 6000,
                ]
            ],
            'customer' => "Test User",
            'Payable' => 6000,
            'store' => 1,
        ],[
            "Authorization" => "Bearer " . $token
        ]);

        $response->assertStatus(200);
    }
    /**
     * test get sales history.
     *
     * @return void
     */
    public function test_sales_history()
    {
        $storeOwner = User::whereHas('User_Roles', function (Builder $query){
            $query->where('Role_Name', 'ROLE_STORE_OWNER');
        })->where('store_id','1')->first();

        $token = JWTAuth::fromUser($storeOwner);

        $response = $this->json('GET', $this->prefix. '/sales-history/1', [],[
            'Authorization' => 'Bearer '. $token,
        ]);

        $response->assertStatus(200);

    }

    public function test_purchase_show()
    {
        $storeOwner = User::whereHas('User_Roles', function (Builder $query){
            $query->where('Role_Name', 'ROLE_STORE_OWNER');
        })->where('store_id','1')->first();

        $token =JWTAuth::fromUser($storeOwner);

        $response = $this->json('GET', $this->prefix. '/purchase/1', [], [
            'Authorization' => 'Bearer '. $token,
        ]);
        $response->assertStatus(200);
    }

    public function test_delete_sales()
    {
        $storeOwner = User::whereHas('User_Roles', function (Builder $query){
            $query->where('Role_Name', 'ROLE_STORE_OWNER');
        })->where('store_id','1')->first();

        $token = JWTAuth::fromUser($storeOwner);
        $response = $this->json('DELETE', $this->prefix. '/api/delete-sales/1', [], [
            "Authorization" => "Bearer ". $token,
        ]);

        $response->assertStatus(200);
    }
}
