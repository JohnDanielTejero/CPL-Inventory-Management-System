<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;

class PopulateTable extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'generate:starterdata';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate starter data, such as role, stores, etc.';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {

        Artisan::call('db:seed --class=RoleSeeder');
        echo "roles data generated at ".date("Y, M, d h:i:sa")."\n";
        Artisan::call('db:seed --class=StoreSeeder');
        echo "store data generated at ".date("Y, M, d h:i:sa")."\n";
        Artisan::call('db:seed --class=AdminSeeder');
        echo "admin data generated at ".date("Y, M, d h:i:sa")."\n";
        Artisan::call('db:seed --class=UserSeeder');
        echo "user data generated at ".date("Y, M, d h:i:sa")."\n";
        Artisan::call('db:seed --class=SampleCategory');
        echo "category data generated at ".date("Y, M, d h:i:sa")."\n";
        Artisan::call('db:seed --class=SupplierSeeder');
        echo "supplier data generated at ".date("Y, M, d h:i:sa")."\n";

        Log::info('starter data generated successfully at'.date("Y, M, d h:i:sa"));
        echo 'starter data generated successfully at '.date("Y, M, d h:i:sa");

        return Command::SUCCESS;
    }
}
