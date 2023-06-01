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
    Schema::create('Clientes', function (Blueprint $table) {
    $table->string('Email')->primary();
    $table->string('ProfesionalRole');
    $table->integer('YearsOfExperience');
    $table->string('mainChallenges');
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('Clientes');
    }
};
