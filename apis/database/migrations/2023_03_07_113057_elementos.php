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
        Schema::create('Elementos', function (Blueprint $table) {
            $table->increments('ElementoId');
            $table->string('Elemento');
            $table->string('IdPregunta');
            $table->string('tipoPregunta');
            $table->integer('Valor');
    
            $table->unique(['ElementoId', 'IdPregunta', 'Valor']);
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
