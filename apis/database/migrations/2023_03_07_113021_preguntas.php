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
    Schema::create('Preguntas', function (Blueprint $table) {
    $table->string('Pregunta');
    $table->string('PreguntaId')->primary();
    $table->string('Subdimension');
    $table->string('tipoPregunta');
    $table->integer('maxPregunta');
    
    $table->foreign('Subdimension')->references('Subdimension')->on('Subdimensiones')->onDelete('cascade');
    //$table->foreign('PreguntaId')->references('Question')->on('Questions_Levels')->onDelete('cascade');
    });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('Preguntas');
    }
};
