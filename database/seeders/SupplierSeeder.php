<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SupplierSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('suppliers')->insert([
            'Supp_Name' => 'Aysus',
            'Supp_Email' => 'aysus@gmail.com',
            'Supp_ContactNo' => '+63 932 032 1234',
        ]);

        DB::table('suppliers')->insert([
            'Supp_Name' => 'FunTech',
            'Supp_Email' => 'funTech@gmail.com',
            'Supp_ContactNo' => '+91 213 231 2331',
        ]);

        DB::table('suppliers')->insert([
            'Supp_Name' => 'Switch it Up',
            'Supp_Email' => 'swp@gmail.com',
            'Supp_ContactNo' => '+23 232 212 2131',
        ]);

        DB::table('suppliers')->insert([
            'Supp_Name' => 'CaseCold',
            'Supp_Email' => 'cc@gmail.com',
            'Supp_ContactNo' => '+43 533 234 5567',
        ]);
    }
}
