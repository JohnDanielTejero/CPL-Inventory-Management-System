<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StoreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('stores')->insert([
            'Store_Name' => 'Jumpstart Antipolo Branch',
            'Store_Address' => '36, Timberland Avenue, Timberland Heights, Antipolo, Rizal',
        ]);

        DB::table('stores')->insert([
            'Store_Name' => 'Jumpstart Muntinlupa Branch',
            'Store_Address' => '36, Susana Heights Avenue, Muntinlupa',
        ]);

        DB::table('stores')->insert([
            'Store_Name' => 'Jumpstart Laguna Branch',
            'Store_Address' => '23, Whitney, San Pedro, Laguna',
        ]);

        DB::table('stores')->insert([
            'Store_Name' => 'Jumpstart Quezon City Branch',
            'Store_Address' => '128, Anonas Extension, Quezon City',
        ]);

        DB::table('stores')->insert([
            'Store_Name' => 'Jumpstart Taguig Branch',
            'Store_Address' => ' 27, Maple, Taguig',
        ]);

        DB::table('stores')->insert([
            'Store_Name' => 'Jumpstart Parañaquez Branch',
            'Store_Address' => '48, Alabastro, Parañaque',
        ]);

    }
}
