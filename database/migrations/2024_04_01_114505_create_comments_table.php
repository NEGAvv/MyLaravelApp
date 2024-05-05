<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_user');
            $table->unsignedBigInteger('id_series');
            $table->text('comment')->nullable(false);
            $table->date('date_of_creation')->default(now());
            $table->timestamps();
            
            $table->foreign('id_user')->references('id')->on('users')->onDelete('cascade')->index('fk_comments_users');
            $table->foreign('id_series')->references('id')->on('series')->onDelete('cascade')->index('fk_comments_series');
        });
    }

    public function down()
    {
        Schema::dropIfExists('comments');
    }
};
