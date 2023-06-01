
var desplaza = -1;
var diferencial=0;
var porcentaje = 0;
var anterior=false;
var posterior=false;
var resultados = [];
var idResp = [];
idPreg = [];
var check=[];
const Completeness = [
  "Leadership & Governance",
  "Preparedness",
  "Structure & Resources",
  "Cooperation",
  "Urban Development & Environmental"
]
const preguntas = [];

const preguntaIds = [];

// Array para los valores de Elemento
const elementos = [];

// Array para los valores de Valor
const valores = [];

const respuestasIds = [];

const respuestasTipo = [];

var update=false


// Event listener para el elemento con ID 'laravel'
document.getElementById('laravel').addEventListener('click', function() {
  // Verificar si la casilla 'defaultCheck1' está marcada
  if (document.getElementById('defaultCheck1').checked) {
    subdiRespuestas('L'); // Llamar a la función 'subdiRespuestas' con argumento 'L'
  } else {
    getSubdi('L'); // Llamar a la función 'getSubdi' con argumento 'L'
  }
});

// Event listener para el elemento con ID 'php'
document.getElementById('php').addEventListener('click', function() {
  // Verificar si la casilla 'defaultCheck1' está marcada
  if (document.getElementById('defaultCheck1').checked) {
    subdiRespuestas('p'); // Llamar a la función 'subdiRespuestas' con argumento 'p'
  } else {
    getSubdi('P'); // Llamar a la función 'getSubdi' con argumento 'P'
  }
});

// Event listener para el elemento con ID 'sql'
document.getElementById('sql').addEventListener('click', function() {
  // Verificar si la casilla 'defaultCheck1' está marcada
  if (document.getElementById('defaultCheck1').checked) {
    subdiRespuestas('I'); // Llamar a la función 'subdiRespuestas' con argumento 'I'
  } else {
    getSubdi('I'); // Llamar a la función 'getSubdi' con argumento 'I'
  }
});

// Event listener para el elemento con ID 'csharp'
document.getElementById('csharp').addEventListener('click', function() {
  // Verificar si la casilla 'defaultCheck1' está marcada
  if (document.getElementById('defaultCheck1').checked) {
    subdiRespuestas('C'); // Llamar a la función 'subdiRespuestas' con argumento 'C'
  } else {
    getSubdi('C'); // Llamar a la función 'getSubdi' con argumento 'C'
  }
});

// Event listener para el elemento con ID 'unity'
document.getElementById('unity').addEventListener('click', function() {
  // Verificar si la casilla 'defaultCheck1' está marcada
  if (document.getElementById('defaultCheck1').checked) {
    subdiRespuestas('U'); // Llamar a la función 'subdiRespuestas' con argumento 'U'
  } else {
    getSubdi('U'); // Llamar a la función 'getSubdi' con argumento 'U'
  }
});


function ponerRespuestas(i) {
  for (let j = 0; j < elementos.length; j++) {
    if (respuestasIds[j] == preguntaIds[desplaza]) {
      console.log(respuestasIds[j]);
      // Agregar elementos de respuesta al elemento con el ID correspondiente
      document.getElementById('' + respuestasIds[j] + '').innerHTML += '<input class="form-check-input" type="' + respuestasTipo[j] + '" value=' + valores[j] + ' name="' + respuestasIds[j] + '" id="' + (j + 1) + '"' + (check[j] ? ' checked' : '') + '><label class="form-check-label" for="flexRadioDefault1">' + elementos[j] + '</label><br>';
    }
  }
}

function siguienteCuestion() {
  posterior=true;
  if(anterior){
    desplaza=-1+diferencial;
    anterior=false;
  }
  diferencial=0
  if (preguntas.length==0) {
    // Acciones a realizar si se alcanza el final de las preguntas
    document.getElementById('formu').innerHTML = '';
    document.getElementById('formu2').innerHTML = '';
    document.getElementById('formu2').innerHTML += 'You have already answered all the questions in this section.';
  } else {
    document.getElementById("final").style.display = "block";
    let i = 0;
    obtenerValor();
    document.getElementById('formu').innerHTML = '';
    document.getElementById('formu2').innerHTML = '';
    for (i = 0; i < 5; i++) {
      if (desplaza > preguntas.length - 2) {
        // Última página de preguntas, mostrar botón de envío
        if(update){
          document.getElementById('formu2').innerHTML += '<br><button class="btn btn-primary" id="sub-form" type="button" onclick="updateProcces()" style="display:block; margin:0 auto;">Submit</button>';
        }else{
          document.getElementById('formu2').innerHTML += '<br><button class="btn btn-primary" id="sub-form" type="button" onclick="submitProcces()" style="display:block; margin:0 auto;">Submit</button>';
        }
        break;
      }
      desplaza++;
      diferencial++;
      console.log(desplaza);
      // Agregar pregunta y respuestas al formulario
      document.getElementById('formu2').innerHTML += '<div id="grupo"class="form-group-' + i + '"><label class="bold-label">' + preguntas[desplaza] + '</label><br/> <div class="form-check" id="' + preguntaIds[desplaza] + '"></div></div>';
      ponerRespuestas(i);
      porcentaje = ((desplaza + 1) / (preguntas.length)) * 100;
      document.getElementById('barra').innerHTML = ' <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="' + porcentaje + '"aria-valuemin="0" aria-valuemax="100" style="width: ' + porcentaje + '%"></div>';
    }
  }
}

function anteriorCuestion() {
  anterior=true;
  if(posterior && (desplaza-diferencial)>0){
    desplaza=desplaza-diferencial;
    posterior=false
  }
  diferencial=0
  console.log(desplaza)
  if (desplaza<=0) {
    alert("No puedes volver más");
  } else {
    document.getElementById('formu2').innerHTML = '';
    for (i = 5; i > 0; i--) {
      if(desplaza==0){
        break;
      }
      desplaza--;
      diferencial++;
      console.log('hols');
      console.log(desplaza);
      // Agregar pregunta y respuestas anteriores al formulario
      document.getElementById('formu2').innerHTML += '<div id="Grupo-' + i + '"class="form-group"><label class="bold-label">' + preguntas[desplaza] + '</label><br/> <div class="form-check" id="' + preguntaIds[desplaza] + '"></div></div>';
      ponerRespuestas(i);
      porcentaje = ((desplaza + 1) / (preguntas.length)) * 100;
      document.getElementById('barra').innerHTML = ' <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="' + porcentaje + '"aria-valuemin="0" aria-valuemax="100" style="width: ' + porcentaje + '%"></div>';
    }
  }
}

