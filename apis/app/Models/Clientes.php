<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clientes extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $table = 'Clientes';

    protected $fillable = [
        'Email',
        'ProfesionalRole',
        'YearsOfExperience',
        'mainChallenges'
    ];


}
?>