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
    Schema::create('Questions_Levels', function (Blueprint $table) {
    $table->string('Question');
    $table->string('Level');

    $table->foreign('Question')->references('PreguntaId')->on('Preguntas')->onDelete('cascade');
    $table->foreign('Level')->references('NombreLevel')->on('maturity_levels')->onDelete('cascade');
    });
    }
   
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
};
