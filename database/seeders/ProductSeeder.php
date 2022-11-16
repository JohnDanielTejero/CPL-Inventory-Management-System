<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('products')->insert([
            'Product_Name' => 'Sample Product 1',
            'Product_Desc' => 'Sample Product Not for Production',
            'Product_Price' => '5000',
            'Product_Paid' => '50',
            'Product_Payable' => '10',
            'Product_Markup' => '20',
            'Product_Image' => 'https://via.placeholder.com/300C/O%20https://placeholder.com/',
            'Product_Expiry' => date_create("now"),
            'Supplier_Id' => '1',
            'Category_Id' => '3'
        ]);

        DB::table('products')->insert([
            'Product_Name' => 'Sample Product 2',
            'Product_Desc' => 'Sample Product Not for Production',
            'Product_Price' => '4000',
            'Product_Paid' => '30',
            'Product_Payable' => '50',
            'Product_Markup' => '20',
            'Product_Image' => 'https://via.placeholder.com/300C/O%20https://placeholder.com/',
            'Product_Expiry' => date_create("now"),
            'Supplier_Id' => '2',
            'Category_Id' => '2'
        ]);

        DB::table('products')->insert([
            'Product_Name' => 'Sample Product 3',
            'Product_Desc' => 'Sample Product Not for Production',
            'Product_Price' => '6000',
            'Product_Paid' => '50',
            'Product_Payable' => '0',
            'Product_Markup' => '20',
            'Product_Image' => 'https://via.placeholder.com/300C/O%20https://placeholder.com/',
            'Product_Expiry' => date_create("now"),
            'Supplier_Id' => '3',
            'Category_Id' => '1'
        ]);

        DB::table('products')->insert([
            'Product_Name' => 'Sample Product 4',
            'Product_Desc' => 'Sample Product Not for Production',
            'Product_Price' => '6000',
            'Product_Paid' => '50',
            'Product_Payable' => '0',
            'Product_Markup' => '20',
            'Product_Image' => 'https://via.placeholder.com/300C/O%20https://placeholder.com/',
            'Product_Expiry' => date_create("now"),
            'Supplier_Id' => '3',
            'Category_Id' => '1'
        ]);
    }
}
