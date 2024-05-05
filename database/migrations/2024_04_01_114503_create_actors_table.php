<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('actors', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable(false)->index();
            $table->string('role');
            $table->string('biography');
            $table->date('birth_date')->between('1900-01-01', now());
            $table->string('gender');
            $table->string('nationality');
            $table->string('img_url');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('actors');
    }
};