//Funcion para obtener las respuestas seleecionadas
function obtenerValor() {
  let total=0
  let resp=''
  let preg=''
  var formGroups = document.querySelectorAll('#formu2 #grupo');

  for (var i = 0; i < formGroups.length; i++) {
    var opciones = formGroups[i].querySelectorAll('input');
    var valorArray = (desplaza - 5) + i;

    if (opciones[0].type === 'radio') {
      // Pregunta de tipo radio
      for (var j = 0; j < opciones.length; j++) {
        if (opciones[j].checked) {
          resultados.push(opciones[j].value);
          idResp.push(opciones[j].getAttribute('id'));
          idPreg.push(opciones[j].name);
        }
      }
    } else if (opciones[0].type === 'checkbox') {
      // Pregunta de tipo checkbox
      for (var j = 0; j < opciones.length; j++) {
        if (opciones[j].checked) {
          total = total + parseInt(opciones[j].value);
          resp = opciones[j].getAttribute('id')
          preg= opciones[j].name
        }
      }
      resultados.push(total);
      idResp.push(resp);
      idPreg.push(preg);
    }
  }
}

// Obtener el valor de 'email' almacenado en el localStorage
const localidadUsuario = localStorage.getItem('email');

// Función asincrónica para obtener las preguntas según la subdimensión y la localidad del usuario
async function getPreguntas(subdimension) {
  try {
    // Realizar una solicitud GET a la API para obtener las preguntas
    const response = await fetch('http://127.0.0.1:8000/api/preguntas/' + subdimension+'/'+localidadUsuario, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    Preguntas = data;

    // Iterar sobre las preguntas y agregarlas a la lista 'preguntas'
    for (const pregunta of Preguntas) {
      preguntas.push(pregunta.Pregunta);
      preguntaIds.push(pregunta.PreguntaId);

      // Obtener las respuestas para cada pregunta
      await getRespuestas(pregunta.PreguntaId);
    }
  } catch (error) {
    console.log(error);
  }
}

// Función asincrónica para obtener las respuestas de una pregunta específica
async function getRespuestas(idpregunta) {
  try {
    // Realizar una solicitud GET a la API para obtener las respuestas de la pregunta
    const response = await fetch('http://127.0.0.1:8000/api/respuestas/' + idpregunta, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    Elementos = data;

    // Iterar sobre las respuestas y agregar los elementos a las respectivas listas
    Elementos.forEach(elemento => {
      elementos.push(elemento.Elemento);
      respuestasIds.push(elemento.IdPregunta);
      valores.push(parseInt(elemento.Valor));
      respuestasTipo.push(elemento.tipoPregunta);
    });
  } catch (error) {
    console.log(error);
  }
}


// Función asincrónica para insertar respuestas en la base de datos
async function getInsert() {
  obtenerValor(); // Obtener los valores de las respuestas

  const hash = window.location.hash.substring(1); // Obtener el valor de hash de la URL
  const delay = ms => new Promise(res => setTimeout(res, ms)); // Función para agregar un retraso

  // Iterar sobre los resultados y realizar la inserción de cada respuesta
  for (let i = 0; i < resultados.length; i++) {
    const email = localStorage.getItem('email'); // Obtener el email almacenado en el localStorage
    const idPregunta = idPreg[i];
    const ciudad = hash;
    const año = 2022;
    const respuesta = resultados[i];

    let maxAttempts = 5; // Número máximo de intentos para realizar la inserción
    let attempt = 1; // Contador de intentos

    // Intentar realizar la inserción con un número máximo de intentos
    while (attempt <= maxAttempts) {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/insertar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            Email: email,
            IdPregunta: idPregunta,
            Ciudad: ciudad,
            Año: año,
            Respuesta: respuesta
          })
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data.message); // Mostrar el mensaje de éxito de la inserción
          break; // Salir del bucle while si la inserción fue exitosa
        } else {
          throw new Error('Ha ocurrido un error'); // Lanzar un error si la respuesta no es exitosa
        }
      } catch (error) {
        console.error(error); // Mostrar el error en la consola
        if (attempt < maxAttempts) {
          await delay(5000); // Esperar 5 segundos antes de volver a intentar
          attempt++;
        } else {
          console.error('Número máximo de intentos alcanzado'); // Mostrar un mensaje de error si se alcanza el número máximo de intentos
          break;
        }
      }
    }
  }
}

// Función asincrónica para actualizar respuestas en la base de datos
async function actualizarRespuesta() {
  obtenerValor(); // Obtener los valores de las respuestas

  const hash = window.location.hash.substring(1); // Obtener el valor de hash de la URL

  // Iterar sobre los resultados y realizar la actualización de cada respuesta
  for (let i = 0; i < resultados.length; i++) {
    const email = localStorage.getItem('email'); // Obtener el email almacenado en el localStorage
    const idPregunta = idPreg[i];
    const ciudad = hash;
    const año = 2022;
    const respuesta = resultados[i];

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/actualizar/${idPregunta}/${email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Email: email,
          IdPregunta: idPregunta,
          Ciudad: ciudad,
          Año: año,
          Respuesta: respuesta
        })
      });

      const data = await response.json();
      console.log(data.message); // Mostrar el mensaje de éxito de la actualización
    } catch (error) {
      console.log(error);
    }
  }
}


// Función asincrónica para actualizar los datos en la base de datos
async function updateData(data) {
  const hash = window.location.hash.substring(1);

  // Realizar una solicitud POST para actualizar los datos en el servidor
  const response = await fetch('http://127.0.0.1:8000/api/update/' + hash, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ array: data })
  });

  // Redirigir a la página dashboard.html después de ejecutar la función
  window.location.href = 'index.html';
}

