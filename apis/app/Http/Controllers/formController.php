<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Preguntas;
use App\Models\Elementos;
use App\Models\Respuestas;
use App\Models\Maturity;
use App\Models\Subdimensiones;
use App\Models\Question_Level;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class formController extends Controller
{
    
    public function obtenerPreguntas($subdimension, $email)
    {
        $preguntas = Preguntas::where('subdimension', $subdimension)
            ->whereNotIn('preguntaid', function ($query) use ($email) {
                $query->select('idpregunta')
                    ->from('respuestas')
                    ->where('email', $email);
            })
            ->get()
            ->toArray();
    
        return $preguntas;
    }
    

    public function obtenerRespuestas($subdimension){
        $respuestas = Elementos::where('IdPregunta', $subdimension)->get()->toArray();
        return $respuestas;
    }

    public function store(Request $request)
    {
        $respuesta = new Respuestas();
        $respuesta->email = $request->input('Email');
        $respuesta->Idpregunta = $request->input('IdPregunta');
        $respuesta->ciudad = $request->input('Ciudad');
        $respuesta->año = $request->input('Año');
        $respuesta->respuesta = $request->input('Respuesta');
    
        $respuesta->save();
    
        return response()->json(['message' => 'Respuesta creada correctamente'], 201);
    }

    public function update(Request $request, $id, $email)
    {
        $respuesta = Respuestas::where('idPregunta', $id)->where('email', $email)->first();
    
        if (!$respuesta) {
            return response()->json(['message' => 'No se encontró la respuesta'], 404);
        }
    
        Respuestas::where('idPregunta', $id)->where('email', $email)->update(['respuesta' => $request->input('Respuesta')]);
    
        return response()->json(['message' => 'Respuesta actualizada correctamente'], 200);
    }
    


    public function obtenerTotales($ciudades){
        $sum4 = Maturity::whereIn('subdimension', ['C1','C2'])
            ->where('ciudad', $ciudades)
            ->sum('valor');
        $sum3 = Maturity::whereIn('subdimension', ['I1','I2'])
            ->where('ciudad', $ciudades)
            ->sum('valor');
        $sum1 = Maturity::whereIn('subdimension', ['L1','L2','L3','L4'])
            ->where('ciudad', $ciudades)
            ->sum('valor');
        $sum2 = Maturity::whereIn('subdimension', ['P1','P2'])
            ->where('ciudad', $ciudades)
            ->sum('valor');
        $sum5 = Maturity::whereIn('subdimension', ['U1','E1'])
            ->where('ciudad', $ciudades)
            ->sum('valor');

    
    // Convertir los resultados en enteros
    $sum1 = intval($sum1);
    $sum2 = intval($sum2);
    $sum3 = intval($sum3);
    $sum4 = intval($sum4);
    $sum5 = intval($sum5);

        return response()->json([
            'sum1' => $sum1,
            'sum2' => $sum2,
            'sum3' => $sum3,
            'sum4' => $sum4,
            'sum5' => $sum5,
        ]);
    }
   public function TotalCiudad()
{
    $totalValuesByCity = DB::table('maturity_levels')
    ->select('ciudad', DB::raw('SUM(valor) as total_value'))
    ->groupBy('ciudad')
    ->get();

$percentCompleteByCity = $totalValuesByCity->map(function($city) {
    $percentComplete = ($city->total_value / 122) * 100;
    return [            'ciudad' => $city->ciudad,            'percent_complete' => round($percentComplete, 2)        ];
});

return response()->json($percentCompleteByCity);
}


    
    

    public function obtenerSubdimensiones($dimension)
    {
        $subdimensiones = Subdimensiones::where('dimension', $dimension)->get();
        return response()->json($subdimensiones);
    }
    
    public function sumaSub($constante, $ciudad)
    {
        $sumaValor = Maturity::select(
            'maturity_levels.NombreLevel',
            'preguntas.maxpregunta',
            'respuestas.respuesta'
        )
            ->leftJoin('questions_levels', 'maturity_levels.NombreLevel', '=', 'questions_levels.level')
            ->leftJoin('preguntas', 'questions_levels.question', '=', 'preguntas.preguntaid')
            ->leftJoin('respuestas', function ($join) use ($ciudad) {
                $join->on('preguntas.preguntaid', '=', 'respuestas.idpregunta')
                    ->where('respuestas.ciudad', $ciudad);
            })
            ->where('maturity_levels.ciudad', $ciudad)
            ->where('maturity_levels.subdimension', $constante)
            ->get(['maturity_levels.NombreLevel', 'preguntas.maxpregunta', 'respuestas.respuesta']);
    
        return response()->json($sumaValor);
    }
    

    public function actualizarRespuestasFinales(Request $request,$hash)
    {
        $array = $request->input('array');
        $data = json_decode(json_encode($array), true);

    
        // Actualizar los valores en la base de datos
        for($i=0;$i<count($data);$i++){
            Maturity::where('NombreLevel', $data[$i][0])
                ->where('ciudad', $hash)
                ->update(['Valor' => $data[$i][1]]);
            echo "Actualizando fila con ID: " . $data[$i][0] . " Y valor:". $data[$i][1]." \n";
        }
    
        return response()->json(['message' => 'Datos actualizados exitosamente']);
    }
    
    

public function calcularMedias(){
     // Crear arrays vacíos para cada sección
     $L1 = [];
     $L2 = [];
     $L3 = [];
     $L4 = [];
     $U1 = [];
     $E1 = [];
     $C1 = [];
     $C2 = [];
     $I1 = [];
     $I2 = [];
     $P1 = [];
     $P2 = [];
     // Obtener medias de todas las preguntas
   // Obtener medias de todas las preguntas
   $respuestasPorPregunta = DB::table('respuestas')
   ->select('respuestas.IdPregunta', DB::raw('avg(respuestas.Respuesta) as media'), 'preguntas.maxpregunta')
   ->join('preguntas', 'preguntas.preguntaid', '=', 'respuestas.IdPregunta')
   ->groupBy('respuestas.IdPregunta', 'preguntas.maxpregunta')
   ->get();

     // Agregar las medias correspondientes a cada sección según su ID de pregunta
     foreach ($respuestasPorPregunta as $respuesta) {
        switch ($respuesta->IdPregunta) {
            case 'l1q1':
            case 'l1q2':
            case 'l1q3':
            case 'l1q4':
                $L1[] = [$respuesta->media,$respuesta->maxpregunta];
                break;
            case 'l2q1':
            case 'l2q2':
            case 'l2q3':
            case 'l2q4':
            case 'l2q5':
            case 'l2q6':
                $L2[] = [$respuesta->media,$respuesta->maxpregunta];
                break;
            case 'l3q1':
            case 'l3q2':
            case 'l3q3':
            case 'l3q4':
            case 'l3q5':
            case 'l3q6':
                $L3[] = [$respuesta->media,$respuesta->maxpregunta];
                break;
            case 'l4q1':
            case 'l4q2':
            case 'l4q3':
            case 'l4q4':
            case 'l4q5':
            case 'l4q6':
            case 'l4q7':
            case 'l4q8':
                $L4[] = [$respuesta->media,$respuesta->maxpregunta];
                break;
            case 'u1q1':
            case 'u1q2':
            case 'u1q3':
            case 'u1q4':
            case 'u1q5':
            case 'u1q6':
            case 'u1q7':
            case 'u1q8':
            case 'u1q9':
                $U1[] =[$respuesta->media,$respuesta->maxpregunta];
                break;
            case 'e1q1':
            case 'e1q2':
            case 'e1q3':
            case 'e1q4':
            case 'e1q5':
            case 'e1q6':
            case 'e1q7':
            case 'e1q8':
            case 'e1q9':
                $E1[] = [$respuesta->media,$respuesta->maxpregunta];
                break;
            case 'c1q1':
            case 'c1q2':
            case 'c1q3':
            case 'c1q4':
            case 'c1q5':
            case 'c1q6':
            case 'c1q7':
            case 'c1q8':
            case 'c1q9':
                $C1[] = [$respuesta->media,$respuesta->maxpregunta];
                break;
            case 'c2q1':
            case 'c2q2':
            case 'c2q3':
            case 'c2q4':
            case 'c2q5':
            case 'c2q6':
            case 'c2q7':
            case 'c2q8':
                $C2[] = [$respuesta->media,$respuesta->maxpregunta];
                break;
            case 'i1q1':
            case 'i1q2':
            case 'i1q3':
            case 'i1q4':
            case 'i1q5':
            case 'i1q6':
            case 'i1q7':
            case 'i1q8':
            case 'i1q9':
            case 'i1q10':
            case 'i1q11':
            case 'i1q12':
                $I1[] = [$respuesta->media,$respuesta->maxpregunta];
                break;
            case 'i2q1':
            case 'i2q2':
            case 'i2q3':
            case 'i2q4':
            case 'i2q5':
            case 'i2q6':
            case 'i2q7':
            case 'i2q8':
            case 'i2q9':
            case 'i2q10':
            case 'i2q11':
            case 'i2q12':
            case 'i2q13':
            case 'i2q14':
                $I2[] = [$respuesta->media,$respuesta->maxpregunta];
                break;
            case 'p1q1':
            case 'p1q2':
            case 'p1q3':
            case 'p1q4':
            case 'p1q5':
            case 'p1q6':
            case 'p1q7':
            case 'p1q8':
                $P1[] = [$respuesta->media,$respuesta->maxpregunta];
                break;
            case 'p2q1':
            case 'p2q2':
            case 'p2q3':
            case 'p2q4':
            case 'p2q5':
            case 'p2q6':
            case 'p2q7':
            case 'p2q8':
            case 'p2q9':
            case 'p2q10':
            case 'p2q11':
            case 'p2q12':
                $P2[] = [$respuesta->media,$respuesta->maxpregunta];
                break;
        }
    }
    // Devolver arrays de medias para cada sección
    return [
        'L1' => $L1,
        'L2' => $L2,
        'L3' => $L3,
        'L4' => $L4,
        'U1' => $U1,
        'E1' => $E1,
        'C1' => $C1,
        'C2' => $C2,
        'I1' => $I1,
        'I2' => $I2,
        'P1' => $P1,
        'P2' => $P2,
        // Agregar más secciones según corresponda
    ];
    
}   

public function obtenerGraficaMaturity($constante,$ciudad){
    
    $sumaValor = Maturity::select('maturity_levels.NombreLevel','valor')
        ->where('subdimension', $constante)
        ->where('ciudad', $ciudad) // Agregar la condición de ciudad
        ->get();

    return response()->json($sumaValor);
    
}

public function obtenerTodasMaturity($ciudad){
    
    $sumaValor = Maturity::select('maturity_levels.NombreLevel','valor')
        ->where('ciudad', $ciudad) // Agregar la condición de ciudad
        ->get();

    return response()->json($sumaValor);
    
}

public function obtenerElementosPorEmail($email, $subdimension)
{
    $preguntasConElementos = [];
    $respuestas = DB::table('respuestas')
        ->where('email', '=', $email)
        ->get();

    foreach ($respuestas as $respuesta) {
        $pregunta = DB::table('preguntas')
            ->select('preguntas.pregunta', 'preguntas.PreguntaId')
            ->where('PreguntaId', '=', $respuesta->IdPregunta)
            ->where('subdimension', '=', $subdimension)
            ->first();

        if ($pregunta != null) {
            $elementos = DB::table('elementos')
                ->select('elementos.elemento', 'elementos.IdPregunta', 'elementos.tipoPregunta', 'elementos.Valor')
                ->where('idPregunta', '=', $respuesta->IdPregunta)
                ->get();

            // Obtener el valor de la respuesta seleccionada
            $respuestaSeleccionada = $elementos->where('IdPregunta', $respuesta->IdPregunta)
                ->where('elemento', $respuesta->Respuesta)
                ->first();

            // Guardar la respuesta seleccionada en la tabla "respuestas"
            $respuesta->valor = $respuestaSeleccionada ? $respuestaSeleccionada->Valor : null;

            $preguntasConElementos[] = [
                'pregunta' => $pregunta,
                'elementos' => $elementos,
                'seleccion' => $respuesta,
            ];
        }
    }

    return $preguntasConElementos;
}



public function obtenerCiudad($email){
    
    $ciudad = User::select('City','ProfesionalRole')
        ->where('email', $email)
        ->get();

    return response()->json($ciudad);
    
}

public function obtenerMedias(){
    $ciudades = Maturity::distinct('ciudad')->pluck('ciudad');

    $mediasPorCiudad = [];

    foreach ($ciudades as $ciudad) {
        $count4 = Maturity::whereIn('subdimension', ['C1','C2'])->where('ciudad', $ciudad)->count();
        $count3 = Maturity::whereIn('subdimension', ['I1','I2'])->where('ciudad', $ciudad)->count();
        $count1 = Maturity::whereIn('subdimension', ['L1','L2','L3','L4'])->where('ciudad', $ciudad)->count();
        $count2 = Maturity::whereIn('subdimension', ['P1','P2'])->where('ciudad', $ciudad)->count();
        $count5 = Maturity::whereIn('subdimension', ['U1','U2'])->where('ciudad', $ciudad)->count();
        $count6 = Maturity::whereIn('subdimension', ['E1'])->where('ciudad', $ciudad)->count();

        $sum4 = Maturity::whereIn('subdimension', ['C1','C2'])->where('ciudad', $ciudad)->sum('valor');
        $sum3 = Maturity::whereIn('subdimension', ['I1','I2'])->where('ciudad', $ciudad)->sum('valor');
        $sum1 = Maturity::whereIn('subdimension', ['L1','L2','L3','L4'])->where('ciudad', $ciudad)->sum('valor');
        $sum2 = Maturity::whereIn('subdimension', ['P1','P2'])->where('ciudad', $ciudad)->sum('valor');
        $sum5 = Maturity::whereIn('subdimension', ['U1','U2'])->where('ciudad', $ciudad)->sum('valor');
        $sum6 = Maturity::whereIn('subdimension', ['E1'])->where('ciudad', $ciudad)->sum('valor');

        // Calcular las medias y redondear a 2 decimales
        $avg1 = $count1 > 0 ? round($sum1 / $count1, 2) : 0;
        $avg2 = $count2 > 0 ? round($sum2 / $count2, 2) : 0;
        $avg3 = $count3 > 0 ? round($sum3 / $count3, 2) : 0;
        $avg4 = $count4 > 0 ? round($sum4 / $count4, 2) : 0;
        $avg5 = $count5 > 0 ? round($sum5 / $count5, 2) : 0;
        $avg6 = $count6 > 0 ? round($sum6 / $count6, 2) : 0;

        $mediasPorCiudad[$ciudad] = [
            'avg1' => $avg1,
            'avg2' => $avg2,
            'avg3' => $avg3,
            'avg4' => $avg4,
            'avg5' => $avg5,
            'avg6' => $avg6
        ];
    }

      // Calcular la media de todas las subdimensiones
      $avgTotal = [
        'avg1' => 0,
        'avg2' => 0,
        'avg3' => 0,
        'avg4' => 0,
        'avg5' => 0,
        'avg6' => 0
    ];

    foreach ($mediasPorCiudad as $medias) {
        $avgTotal['avg1'] += $medias['avg1'];
        $avgTotal['avg2'] += $medias['avg2'];
        $avgTotal['avg3'] += $medias['avg3'];
        $avgTotal['avg4'] += $medias['avg4'];
        $avgTotal['avg5'] += $medias['avg5'];
        $avgTotal['avg6'] += $medias['avg6'];
    }

    $totalCiudades = count($ciudades);
    $avgTotal['avg1'] /= $totalCiudades;
    $avgTotal['avg2'] /= $totalCiudades;
    $avgTotal['avg3'] /= $totalCiudades;
    $avgTotal['avg4'] /= $totalCiudades;
    $avgTotal['avg5'] /= $totalCiudades;
    $avgTotal['avg6'] /= $totalCiudades;

    // Agregar la media de todas las subdimensiones al arreglo
    $mediasPorCiudad['avgTotal'] = $avgTotal;

    return response()->json($mediasPorCiudad);
}




};


?>