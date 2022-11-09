<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class SampleCategory extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('categories')->insert([
            'Category_Name' => 'consumables',
            'Category_Desc' => 'this is a category for consumables. This is general and will not be used for production, cosmetics, drinks, etc. should be used instead for specifics',
        ]);

        DB::table('categories')->insert([
            'Category_Name' => 'necessities',
            'Category_Desc' => 'this is a category for necessities. This is general and will not be used for production, cosmetics, clothing, appliances, etc. should be used for specifics',
        ]);

        DB::table('categories')->insert([
            'Category_Name' => 'miscellaneous',
            'Category_Desc' => 'this is a category for miscellaneous. This is general and will not be used for production, toys, precaution equipments, etc. should be used for specifics.',

        ]);
    }
}
