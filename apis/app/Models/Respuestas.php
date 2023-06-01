<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Respuestas extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'Respuestas';
    protected $primaryKey = 'IdPregunta';

    protected $keyType = 'string'; // Definir el tipo de datos de la clave primaria como cadena de texto

    protected $fillable = [
        'Email',
        'IdPregunta',
        'Ciudad',
        'Año',
        'Respuesta'
    ];
}

?>