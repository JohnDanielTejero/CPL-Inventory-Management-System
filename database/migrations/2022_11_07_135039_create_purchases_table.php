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
        Schema::create('purchases', function (Blueprint $table) {
            $table->id('purchase_id');
            $table->string('Purchase_By');
            $table->string('Purchase_Payable');
            $table->dateTime('Purchase_Date');
            $table->unsignedBigInteger('store_id');
            $table->foreign('store_id')->references('stores_id')->on('stores')->onDelete('cascade');
            //$table->foreign('Store_Id')->references('stores_id')->on('stores')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('purchases');
    }
};
