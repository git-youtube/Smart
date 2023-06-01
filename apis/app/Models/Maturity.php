<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Respuestas;

class Maturity extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'Maturity_levels';
    protected $primaryKey = 'Valor';

    protected $fillable = [
        'id',
        'NombreLevel',
        'Subdimension',
        'MaxPregunta',
        'Valor',
        'Ciudad'
    ];

    public function valores()
    {
        return $this->belongsTo(Maturity::class, 'Ciudad');
    }

    public function respuesta()
{
    return $this->belongsTo(Respuestas::class, 'NombreLevel', 'IdPregunta');
}

    
}
?>