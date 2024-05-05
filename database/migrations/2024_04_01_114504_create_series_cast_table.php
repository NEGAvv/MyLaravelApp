<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('series_casts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_series');
            $table->unsignedBigInteger('id_actor');
            $table->foreign('id_series')->references('id')->on('series')->onDelete('cascade')->index('fk_series_casts_series');
            $table->foreign('id_actor')->references('id')->on('actors')->onDelete('cascade')->index('fk_series_casts_actors');
            $table->timestamps();
        });
        
    }

    public function down()
    {
        Schema::dropIfExists('series_casts');
    }
};
