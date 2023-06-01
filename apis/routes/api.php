<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\formController;
use App\Http\Controllers\cityController;

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');

});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(cotizacionController::class)->group(function (){
    Route::get('datos', 'datos');
    Route::get('update', 'update');
});

Route::post('insertar',  [formController::class,'store']);

Route::get('respuestas/{subdimension}', [formController::class,'obtenerRespuestas']);

Route::get('preguntas/{preguntaId}/{email}', [formController::class,'obtenerPreguntas']);
//Route::get('datos', [cotizacionController::class, 'datos']);

Route::get('global/{ciudad}',  [formController::class,'obtenerTotales']);

Route::get('subdi/{dimension}',  [formController::class,'obtenerSubdimensiones']);

Route::get('sumdi/{dimension}/{ciudad}',  [formController::class,'sumaSub']);

Route::get('ciudades', [cityController::class,'obtenerCiudades']);

Route::get('total',  [formController::class,'TotalCiudad']);

Route::post('update/{hash}', [formController::class, 'actualizarRespuestasFinales']);

Route::get('medias',  [formController::class,'calcularMedias']);

Route::get('graficaMaturity/{dimension}/{ciudad}',  [formController::class,'obtenerGraficaMaturity']);

Route::get('updateRespuestas/{email}/{subdimension}',  [formController::class,'obtenerElementosPorEmail']);

Route::put('actualizar/{id}/{email}',  [formController::class,'update']);

Route::get('obtenerCiudad/{email}',  [formController::class,'obtenerCiudad']);

Route::get('graficaMaturityAll/{ciudad}',  [formController::class,'obtenerTodasMaturity']);

Route::get('mediasCiudades',  [formController::class,'obtenerMedias']);