<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Maturity_levels;

class cityController extends Controller
{

    public function obtenerCiudades() {
        $ciudades = Maturity_levels::all()->toArray();
        return $ciudades;
    }

}
