<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Testing\WithFaker;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Illuminate\Foundation\Testing\RefreshDatabase;

class SupplierController extends TestCase
{
    private $prefix = '/api/suppliers';

    public function test_all_suppliers()
    {
        $admin = User::whereHas('User_Roles', function (Builder $query){
            $query->where('Role_Name', 'ROLE_ADMIN');
        })->first();

        $token = JWTAuth::fromUser($admin);

        $response = $this->json('GET', $this->prefix."/all-suppliers", [], [
            "Authorization" => "Bearer " . $token,
        ]);
        $response->assertStatus(200);

    }

    public function test_supplier_create()
    {
        $admin = User::whereHas('User_Roles', function (Builder $query){
            $query->where('Role_Name', 'ROLE_ADMIN');
        })->first();

        $token = JWTAuth::fromUser($admin);

        $response = $this->json('POST', $this->prefix."/add-supplier", [
            'Supp_Name' => "Test Supplier",
            'Supp_Email' => "testsupplier@gmail.com",
            'Supp_ContactNo' => "+63 939 841 6091"
        ], [
            "Authorization" => "Bearer ". $token,
        ]);
    }

    public function test_supplier_edit()
    {
        $admin = User::whereHas('User_Roles', function (Builder $query){
            $query->where('Role_Name', 'ROLE_ADMIN');
        })->first();

        $token = JWTAuth::fromUser($admin);

        $response = $this->json('PATCH', $this->prefix."/update-supplier/1", [
            'Supp_Name' => "Update Supplier",
            'Supp_Email' => "testsupplier@gmail.com",
            'Supp_ContactNo' => "+63 939 223 2111",
        ],[
            "Authorization" => "Bearer ". $token,
        ]);

        $response->assertStatus(200);
    }

    public function test_supplier_delete()
    {
        $admin = User::whereHas('User_Roles', function (Builder $query){
            $query->where('Role_Name', 'ROLE_ADMIN');
        })->first();

        $token = JWTAuth::fromUser($admin);

        $response = $this->json('DELETE', $this->prefix."/delete-supplier/4", [], [
            "Authorization" => "Bearer ". $token,
        ]);

        $response->assertStatus(200);
    }
}
