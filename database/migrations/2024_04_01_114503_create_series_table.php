<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
// use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up()
    {
        // Schema::create('series', function (Blueprint $table) {
        //     $table->id();
        //     $table->unsignedBigInteger('id_user');
        //     $table->foreign('id_user')->references('id')->on('users')->onDelete('cascade')->index();
        //     $table->string('name')->nullable(false)->index();
        //     $table->string('description', 500);
        //     $table->integer('quantity_of_series')->unsigned(); 
        //     $table->float('rating')->unsigned(); 
        //     $table->integer('quantity_of_seasons')->unsigned(); 
        //     $table->date('date_of_creation');
        //     $table->string('img_url');
        //     $table->timestamps();
        // });
    }

    public function down()
    {
        // Schema::dropIfExists('series');
    }
};
