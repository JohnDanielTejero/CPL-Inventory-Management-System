<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Database\Query\Builder;
use Illuminate\Foundation\Testing\WithFaker;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\RefreshDatabaseState;

class ProductsController extends TestCase
{
    private $prefix =  'api/products';
    /**
     * Test to view all products
     *
     * @return void
     */
    public function test_view_all_products()
    {
        $admin = User::whereHas('User_Roles', function (Builder $query){
            $query->where('Role_Name', 'ROLE_ADMIN');
        })->first();

        $token = JWTAuth::fromUser($admin);

        $response = $this->json('GET', $this->prefix. '/all', [], [
            'Authorization' => "Bearer $token",
        ]);

        $response->assertStatus(200);
    }

    public function test_view_product()
    {
        $admin = User::whereHas('User_Roles', function (Builder $query){
            $query->where('Role_Name', 'ROLE_ADMIN');
        })->first();

        $token = JWTAuth::fromUser($admin);

        $response = $this->json('GET', $this->prefix. '/product/1', [], [
            'Authorization' => "Bearer $token",
        ]);
        $response->assertStatus(200);
    }

    public function test_create_product()
    {
        $admin = User::whereHas('User_Roles', function (Builder $query){
            $query->where('Role_Name', 'ROLE_ADMIN');
        })->first();

        $token = JWTAuth::fromUser($admin);

        $response = $this->json('POST', $this->prefix. '/add-product', [
            'Product_Name' => 'Test Product Name',
            'Product_Desc' => 'Test Product Description',
            'Product_Price' => 10,
            'Product_Markup' => 20,
            'Product_Image' => UploadedFile::fake()->image('meal.jpg'),
            'supplier' => 1,
            'category' => 1
        ],[
            'Authorization' => "Bearer $token",
        ]);

        $response->assertStatus(200);
    }


    public function test_edit_product()
    {
        $admin = User::whereHas('User_Roles', function (Builder $query){
            $query->where('Role_Name', 'ROLE_ADMIN');
        })->first();

        $token = JWTAuth::fromUser($admin);

        $response = $this->json('PATCH', $this->prefix. '/edit-product/1', [
            'Product_Name' => 'Update Product Name',
            'Product_Desc' => 'Update Product Description',
            'Product_Price' => 5.,
            'Product_Markup' => 30,
        ],[
            "Authorization" => "Bearer $token",
        ]);

        $response->assertStatus(200);
    }

    public function test_add_payable()
    {
        $admin = User::whereHas('User_Roles', function (Builder $query){
            $query->where('Role_Name', 'ROLE_ADMIN');
        });
        $token = JWTAuth::fromUser($admin);

        $response = $this->json('PUT', $this->prefix. '/add-payable/1', [
            'add_payable' => 30,
        ],[
            "Authorization" => "Bearer $token",
        ]);

        $response->assertStatus(200);
    }

    public function test_add_paid()
    {
        $admin = User::whereHas('User_Roles', function (Builder $query){
            $query->where('Role_Name', 'ROLE_ADMIN');
        });

        $token = JWTAuth::fromUser($admin);

        $response = $this->json('PUT', $this->prefix. '/add-paid/1', [
            'add_paid' => 20,
        ],[
            "Authorization" => "Bearer $token",
        ]);

        $response->assertStatus(200);
    }

    public function test_delete_product()
    {
        $admin = User::whereHas('User_Roles', function (Builder $query){
            $query->where('Role_Name', 'ROLE_ADMIN');
        })->first();

        $token = JWTAuth::fromUser($admin);

        $response = $this->json('DELETE', $this->prefix. '/delete-product/1', [], [
            "Authorization" =>  'Bearer '.$token,
        ]);

        $response->assertStatus(200);
    }
}
