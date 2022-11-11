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
        Schema::create('products', function (Blueprint $table) {
            $table->id('product_id');
            $table->string('Product_Name');
            $table->string('Product_Desc');
            $table->string('Product_Price');
            $table->integer('Product_Paid')->nullable();
            $table->integer('Product_Payable')->nullable();
            $table->integer('Product_Markup');
            $table->text('Product_Image');
            $table->dateTime('Product_Expiry')->nullable();
            $table->foreignId('Supplier_Id')->onDelete('cascade');
            $table->foreignId('Category_Id')->nullOnDelete()->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
};
