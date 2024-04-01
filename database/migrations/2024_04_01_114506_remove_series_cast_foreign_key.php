<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        // Schema::table('series_cast', function (Blueprint $table) {
        //     $table->dropForeign(['id_series']);
        // });
    }

    public function down()
    {
        // Schema::table('series_cast', function (Blueprint $table) {
        //     $table->foreign('id_series')->references('id')->on('series')->onDelete('cascade');
        // });
    }
};
