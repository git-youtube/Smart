<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PreguntaTabla extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $table = 'PreguntaTabla';

    protected $fillable = [
        'PreguntaTablaId',
        'IdPregunta',
        'ElementoPregunta',
        'Valor'
    ];
}
?>