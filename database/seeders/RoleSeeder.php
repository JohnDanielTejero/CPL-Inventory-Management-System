<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->insert([
            'Role_Name' => 'ROLE_ADMIN',
            'Role_Desc' => 'Admin role for the inventory management. has access to: Products/Category/Dashboard/Employee/Suppliers/Stores/Stocks',
        ]);

        DB::table('roles')->insert([
            'Role_Name' => 'ROLE_STORE_OWNER',
            'Role_Desc' => 'Store owner role for the inventory management. has access to: Sales/Employee/Dashboard/Stocks',
        ]);

        DB::table('roles')->insert([
            'Role_Name' => 'ROLE_EMPLOYEE',
            'Role_Desc' => 'Employee role for the inventory management has access to: Sales/Stocks',
        ]);
    }
}
