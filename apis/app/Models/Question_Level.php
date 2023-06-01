<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question_Level extends Model
{
    use HasFactory;

    protected $table = 'questions_levels';

    protected $fillable = [
        'Question',
        'Level'
    ];
}
