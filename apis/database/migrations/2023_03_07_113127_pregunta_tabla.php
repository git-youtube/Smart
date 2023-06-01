<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
    Schema::create('PreguntasTabla', function (Blueprint $table) {
    $table->increments('PreguntaTablaId');
    $table->string('IdPregunta');
    $table->string('ElementoPregunta');
    $table->integer('Valor');
    
    $table->unique(['PreguntaTablaId', 'IdPregunta']);
    $table->foreign('IdPregunta')->references('PreguntaId')->on('Preguntas')->onDelete('cascade');
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
