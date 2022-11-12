<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stocks', function (Blueprint $table) {
            $table->id('stock_id');
            $table->string('Stock_Quantity');
            $table->string('Stock_Status');
            $table->unsignedBigInteger('Store_Id');
            $table->unsignedBigInteger('Product_Id');
            $table->foreign('Store_Id')->references('stores_id')->on('stores')->onDelete('cascade');
            $table->foreign('Product_Id')->references('product_id')->on('products')->onDelete('cascade');
            $table->unique(['Store_Id', 'Product_Id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('stocks');
    }
};
