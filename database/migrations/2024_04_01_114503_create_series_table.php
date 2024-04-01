<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('series', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('quantity_of_series');
            $table->float('rating');
            $table->integer('quantity_of_seasons');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('series');
    }
};