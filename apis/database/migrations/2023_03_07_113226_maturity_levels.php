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
Schema::create('Maturity_levels', function (Blueprint $table) {
$table->string('NombreLevel');
$table->string('Subdimension');
$table->integer('MaxPregunta');
$table->integer('Valor');
$table->string('Ciudad');

$table->primary(['NombreLevel', 'Subdimension', 'Ciudad']);
$table->foreign('Subdimension')->references('Subdimension')->on('Subdimensiones')->onDelete('cascade');
});
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('Maturity_Levels');
    }
};
