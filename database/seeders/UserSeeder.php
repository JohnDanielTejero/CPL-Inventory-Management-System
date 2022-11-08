<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\Store;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //store 1
        $storeOwner1 = new User();
        $storeOwner1->fill([
            'first_name' => 'John',
            'last_name' => 'Smith',
            'email' => 'jsmith@gmail.com',
            'password' => bcrypt('wasd'),
        ]);
        $storeOwner1->store()->associate(Store::find(1));
        $storeOwner1->save();
        $storeOwner1->User_Roles()->attach(Role::where('Role_Name', 'ROLE_STORE_OWNER')->first());

        //employees
        $storeEmployee1 = new User();
        $storeEmployee1->fill([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'johndoe@gmail.com',
            'password' => bcrypt('wasd'),
        ]);

        $storeEmployee1->store()->associate(Store::find(1));
        $storeEmployee1->save();
        $storeEmployee1->User_Roles()->attach(Role::where('Role_Name', 'ROLE_EMPLOYEE')->first());

        $storeEmployee2 = new User();
        $storeEmployee2->fill([
            'first_name' => 'Aliyah',
            'last_name' => 'Reid',
            'email' => 'areid@gmail.com',
            'password' => bcrypt('wasd'),
        ]);

        $storeEmployee2->store()->associate(Store::find(1));
        $storeEmployee2->save();
        $storeEmployee2->User_Roles()->attach(Role::where('Role_Name', 'ROLE_EMPLOYEE')->first());

        //store 2
        $storeOwner2 = new User();
        $storeOwner2->fill([
            'first_name' => 'Jollyn',
            'last_name' => 'Brianna',
            'email' => 'jbri@gmail.com',
            'password' => bcrypt('wasd'),
        ]);
        $storeOwner2->store()->associate(Store::find(2));
        $storeOwner2->save();
        $storeOwner2->User_Roles()->attach(Role::where('Role_Name', 'ROLE_STORE_OWNER')->first());

        //employees
        $storeEmployee3 = new User();
        $storeEmployee3->fill([
            'first_name' => 'Arthur',
            'last_name' => 'Leywin',
            'email' => 'Aleywin@gmail.com',
            'password' => bcrypt('wasd'),
        ]);

        $storeEmployee3->store()->associate(Store::find(2));
        $storeEmployee3->save();
        $storeEmployee3->User_Roles()->attach(Role::where('Role_Name', 'ROLE_EMPLOYEE')->first());

        $storeEmployee4 = new User();
        $storeEmployee4->fill([
            'first_name' => 'Sanders',
            'last_name' => 'Joshua',
            'email' => 'jsanders@gmail.com',
            'password' => bcrypt('wasd'),
        ]);

        $storeEmployee4->store()->associate(Store::find(2));
        $storeEmployee4->save();
        $storeEmployee4->User_Roles()->attach(Role::where('Role_Name', 'ROLE_EMPLOYEE')->first());

    }
}
