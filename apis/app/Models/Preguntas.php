<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Preguntas extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $table = 'Preguntas';

    protected $fillable = [
        'Pregunta',
        'PreguntaId',
        'Subdimension',
        'tipoPregunta',
        'maxPregunta'
    ];
}
?>