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
    Schema::create('Respuestas', function (Blueprint $table) {
    $table->string('Email');
    $table->string('IdPregunta');
    $table->string('Ciudad');
    $table->integer('Año');
    $table->integer('Respuesta');
    
    $table->primary(['Email', 'IdPregunta']);
    $table->foreign('Email')->references('Email')->on('users')->onDelete('cascade');
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
