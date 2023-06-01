<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subdimensiones extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $table = 'Subdimensiones';

    protected $fillable = [
        'Subdimension',
        'Dimension'
    ];

}
?>