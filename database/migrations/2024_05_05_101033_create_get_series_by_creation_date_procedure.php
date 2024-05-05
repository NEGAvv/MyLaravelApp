<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateGetSeriesByCreationDateProcedure extends Migration
{
     /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::unprepared('
            CREATE OR REPLACE FUNCTION SelectDataAsc()
            RETURNS TABLE (
                id bigint,
                id_user bigint,
                name character varying,
                description character varying(500),
                quantity_of_series integer,
                rating float,
                quantity_of_seasons integer,
                date_of_creation date,
                img_url character varying,
                created_at timestamp without time zone,
                updated_at timestamp without time zone
            ) AS $$
            BEGIN
                RETURN QUERY SELECT * FROM series ORDER BY date_of_creation ASC;
            END;
            $$ LANGUAGE plpgsql;
        ');

        DB::unprepared('
            CREATE OR REPLACE FUNCTION SelectDataDesc()
            RETURNS TABLE (
                id bigint,
                id_user bigint,
                name character varying,
                description character varying(500),
                quantity_of_series integer,
                rating float,
                quantity_of_seasons integer,
                date_of_creation date,
                img_url character varying,
                created_at timestamp without time zone,
                updated_at timestamp without time zone
            ) AS $$
            BEGIN
                RETURN QUERY SELECT * FROM series ORDER BY date_of_creation DESC;
            END;
            $$ LANGUAGE plpgsql;
        ');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::unprepared('DROP FUNCTION IF EXISTS SelectDataAsc');
        DB::unprepared('DROP FUNCTION IF EXISTS SelectDataDesc');
    }
};
