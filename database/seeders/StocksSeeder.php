<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StocksSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('stocks')->insert([
            'Stock_Quantity' => 20,
            'Stock_Status' => 'Available',
            'Store_Id' => 1,
            'Product_Id' => 1,
        ]);

        DB::table('stocks')->insert([
            'Stock_Quantity' => 20,
            'Stock_Status' => 'Available',
            'Store_Id' => 2,
            'Product_Id' => 1,
        ]);

        DB::table('stocks')->insert([
            'Stock_Quantity' => 20,
            'Stock_Status' => 'Available',
            'Store_Id' => 3,
            'Product_Id' => 1,
        ]);

        DB::table('stocks')->insert([
            'Stock_Quantity' => 20,
            'Stock_Status' => 'Available',
            'Store_Id' => 4,
            'Product_Id' => 1,
        ]);

        DB::table('stocks')->insert([
            'Stock_Quantity' => 20,
            'Stock_Status' => 'Available',
            'Store_Id' => 5,
            'Product_Id' => 1,
        ]);

        DB::table('stocks')->insert([
            'Stock_Quantity' => 20,
            'Stock_Status' => 'Available',
            'Store_Id' => 6,
            'Product_Id' => 1,
        ]);

        DB::table('stocks')->insert([
            'Stock_Quantity' => 20,
            'Stock_Status' => 'Available',
            'Store_Id' => 1,
            'Product_Id' => 2,
        ]);

        DB::table('stocks')->insert([
            'Stock_Quantity' => 20,
            'Stock_Status' => 'Available',
            'Store_Id' => 2,
            'Product_Id' => 2,
        ]);

        DB::table('stocks')->insert([
            'Stock_Quantity' => 20,
            'Stock_Status' => 'Available',
            'Store_Id' => 3,
            'Product_Id' => 2,
        ]);

        DB::table('stocks')->insert([
            'Stock_Quantity' => 20,
            'Stock_Status' => 'Available',
            'Store_Id' => 4,
            'Product_Id' => 2,
        ]);

        DB::table('stocks')->insert([
            'Stock_Quantity' => 20,
            'Stock_Status' => 'Available',
            'Store_Id' => 5,
            'Product_Id' => 2,
        ]);

        DB::table('stocks')->insert([
            'Stock_Quantity' => 20,
            'Stock_Status' => 'Available',
            'Store_Id' => 6,
            'Product_Id' => 2,
        ]);

        DB::table('stocks')->insert([
            'Stock_Quantity' => 20,
            'Stock_Status' => 'Available',
            'Store_Id' => 1,
            'Product_Id' => 3,
        ]);

        DB::table('stocks')->insert([
            'Stock_Quantity' => 20,
            'Stock_Status' => 'Available',
            'Store_Id' => 2,
            'Product_Id' => 3,
        ]);

        DB::table('stocks')->insert([
            'Stock_Quantity' => 20,
            'Stock_Status' => 'Available',
            'Store_Id' => 3,
            'Product_Id' => 3,
        ]);

        DB::table('stocks')->insert([
            'Stock_Quantity' => 20,
            'Stock_Status' => 'Available',
            'Store_Id' => 4,
            'Product_Id' => 3,
        ]);

        DB::table('stocks')->insert([
            'Stock_Quantity' => 20,
            'Stock_Status' => 'Available',
            'Store_Id' => 5,
            'Product_Id' => 3,
        ]);

        DB::table('stocks')->insert([
            'Stock_Quantity' => 20,
            'Stock_Status' => 'Available',
            'Store_Id' => 6,
            'Product_Id' => 3,
        ]);
    }
}
