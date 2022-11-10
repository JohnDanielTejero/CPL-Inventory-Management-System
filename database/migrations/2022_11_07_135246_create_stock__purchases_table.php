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
        Schema::create('stock__purchases', function (Blueprint $table) {
            $table->unsignedBigInteger('stock_id');
            $table->unsignedBigInteger('purchase_id');
            $table->integer('quantity');
            $table->foreign('stock_id')->references('stock_id')->on('stocks')->onDelete('cascade');
            $table->foreign('purchase_id')->references('purchase_id')->on('purchases')->onDelete('cascade');
            $table->primary(['stock_id', 'purchase_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('stock__purchases');
    }
};