// Función asincrónica para obtener las subdimensiones
async function getSubdi(letra) {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/subdi/' + letra, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const subdimensiones = await response.json();

    // Iterar sobre las subdimensiones y obtener las preguntas para cada una
    for (const subdimension of subdimensiones) {
      await getPreguntas(subdimension.Subdimension);
    }

    siguienteCuestion();
  } catch (error) {
    console.log(error);
  }
}

// Obtener el elemento con el ID "volver"
var volver = document.getElementById('volver');
var enlace = "../dashboard/dashboard.html" + location.hash;
volver.innerHTML = "<a href='" + enlace + "'><i class='fa-solid fa-arrow-left'></i></a>"

// Función asincrónica para procesar el envío de respuestas
async function submitProcces() {
  // Insertar nuevos datos
  await getInsert();

  // Obtener medias
  var Medias = await getMedias();

  // Actualizar datos con medias
  // updateData(Medias)
}

// Función asincrónica para procesar la actualización de respuestas
async function updateProcces() {
  // Insertar nuevos datos
  await actualizarRespuesta();

  // Obtener medias
  var Medias = await getMedias();

  // Actualizar datos con medias
  // updateData(Medias)
}

// Función asincrónica para obtener las respuestas de las subdimensiones
async function subdiRespuestas(letra) {
  document.getElementById('formu').innerHTML = '';
  document.getElementById('formu2').innerHTML = '';
  update=true
  try {
    const response = await fetch('http://127.0.0.1:8000/api/subdi/' + letra, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const subdimensiones = await response.json();

    // Iterar sobre las subdimensiones y actualizar las respuestas para cada una
    for (const subdimension of subdimensiones) {
      await actualizarRespuestas(subdimension.Subdimension);
    }
    siguienteCuestion();
  } catch (error) {
    console.log(error);
  }
   
}

// Función asincrónica para actualizar las respuestas de una subdimensión
async function actualizarRespuestas(letra) {



  let email = localStorage.getItem('email');

  try {
    const response = await fetch('http://127.0.0.1:8000/api/updateRespuestas/' + email + '/' + letra, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const preguntasConElementos = await response.json();

    // Iterar sobre las preguntas con sus elementos asociados
    preguntasConElementos.forEach(item => {
      // Agregar el HTML para mostrar la pregunta y los elementos asociados
      preguntas.push(item.pregunta.pregunta);
      preguntaIds.push(item.pregunta.PreguntaId);
      item.elementos.forEach(elemento => {
        const isChecked = elemento.Valor === item.seleccion.Respuesta; // Verificar si el valor coincide con la respuesta guardada
        check.push(isChecked);
        elementos.push(elemento.elemento);
        respuestasIds.push(elemento.IdPregunta);
        valores.push(parseInt(elemento.Valor));
        respuestasTipo.push(elemento.tipoPregunta);
      });
      
    });

  } catch (error) {
    console.log(error);
  }
}


// Función asincrónica para obtener las medias desde el servidor
async function getMedias() {
  await fetch('http://127.0.0.1:8000/api/medias', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(response => {
      // Obtener las medias de cada dimensión del objeto de respuesta
      const L1 = response.L1;
      const L2 = response.L2;
      const L3 = response.L3;
      const L4 = response.L4;
      const U1 = response.U1;
      const E1 = response.E1;
      const C1 = response.C1;
      const C2 = response.C2;
      const I1 = response.I1;
      const I2 = response.I2;
      const P1 = response.P1;
      const P2 = response.P2;


      // Llamar a la función medias pasando las medias como argumentos
      medias(L1, L2, L3, L4, U1, E1, C1, C2, I1, I2, P1, P2);
    })
    .catch(error => console.log(error));
}


function medias(L1, L2, L3, L4, U1, E1, C1, C2, I1, I2, P1, P2) {

  var valor = [];
  //L1

  if (typeof L1 !== 'undefined' && typeof L1[0] !== 'undefined' && typeof L1[0][0] !== 'undefined' && typeof L1[0][1] !== 'undefined') {
    if (L1[0][0] / (L1[0][1] - 2) >= 1) {
      valor[0] = ['L1S1', 1];
    } else {
      valor[0] = ['L1S1', 0];
    }
  } else {
    valor[0] = ['L1S1', 0];
  }
  
  if (typeof L1 !== 'undefined' && typeof L1[0] !== 'undefined' && typeof L1[0][0] !== 'undefined' && typeof L1[0][1] !== 'undefined') {
    if (L1[0][0] / (L1[0][1] - 2) >= 1) {
      if ((L1[0][0] - 1) / (L1[0][1] - 2) < 1) {
        valor[1] = ['L1M1', (L1[0][0] - 1) / (L1[0][1] - 2)];
      } else {
        valor[1] = ['L1M1', 1];
      }
    } else {
      valor[1] = ['L1M1', 0];
    }
  } else {
    valor[1] = ['L1M1', 0];
  }
  
  if (typeof L1 !== 'undefined' && typeof L1[0] !== 'undefined' && typeof L1[0][0] !== 'undefined' && typeof L1[0][1] !== 'undefined') {
    if (L1[0][0] / (L1[0][1] - 2) >= 1) {
      valor[2] = ['L1A1', (L1[0][0] - 1) / (L1[0][1] - 1)];
    } else {
      valor[2] = ['L1A1', 0];
    }
  } else {
    valor[2] = ['L1A1', 0];
  }
  
  if (typeof L1 !== 'undefined' && typeof L1[1] !== 'undefined' && typeof L1[1][0] !== 'undefined' && typeof L1[1][1] !== 'undefined') {
    if ((L1[1][0]) / (L1[1][1] - 3) >= 1) {
      valor[3] = ['L1S2', 1];
    } else if ((L1[1][0] - 1) / (L1[1][1] - 3) < 1) {
      valor[3] = ['L1S2', 0];
    } else {
      valor[3] = ['L1S2', (L1[1][0] - 1) / (L1[1][1] - 3)];
    }
  } else {
    valor[3] = ['L1S2', 0];
  }
  
  if (typeof L1 !== 'undefined' && typeof L1[1] !== 'undefined' && typeof L1[1][0] !== 'undefined' && typeof L1[1][1] !== 'undefined') {
    if ((L1[1][0]) / (L1[1][1] - 3) >= 1) {
      if ((L1[1][0] - 1) / (L1[1][1] - 3) < 1) {
        valor[4] = ['L1M2', (L1[1][0] - 1) / (L1[1][1] - 3)];
      } else {
        valor[4] = ['L1M2', 1];
      }
    } else {
      valor[4] = ['L1M2', 0];
    }
  } else {
    valor[4] = ['L1M2', 0];
  }
  
  if (typeof L1 !== 'undefined' && typeof L1[1] !== 'undefined' && typeof L1[1][0] !== 'undefined' && typeof L1[1][1] !== 'undefined') {
    if ((L1[1][0]) / (L1[1][1] - 3) >= 1) {
      if ((L1[1][0] - 1) / (L1[1][1] - 2) > 1) {
        valor[5] = ['L1A2', 1];
      } else {
        valor[5] = ['L1A2', (L1[1][0] - 1) / (L1[1][1] - 2)];
      }
    } else {
      valor[5] = ['L1A2', 0];
    }
  } else {
    valor[5] = ['L1A2', 0];
  }
  
  if (typeof L1 !== 'undefined' && typeof L1[1] !== 'undefined' && typeof L1[1][0] !== 'undefined' && typeof L1[1][1] !== 'undefined') {
    if ((L1[1][0]) / (L1[1][1] - 3) >= 1) {
      if ((L1[1][0] - 1) / (L1[1][1] - 1) > 1) {
        valor[6] = ['L1R2', 1];
      } else {
        valor[6] = ['L1R2', (L1[1][0] - 1) / (L1[1][1] - 1)];
      }
    } else {
      valor[6] = ['L1R2', 0];
    }
  } else {
    valor[6] = ['L1R2', 0];
  }
  
  if (typeof L1 !== 'undefined' && typeof L1[3] !== 'undefined' && typeof L1[3][0] !== 'undefined' && typeof L1[3][1] !== 'undefined') {
    if (valor[6][1] >= 0.75) {
      if (L1[3][0] > 1) {
        valor[7] = ['L1T2', (L1[3][0] - 1) / (L1[3][1] - 1)];
      } else {
        valor[7] = ['L1T2', 0];
      }
    } else {
      valor[7] = ['L1T2', 0];
    }
  } else {
    valor[7] = ['L1T2', 0];
  }
  
  if (typeof L1 !== 'undefined' && typeof L1[2] !== 'undefined' && typeof L1[2][0] !== 'undefined' && typeof L1[2][1] !== 'undefined') {
    if (L1[2][0] == 0) {
      valor[8] = ['L1M3', 0];
    } else {
      valor[8] = ['L1M3', (L1[2][0] - 1) / (L1[2][0] - 1)];
    }
  } else {
    valor[8] = ['L1M3', 0];
  }
  
  

  //L2
  var L2M1 = 0;

  if (typeof L2 !== 'undefined' && typeof L2[0] !== 'undefined' && typeof L2[0][0] !== 'undefined' && typeof L2[0][1] !== 'undefined') {
    if (L2[0][0] / (L2[0][1] - 3) >= 1) {
      L2M1 += 1;
    }
  }
  
  if (typeof L2 !== 'undefined' && typeof L2[1] !== 'undefined' && typeof L2[1][0] !== 'undefined' && typeof L2[1][1] !== 'undefined') {
    if (L2[1][0] / (L2[1][1] - 3) >= 1) {
      L2M1 += 1;
    }
  }
  
  if (typeof L2 !== 'undefined' && typeof L2[2] !== 'undefined' && typeof L2[2][0] !== 'undefined' && typeof L2[2][1] !== 'undefined') {
    if (L2[2][0] == 0) {
      L2M1 += 0;
    } else {
      L2M1 += (L2[2][0] - 1) / (L2[2][1] - 1);
    }
  }
  
  valor[9] = ['L2M1', L2M1 / 3];
  
  if (typeof L2 !== 'undefined' && typeof L2[0] !== 'undefined' && typeof L2[0][0] !== 'undefined' && typeof L2[0][1] !== 'undefined') {
    if (L2[0][0] / (L2[0][1] - 3) >= 1) {
      if ((L2[0][0] - 1) / (L2[0][1] - 3) > 1) {
        valor[10] = ['L2A1', 1];
      } else {
        valor[10] = ['L2A1', (L2[0][0] - 1) / (L2[0][1] - 3)];
      }
    } else {
      valor[10] = ['L2A1', 0];
    }
  }else{
    valor[10]= ['L2A1', 0];
  }
  
  if (typeof L2 !== 'undefined' && typeof L2[1] !== 'undefined' && typeof L2[1][0] !== 'undefined' && typeof L2[1][1] !== 'undefined') {
    if (L2[1][0] / (L2[1][1] - 3) >= 1) {
      if ((L2[1][0] - 1) / (L2[1][1] - 3) > 1) {
        var L2A1_2 = 1;
      } else {
        var L2A1_2 = (L2[1][0] - 1) / (L2[1][1] - 3);
      }
    } else {
      var L2A1_2 = 0;
    }
  } else {
    var L2A1_2 = 0;
  }
  
  valor[11] = ['L2A1', (valor[10][1] + L2A1_2) / 2];
  
  if (typeof L2 !== 'undefined' && typeof L2[0] !== 'undefined' && typeof L2[0][0] !== 'undefined' && typeof L2[0][1] !== 'undefined') {
    if (L2[0][0] / (L2[0][1] - 3) >= 1) {
      if ((L2[0][0] - 1) / (L2[0][1] - 2) > 1) {
        valor[12] = ['L2R1', 1];
      } else {
        valor[12] = ['L2R1', (L2[0][0] - 1) / (L2[0][1] - 2)];
      }
    } else {
      valor[12] = ['L2R1', 0];
    }
  } else {
    valor[12] = ['L2R1', 0];
  }
  
  if (typeof L2 !== 'undefined' && typeof L2[1] !== 'undefined' && typeof L2[1][0] !== 'undefined' && typeof L2[1][1] !== 'undefined') {
    if (L2[1][0] / (L2[1][1] - 3) >= 1) {
      if ((L2[1][0] - 1) / (L2[1][1] - 2) > 1) {
        valor[12][1] += 1;
      } else {
        valor[12][1] += (L2[1][0] - 1) / (L2[1][1] - 2);
      }
    }
  }
  
  valor[13] = ['L2R1', valor[12][1] / 2];
  
  if (typeof L2 !== 'undefined' && typeof L2[0] !== 'undefined' && typeof L2[0][0] !== 'undefined' && typeof L2[0][1] !== 'undefined') {
    if (L2[0][0] / (L2[0][1] - 3) >= 1) {
      if ((L2[0][0] - 1) / (L2[0][1] - 1) > 1) {
        valor[14] = ['L2T1', 1];
      } else {
        valor[14] = ['L2T1', (L2[0][0] - 1) / (L2[0][1] - 1)];
      }
    } else {
      valor[14] = ['L2T1', 0];
    }
  } else {
    valor[14] = ['L2T1', 0];
  }
  
  if (typeof L2 !== 'undefined' && typeof L2[1] !== 'undefined' && typeof L2[1][0] !== 'undefined' && typeof L2[1][1] !== 'undefined') {
    if (L2[1][0] / (L2[1][1] - 3) >= 1) {
      if ((L2[1][0] - 1) / (L2[1][1] - 1) > 1) {
        var L2T1 = 1;
      } else {
        var L2T1 = (L2[1][0] - 1) / (L2[1][1] - 1);
      }
    } else {
      var L2T1 = 0;
    }
  } else {
    var L2T1 = 0;
  }
  
  valor[15] = ['L2T1', (L2T1 + L2T1) / 2];
  
  


  //L3
  if (typeof L3 !== 'undefined' && typeof L3[0] !== 'undefined' && typeof L3[0][0] !== 'undefined' && typeof L3[0][1] !== 'undefined') {
    if ((L3[0][0]) / (L3[0][1] - 1) >= 1) {
      valor[16] = ['L3S1', 1];
    } else {
      valor[16] = ['L3S1', 0];
    }
  } else {
    valor[16] = ['L3S1', 0];
  }
  
  if (typeof L3 !== 'undefined' && typeof L3[0] !== 'undefined' && typeof L3[0][0] !== 'undefined' && typeof L3[0][1] !== 'undefined') {
    if ((L3[0][0]) / (L3[0][1] - 1) >= 1) {
      valor[17] = ['L3M1', ((L3[0][0] - 1) / (L3[0][1] - 1))];
    } else {
      valor[17] = ['L3M1', 0];
    }
  } else {
    valor[17] = ['L3M1', 0];
  }
  
  if (valor[17][1] >= 0.75) {
    if (typeof L3 !== 'undefined' && typeof L3[2] !== 'undefined' && typeof L3[2][0] !== 'undefined' && typeof L3[2][1] !== 'undefined') {
      if (L3[0][0] >= 3) {
        valor[18] = ['L3T1', ((L3[2][0] > 1) ? ((L3[2][0] - 1) / (L3[2][1] - 1)) : 0)];
      } else {
        valor[18] = ['L3T1', 0];
      }
    } else {
      valor[18] = ['L3T1', 0];
    }
  }
  
  if (typeof L3 !== 'undefined' && typeof L3[1] !== 'undefined' && typeof L3[1][0] !== 'undefined' && typeof L3[1][1] !== 'undefined') {
    if (L3[1][0] > 1) {
      if ((L3[1][0]) / (L3[1][1] - 1) >= 1) {
        valor[19] = ['L3M2', 1];
      } else {
        valor[19] = ['L3M2', (L3[1][0]) / (L3[1][1])];
      }
    } else {
      valor[19] = ['L3M2', 0];
    }
  } else {
    valor[19] = ['L3M2', 0];
  }
  
  if (typeof L3 !== 'undefined' && typeof L3[1] !== 'undefined' && typeof L3[1][0] !== 'undefined' && typeof L3[1][1] !== 'undefined') {
    if ((L3[1][0]) > 1) {
      var firstTerm = ((L3[1][0]) - 1) / ((L3[1][1]) - 1) >= 1 ? 1 : L3[1][0] / ((L3[1][1]) - 1);
    } else {
      var firstTerm = 0;
    }
  } else {
    var firstTerm = 0;
  }
  
  if (typeof L3 !== 'undefined' && typeof L3[3] !== 'undefined' && typeof L3[3][0] !== 'undefined' && typeof L3[3][1] !== 'undefined') {
    if ((L3[3][0]) > 1) {
      var secondTerm = ((L3[3][0])) / ((L3[3][1]) - 1) >= 1 ? 1 : (L3[3][0]) / ((L3[3][1]) - 1);
    } else {
      var secondTerm = 0;
    }
  } else {
    var secondTerm = 0;
  }
  
  valor[20] = ['L3A2', (firstTerm + secondTerm) / 2];
  
  if (typeof L3 !== 'undefined' && typeof L3[3] !== 'undefined' && typeof L3[3][0] !== 'undefined' && typeof L3[3][1] !== 'undefined') {
    if (L3[3][0] > 1) {
      valor[21] = ['L3R2', (L3[3][0] - 1) / (L3[3][1] - 1)];
    } else {
      valor[21] = ['L3R2', 0];
    }
  } else {
    valor[21] = ['L3R2', 0];
  }
  
  if (valor[21][0] >= 0.75) {
    if (typeof L3 !== 'undefined' && typeof L3[4] !== 'undefined' && typeof L3[4][0] !== 'undefined' && typeof L3[4][1] !== 'undefined') {
      if (L3[4][0] > 1) {
        valor[22] = ['L3T2', L3[4][0] / L3[4][1]];
      } else {
        valor[22] = ['L3T20', 0];
      }
    } else {
      valor[22] = ['L3T2', 0];
    }
  } else {
    valor[22] = ['L3T2', 0];
  }
  



  //l4

  if (typeof L4 !== 'undefined' && typeof L4[5] !== 'undefined' && typeof L4[5][0] !== 'undefined' && typeof L4[5][1] !== 'undefined') {
    if (L4[5][0] > 1) {
      if ((L4[5][0]) / (L4[5][1] - 2) >= 1) {
        valor[23] = ['L4S1', 1];
      } else {
        valor[23] = ['L4S1', (L4[5][0]) / (L4[5][1] - 2)];
      }
    } else {
      valor[23] = ['L4S1', 0];
    }
  }
  
  if (typeof L4 !== 'undefined' && typeof L4[5] !== 'undefined' && typeof L4[5][0] !== 'undefined' && typeof L4[5][1] !== 'undefined') {
    if (L4[5][0] > 1) {
      if ((L4[5][0]) / (L4[5][0] - 2) > 1) {
        valor[24] = ['L4A1', 1];
      } else {
        valor[24] = ['L4A1', (L4[5][0]) / (L4[5][0] - 2)];
      }
    } else {
      valor[24] = ['L4A1', 0];
    }
  }
  
  if (typeof L4 !== 'undefined' && typeof L4[0] !== 'undefined' && typeof L4[0][0] !== 'undefined' && typeof L4[0][1] !== 'undefined') {
    if (L4[0][0] > 1) {
      valor[25] = ['L4S2', (L4[0][0] - 1) / (L4[0][1] - 1)];
    } else {
      valor[25] = ['L4S2', 0];
    }
  }
  
  var L4M2 = 0;
  if (typeof L4 !== 'undefined' && typeof L4[1] !== 'undefined' && typeof L4[1][0] !== 'undefined' && typeof L4[1][1] !== 'undefined') {
    if (L4[1][0] > 1) {
      if (L4[1][0] / (L4[1][1] - 2) < 1) {
        L4M2 = L4[1][0] / (L4[1][1] - 2);
      } else {
        L4M2 = 1;
      }
    } else {
      L4M2 = 0;
    }
  }
  
  if (valor[25][1] >= 0.75) {
    if (typeof L4 !== 'undefined' && typeof L4[1] !== 'undefined' && typeof L4[1][0] !== 'undefined' && typeof L4[1][1] !== 'undefined') {
      if (L4[1][0] > 1) {
        L4M2 = L4M2;
      }
    }
  } else {
    L4M2 = 0;
  }
  
  if (typeof L4 !== 'undefined' && typeof L4[3] !== 'undefined' && typeof L4[3][0] !== 'undefined' && typeof L4[3][1] !== 'undefined') {
    if ((L4[3][0] / (L4[3][1] - 1)) >= 1) {
      L4M2 = L4M2 + 1;
    } else {
      L4M2 = L4M2 + (L4[3][0] / (L4[3][1] - 1));
    }
  }
  
  valor[26] = ['L4M2', L4M2 / 2];
  
  var L4A2 = 0;
  if (valor[26][1] >= 0.75) {
    if (typeof L4 !== 'undefined' && typeof L4[1] !== 'undefined' && typeof L4[1][0] !== 'undefined' && typeof L4[1][1] !== 'undefined') {
      if ((L4[1][0] - 1) / (L4[1][1] - 2) > 1) {
        L4A2 = 1;
      } else {
        L4A2 = (L4[1][0] - 1) / (L4[1][1] - 2);
      }
    } else {
      L4A2 = 0;
    }
  }
  
  if (typeof L4A2 !== 'undefined' && typeof L4 !== 'undefined' && typeof L4[3] !== 'undefined' && typeof L4[3][0] !== 'undefined' && typeof L4[3][1] !== 'undefined') {
    valor[27] = ['L4A2', (L4A2 + L4[3][0] / L4[3][1]) / 2];
  } else {
    valor[27] = ['L4A2', 0];
  }
  
  
  if (valor[27][1] >= 0.75) {
    if (typeof L4 !== 'undefined' && typeof L4[1] !== 'undefined' && typeof L4[1][0] !== 'undefined' && typeof L4[1][1] !== 'undefined') {
      valor[28] = ['L4R2', (L4[1][0] > 1) ? ((L4[1][0] - 1) / (L4[1][1] - 1)) : 0];
    } else {
      valor[28] = ['L4R2', 0];
    }
  }
  
  if (typeof L4 !== 'undefined' && typeof L4[2] !== 'undefined' && typeof L4[2][0] !== 'undefined' && typeof L4[2][1] !== 'undefined') {
    valor[29] = ['L4M3', L4[2][0] / L4[2][1]];
  } else {
    valor[29] = ['L4M3', 0];
  }
  
  
  if (valor[29][1] >= 0.75) {
    if (typeof L4 !== 'undefined' && typeof L4[6] !== 'undefined' && typeof L4[6][0] !== 'undefined' && typeof L4[6][1] !== 'undefined') {
      valor[30] = ['L4T3', (L4[6][0] > 1) ? ((L4[6][0] - 1) / (L4[6][1] - 1)) : 0];
    } else {
      valor[30] = ['L4T3', 0];
    }
  }
  
  if (typeof L4 !== 'undefined' && typeof L4[4] !== 'undefined' && typeof L4[4][0] !== 'undefined' && typeof L4[4][1] !== 'undefined') {
    if (L4[4][0] > 1) {
      valor[31] = ['L4A4', (L4[4][0] - 1) / (L4[4][1] - 1)];
    } else {
      valor[31] = ['L4A4', 0];
    }
  }
  
  console.log(valor);
  updateData(valor);
}





  /*P1
  if (typeof P1 !== 'undefined' && typeof P1[1] !== 'undefined' && typeof P1[1][0] !== 'undefined' && typeof P1[1][1] !== 'undefined') {
    if (P1[1][0] > 1) {
      if ((P1[1][0] - 1) / (P1[1][1] - 2) > 1) {
        valor[32] = ['P1S1', ((P1[1][0]) / (P1[1][1])) + 1];
      } else {
        valor[32] = ['P1S1', ((P1[0][0]) / (P1[0][1])) + ((P1[1][0] - 1) / (P1[1][1] - 2))];
      }
    } else {
      valor[32] = ['P1S1', ((P1[0][0]) / (P1[0][1])) / 2];
    }
  } else {
    valor[32] = ['P1S1', 0];
  }

  if (valor[32] !== undefined && valor[32][1] !== undefined) {
    if (valor[32][1] >= 0.75) {
      if (P1[3][0] !== undefined && P1[3][1] !== undefined) {
        if ((P1[3][0]) / (P1[3][1] - 1) > 1) {
          valor[33] = ['P1M1', 1];
        } else {
          valor[33] = ['P1M1', (P1[3][0]) / (P1[3][1] - 1)];
        }
      } else {
        valor[33] = ['P1M1', 0];
      }
    } else {
      valor[33] = ['P1M1', 0];
    }
  } else {
    valor[33] = ['P1M1', 0];
  }

  if (valor[33] !== undefined && valor[33][1] !== undefined) {
    if (valor[33][1] >= 0.75) {
      if (P1[3][0] !== undefined && P1[3][1] !== undefined && P1[4][0] !== undefined && P1[4][1] !== undefined) {
        var numerator = (P1[3][0]) / (P1[3][1]);
        var denominator = (P1[4][0] - 1) / ([4][1] - 1);
        var secondTerm = (P1[4][0] > 1) ? denominator : 0;
        valor[44] = ['P1A1', (numerator + secondTerm) / 2];
      } else {
        valor[44] = ['P1A1', 0];
      }
    } else {
      valor[44] = ['P1A1', 0];
    }
  } else {
    valor[44] = ['P1A1', 0];
  }

  if (valor[44][1] !== undefined && valor[44][1] >= 0.75) {
    if (P1[1][0] !== undefined && P1[1][1] !== undefined && P1[1][0] > 1) {
      valor[45] = ['P1R1', (P1[1][0] - 1) / (P1[1][1] - 1)];
    } else {
      valor[45] = ['P1R1', 0];
    }
  } else {
    valor[45] = ['P1R1', 0];
  }

  if (valor[45][1] !== undefined && valor[45][1] >= 0.75) {
    if (P1[7][0] !== undefined && P1[7][1] !== undefined && P1[7][0] > 1) {
      valor[46] = ['P1T1', (P1[7][0] - 1) / (P1[7][1] - 1)];
    } else {
      valor[46] = ['P1T1', 0];
    }
  } else {
    valor[46] = ['P1T1', 0];
  }

  if (P1[5] !== undefined && P1[5][0] !== undefined && P1[5][1] !== undefined && (P1[5][0]) / (P1[5][1] - 1) > 1) {
    valor[47] = ['P1M2', 1];
  } else {
    valor[47] = ['P1M2', (P1[5] !== undefined && P1[5][0] !== undefined && P1[5][1] !== undefined) ? (P1[5][0]) / (P1[5][1] - 1) : 0];
  }

  if (P1[5] !== undefined && P1[5][0] !== undefined && P1[5][1] !== undefined && (P1[5][0]) / (P1[5][1]) > 0) {
    valor[48] = ['P1A2', (P1[5][0]) / (P1[5][1])];
  } else {
    valor[48] = ['P1A2', 0];
  }

  if (P1[2] !== undefined && P1[2][0] !== undefined && P1[2][1] !== undefined && P1[2][0] > 1) {
    if ((P1[2][0] - 1) / (P1[2][1] - 2) > 1) {
      valor[49] = ['P1S3', 1];
    } else {
      valor[49] = ['P1S3', (P1[2][0] - 1) / (P1[2][1] - 2)];
    }
  } else {
    valor[49] = ['P1S3', 0];
  }

  if (P1[2] !== undefined && P1[2][0] !== undefined && P1[2][1] !== undefined && P1[2][0] > 1) {
    valor[50] = ['P1A3', (P1[2][0] - 1) / (P1[2][1] - 1)];
  } else {
    valor[50] = ['P1A3', 0];
  }

  if (P1[6] !== undefined && P1[6][0] !== undefined && P1[6][1] !== undefined && P1[6][0] > 1 && P1[6][1] > 1) {
    valor[51] = ['P1S4', (P1[6][0] - 1) / (P1[6][1] - 1)];
  } else {
    valor[51] = ['P1S4', 0];
  }





  //P2
  if (P2[0] !== undefined && P2[0][0] !== undefined && P2[0][1] !== undefined && P2[0][0] > 1) {
    var valor1 = (P2[0][0] - 1) / (P2[0][1] - 1);
  } else {
    var valor1 = 0;
  }

  if (P2[3] !== undefined && P2[3][0] !== undefined && P2[3][1] !== undefined && P2[3][0] > 1) {
    var valor2 = (P2[3][0] - 1) / (P2[3][1] - 1);
  } else {
    var valor2 = 0;
  }

  valor[52] = ['P2S1', (valor1 + valor2) / 2];

  if (valor[52][1] >= 0.75) {
    if (P2[1] !== undefined && P2[1][0] !== undefined && P2[1][1] !== undefined && P2[1][0] > 1) {
      var valor1 = (P2[1][0] - 1) / (P2[1][1] - 1);
    } else {
      var valor1 = 0;
    }

    if (P2[3] !== undefined && P2[3][0] !== undefined && P2[3][1] !== undefined && P2[3][0] > 1) {
      var valor2 = (P2[3][0] - 1) / (P2[3][1] - 1);
    } else {
      var valor2 = 0;
    }

    valor[53] = ['P2M1', (valor1 + valor2) / 2];
  } else {
    valor[53] = ['P2M1', 0];
  }

  if (valor[53][1] !== undefined && valor[53][1] >= 0.75) {
    if (P2[2] !== undefined && P2[2][0] !== undefined && P2[2][1] !== undefined && P2[2][0] > 1) {
      var valor1 = (P2[2][0] - 1) / (P2[2][1] - 1);
    } else {
      var valor1 = 0;
    }
  } else {
    var valor1 = 0;
  }

  valor[54] = ['P2A1', valor1];

  if (valor[54][1] !== undefined && valor[54][1] >= 0.75) {
    if (P2[6] !== undefined && P2[6][0] !== undefined && P2[6][1] !== undefined && P2[6][0] > 1) {
      var valor1 = (P2[6][0] - 1) / (P2[6][1] - 1);
    } else {
      var valor1 = 0;
    }
  } else {
    var valor1 = 0;
  }

  valor[55] = ['P2T1', valor1];


  if (typeof P2[4] !== 'undefined' && typeof P2[4][0] !== 'undefined' && typeof P2[4][1] !== 'undefined' && P2[4][0] > 1) {
    valor[56] = ['P2A2', (P2[4][0] - 1) / (P2[4][1] - 1)];
  } else {
    valor[56] = ['P2A2', 0];
  }


  if (valor[56][1] >= 0.75) {
    if (P2[5][0] > 1) {
      var valor1 = (P2[5][0] - 1) / (P2[5][1] - 1);
    } else {
      var valor1 = 0;
    }
  } else {
    var valor1 = 0;
  }

  valor[57] = ['P2R2', valor1];


  if (P2[7] !== undefined && P2[7][0] !== undefined && P2[7][1] !== undefined) {
    if (P2[7][0] > 1) {
      valor[58] = ['P2A3', (P2[7][0] - 1) / (P2[7][1] - 1)];
    } else {
      valor[58] = ['P2A3', 0];
    }
  } else {
    valor[58] = ['P2A3', 0];
  }

  if (P2[8] !== undefined && P2[8][0] !== undefined && P2[8][1] !== undefined) {
    if ((P2[8][0]) / (P2[8][1] - 3) < 1) {
      var valor1 = ((P2[8][0]) / (P2[8][1] - 3));
    } else {
      var valor1 = 1;
    }
  } else {
    var valor1 = 0;
  }

  valor[59] = ['P2S4', valor1]
  // La variable 'valor' contiene el resultado de la expresión


  if (P2[8] !== undefined && P2[8][1] !== undefined) {
    if ((P2[8][0]) / (P2[8][1] - 1) < 1) {
      valor[60] = ['P2R4', (P2[8][0]) / (P2[8][1] - 1)];
    } else {
      valor[60] = ['P2R4', 1];
    }
  } else {
    valor[60] = ['P2R4', 0];
  }


  if (P2[8] && P2[8][0] && P2[8][1]) {
    valor[61] = ['P2T4', P2[8][0] / P2[8][1]];
  } else {
    valor[61] = ['P2T4', 0];
  }


  if (typeof P2[9] !== 'undefined' && P2[9][0] > 1) {
    valor[62] = ['P2S5', (P2[9][0] - 1) / (P2[9][1] - 1)];
  } else {
    valor[62] = ['P2S5', 0];
  }

  if (valor[62] !== undefined && valor[62][1] >= 0.75) {
    if (P2[10][0] > 1) {
      valor[63] = ['P2M5', (P2[10][0] - 1) / (P2[10][1] - 1)];
    } else {
      valor[63] = ['P2M5', 0];
    }
  } else {
    valor[63] = ['P2M5', 0];
  }

  if (typeof valor[63] !== 'undefined' && valor[63][1] >= 0.75) {
    if (P2[11][0] > 0) {
      valor[64] = ['P2A5', (P2[11][0]) / (P2[11][1])];
    } else {
      valor[64] = ['P2A5', 0];
    }
  } else {
    valor[64] = ['P2A5', 0];
  }



  console.log(valor);

  //C1

  if (typeof C1[0] !== 'undefined' && C1[0][0] > 1) {
    valor[65] = ['C1S1', (C1[0][0] - 1) / (C1[0][1] - 1)];
  } else {
    valor[65] = ['C1S1', 0];
  }

  if (typeof valor[65] !== 'undefined') {
    if (valor[65][1] >= 0.66) {
      var avg = ((C1[1][0] > 1 ? (C1[1][0] - 1) / (C1[1][1] - 1) : 0) + (C1[2][0] > 1 ? (C1[2][0] - 1) / (C1[2][1] - 1) : 0)) / 2;
      valor[66] = ['C1M1', avg];
    } else {
      valor[66] = ['C1M1', 0];
    }
  } else {
    valor[66] = ['C1M1', 0];
  }

  if (valor[66] !== undefined && valor[66][1] >= 0.75) {
    if (C1[3][0] > 1) {
      valor[67] = ['C1A1', (C1[3][0] - 1) / (C1[3][1] - 1)];
    } else {
      valor[67] = ['C1A1', 0];
    }
  } else {
    valor[67] = ['C1A1', 0];
  }


  if (valor[67] !== undefined && valor[67][1] >= 0.66) {
    if (C1[4] !== undefined && C1[4][0] < 1) {
      valor[68] = ['C1R1', C1[4][0] / (C1[4][1] - 1)];
    } else {
      valor[68] = ['C1R1', 1];
    }
  } else {
    valor[68] = ['C1R1', 0];
  }

  if (typeof valor[68] !== 'undefined' && valor[68][1] >= 0.75) {
    if (C1[4][0] !== undefined && C1[4][1] !== undefined && C1[4][1] !== 0) {
      valor[69] = ['C1T1', C1[4][0] / C1[4][1]];
    } else {
      valor[69] = ['C1T1', 0];
    }
  } else {
    valor[69] = ['C1T1', 0];
  }

  if (C1[5] !== undefined && C1[5][0] !== undefined && C1[5][1] !== undefined && C1[5][1] > 4) {
    if (C1[5][0] < 1) {
      valor[70] = ['C1S2', C1[5][0] / (C1[5][1] - 4)];
    } else {
      valor[70] = ['C1S2', 1];
    }
  } else {
    valor[70] = ['C1S2', 0];
  }

  if (typeof C1[5] !== 'undefined' && C1[5][0] < 1) {
    valor[71] = ['C1M2', C1[5][0] / (C1[5][1] - 3)];
  } else {
    valor[71] = ['C1M2', 1];
  }

  if (C1[5] !== undefined && C1[5][0] !== undefined && C1[5][1] !== undefined && (C1[5][0] / (C1[5][1] - 1)) < 1) {
    valor[72] = ['C1A2', C1[5][0] / (C1[5][1] - 1)];
  } else {
    valor[72] = ['C1A2', 1];
  }

  var division = C1[5][0] / C1[5][1];
  valor[73] = ['C1R2', isNaN(division) ? 0 : division];

  if (typeof C1[6] !== 'undefined') {
    if (C1[6][0] > 1) {
      valor[74] = ['C1A3', (C1[6][0] - 1) / (C1[6][1] - 1)];
    } else {
      valor[74] = ['C1A3', 0];
    }
  } else {
    valor[74] = ['C1A3', 0];
  }

  if (B37 >= G32) {
if (C23 > 1) {
  valor[75] = ['C1R3', 1];
} else {
  valor[75] = ['C1R3', 0];
}
} else {
valor[75] = ['C1R3', 0];
}


} */
