<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
     /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('series', function (Blueprint $table) {
            $table->unsignedInteger('quantity_of_seasons')->change();
            $table->unsignedInteger('quantity_of_series')->change();
        });

        // Add check constraints using raw SQL
        DB::statement('ALTER TABLE series ADD CONSTRAINT check_quantity_of_seasons CHECK (quantity_of_seasons >= 0)');
        DB::statement('ALTER TABLE series ADD CONSTRAINT check_quantity_of_series CHECK (quantity_of_series >= 0)');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement('ALTER TABLE series DROP CONSTRAINT IF EXISTS check_quantity_of_seasons');
        DB::statement('ALTER TABLE series DROP CONSTRAINT IF EXISTS check_quantity_of_series');

        Schema::table('series', function (Blueprint $table) {
            $table->integer('quantity_of_seasons')->change();
            $table->integer('quantity_of_series')->change();
        });
    }
};
