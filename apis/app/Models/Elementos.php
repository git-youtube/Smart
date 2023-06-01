<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Elementos extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $table = 'Elementos';

    protected $fillable = [
        'Elemento',
        'IdPregunta',
        'tipoPregunta',
        'Valor',
        'ElementoId'
    ];

}
?>