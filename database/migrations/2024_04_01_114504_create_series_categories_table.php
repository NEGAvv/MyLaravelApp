<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('series_categories', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_series');
            $table->unsignedBigInteger('id_category');
            $table->foreign('id_series')->references('id')->on('series')->onDelete('cascade')->index('fk_series_categories_series');
            $table->foreign('id_category')->references('id')->on('categories')->onDelete('cascade')->index('fk_series_categories_categories');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('series_categories');
    }
};
