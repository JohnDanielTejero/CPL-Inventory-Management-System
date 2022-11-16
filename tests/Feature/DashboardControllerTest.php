<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Testing\WithFaker;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Illuminate\Foundation\Testing\RefreshDatabase;

class DashboardController extends TestCase
{
    private $prefix = '/api/dashboard';
    /**
     * test to get admin dashboard.
     *
     * @return void
     */
    public function test_admin_dashboard()
    {
        $admin = User::whereHas('User_Roles', function (Builder $query){
            $query->where('Role_Name', 'ROLE_ADMIN');
        })->first();
        $token = JWTAuth::fromUser($admin);

        $response = $this->json('GET', $this->prefix. '/admin', [] ,[
            'Authorization' => 'Bearer '.$token,
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            ['status'   => 'success',],
            [
                'Employees',
                'Categories',
                'Suppliers',
                'ProductsPaid',
                'ProductsPayable',
                'Stores'
            ]
        ]);

        $response->assertStatus(200);
    }

    /**
     * test to get store owner dashboard.
     *
     * @return void
     */
    public function test_store_owner_dashboard(){
        $storeOwner = User::whereHas('User_Roles', function (Builder $query){
            $query->where('Role_Name', 'ROLE_STORE_OWNER');
        });
        $token = JWTAuth::fromUser($storeOwner);

        $response = $this->json('GET', $this->prefix. '/store-owner', [],[
            'Authorization' => 'Bearer '.$token,
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            ['status'   =>'success',],
            [
                'Employees',
                'Sales',
                'AvailableStocks',
            ]
        ]);

    }
}
