<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class CategoryControllerTest extends TestCase
{
    private $prefix = "/api/category";

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_get_categories()
    {
        $admin = User::whereHas('User_Roles', function (Builder $query){
            $query->where('Role_Name', 'ROLE_ADMIN');
        })->first();
        $token = JWTAuth::fromUser($admin);

        $response = $this->json('GET', $this->prefix. '/categories', [], [
            'Authorization' => 'Bearer '.$token
        ]);

        $response->assertStatus(200);
    }

    /**
     * test add category.
     *
     * @return void
     */
    public function test_add_category()
    {
        $admin = User::whereHas('User_Roles', function (Builder $query){
            $query->where('Role_Name', 'ROLE_ADMIN');
        })->first();

        $token = JWTAuth::fromUser($admin);

        $response = $this->json('POST', $this->prefix. '/add-category', [
            "Category_Name" => 'TestName',
            'Category_Desc' => 'Some test description',
        ], [
            "Authorization" => 'Bearer '.$token,
        ]);

        $response->assertStatus(201);
    }

    /**
     * test category information
     *
     * @return void
     */
    public function test_category_information()
    {
        $admin = User::whereHas('User_Roles', function (Builder $query){
            $query->where('Role_Name', 'ROLE_ADMIN');
        })->first();

        $token = JWTAuth::fromUser($admin);

        $response = $this->json('GET', $this->prefix. '/category-information/4', [], [
            'Authorization' => 'Bearer '.$token,
        ]);

        $response->assertStatus(200);
    }

    /**
     * test update category.
     *
     * @return void
     */
    public function test_update_category()
    {
        $admin = User::whereHas('User_Roles', function (Builder $query){
            $query->where('Role_Name', 'ROLE_ADMIN');
        })->first();

        $token = JWTAuth::fromUser($admin);

        $response = $this->json('PATCH', $this->prefix. '/update-category/4',[
            'Category_Name' => 'Update Name',
            'Category_Desc' => 'Update Description',
        ],[
            'Authorization' => 'Bearer '.$token,
        ]);

        $response->assertStatus(200);
    }

    /**
     * test delete category.
     *
     * @return void
     */
    public function test_delete_category()
    {
        $admin = User::whereHas('User_Roles', function (Builder $query){
            $query->where('Role_Name', 'ROLE_ADMIN');
        })->first();

        $token = JWTAuth::fromUser($admin);

        $response = $this->json('DELETE', $this->prefix. '/delete-category/4',[],[
            'authorization' => 'Bearer '.$token,
        ]);

        $response->assertStatus(200);
    }
}
