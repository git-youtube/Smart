

const Completeness = [
    "Leadership & Governance",
    "Preparedness",
    "Infrastructure & Resources",
    "Cooperation",
    "Urban Development & Environmental",
]
const localidadUsuario = localStorage.getItem('email');
// Define la variable data
let data = [];
let subdimensiones = [];
let subdiVal = [];
let subdiMax = [];
let subdiNom = [];
let totalSub = 0;
// Define la función asincrónica para obtener los datos
async function getGlobal() {
    const hash = localStorage.getItem('ciudad').substring(1);
    await fetch('http://127.0.0.1:8000/api/global/' + hash, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(response => {
            data = Object.values(response); // Añade los valores al array data
        })
        .catch(error => console.log(error));

    ponerGraficas();
}




// Llama a la función y espera a que se complete antes de acceder a los datos


function ponerGraficas() {

    for (let i = 0; i < Completeness.length; i++) {
        // Crear un div con un id único para cada gráfica
        const divId = `grafica-${i}`;
        const div = document.createElement('div');
        div.style.display = "inline-block";
        //div.style.marginRight = '100px';
        div.id = divId;
        document.getElementById('graficasVeloz').appendChild(div);

        // Crear la gráfica correspondiente y agregarla al div
        document.getElementById(divId).innerHTML = `
          <div class="graf">
          <h4 /* style="text-align: center;" */>${Completeness[i]}</h4>
            <div id="chart-${i}" style="height: 200px; width: 315px"></div>
          </div>
        `;


        Highcharts.chart(`chart-${i}`, {

            chart: {
                type: 'gauge',
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false,
                height: '150px'
            },

            title: {
                text: ''
            },

            pane: {
                startAngle: -90,
                endAngle: 89.9,
                background: null,
                center: ['50%', '75%'],
                size: '110%'
            },

            // the value axis
            yAxis: {
                min: 0,
                max: 40,
                tickPixelInterval: 72,
                tickPositions: [0, 5, 10, 20, 30, 40],
                tickColor: Highcharts.defaultOptions.chart.backgroundColor || '#FFFFFF',
                tickLength: 20,
                tickWidth: 2,
                minorTickInterval: null,
                labels: {
                    distance: 20,
                    style: {
                        fontSize: '14px'
                    }
                },
                plotBands: [{
                    from: 0,
                    to: 5,
                    color: '#DF5353', // red
                    thickness: 20
                }, {
                    from: 5,
                    to: 10,
                    color: '#DDDF0D', // yellow
                    thickness: 20
                }, {
                    from: 10,
                    to: 20,
                    color: '#33FFA8', // green
                    thickness: 20
                }, {
                    from: 20,
                    to: 30,
                    color: '#33CAFF', // blue
                    thickness: 20
                }, {
                    from: 30,
                    to: 40,
                    color: '#1D3EBB', // darkblue
                    thickness: 20
                }]
            },

            series: [{
                name: 'Points',
                data: [data[i]],
                tooltip: {
                    valueSuffix: ' P'
                },
                dataLabels: {
                    format: '{y} P',
                    borderWidth: 0,
                    color: (
                        Highcharts.defaultOptions.title &&
                        Highcharts.defaultOptions.title.style &&
                        Highcharts.defaultOptions.title.style.color
                    ) || '#333333',
                    style: {
                        fontSize: '16px'
                    }
                },
                dial: {
                    radius: '80%',
                    backgroundColor: 'gray',
                    baseWidth: 12,
                    baseLength: '0%',
                    rearLength: '0%'
                },
                pivot: {
                    backgroundColor: 'gray',
                    radius: 6
                }

            }],

        });



    }
}

//Con esta funcion creamos la grafica de porcentajes totales de cada ciudad registrada
async function ponerTabs() {
    let nombres = [];
    let valores = [];

    await fetch('http://127.0.0.1:8000/api/total', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(response => {
            let arreglo = response;
            arreglo.forEach(elemento => {
                nombres.push(elemento['ciudad'])
                valores.push(elemento['percent_complete']);
            });

        })
        .catch(error => console.log(error));

    // Create the chart
    Highcharts.chart('compare', {
        chart: {
            type: 'column'
        },
        title: {
            align: 'left',
            text: 'SMART achieve. January, 2023'
        },
        accessibility: {
            announceNewData: {
                enabled: true
            }
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Total percent SMART'
            }

        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}%'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        },

        series: [
            {
                name: 'Browsers',
                colorByPoint: true,
                data: [
                    {
                        name: nombres[0],
                        y: parseInt(valores[0])

                    },
                    {
                        name: nombres[1],
                        y: parseInt(valores[1])

                    },
                    {
                        name: nombres[2],
                        y: parseInt(valores[2])

                    }
                ]
            }
        ],
    });

}
//Funcion para ocultar los divs con cada tipo de graficas e ir mostrando solo los seleccionados
function seleccionarFuncion() {
    var selectElement = document.querySelector('.seleccionar');
    var selectedValue = selectElement.value;
    // Ocultar todos los divs
    document.getElementById("contenido").style.display = "none";
    document.getElementById("contenido2").style.display = "none";
    document.getElementById("contenido3").style.display = "none";
    document.getElementById("contenido4").style.display = "none";
    document.getElementById("contenido5").style.display = "none";

    // Mostrar el div seleccionado
    if (selectedValue == "1") {
        document.getElementById("contenido").style.display = "block";
    } else if (selectedValue == "2") {
        document.getElementById("contenido2").style.display = "block";
    } else if (selectedValue == "3") {
        document.getElementById("contenido3").style.display = "block";
    } else if (selectedValue == "4") {
        document.getElementById("contenido4").style.display = "block";
    } else if (selectedValue == "5") {
        document.getElementById("contenido5").style.display = "block";
    }


}

//Funcion para completar seccion 'Policies Completeness'
function complete(suma, max, nombre, letra) {
    Highcharts.chart(letra + 'G', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'SMART Completeness',
            align: 'left'
        },
        xAxis: {
            categories: nombre,
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Means',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ' Points'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Mean',
            data: suma
        }, {
            name: 'Best',
            data: max
        }]
    });



}

//Funcion para completar seccion 'Each subdimension'
function each(Vertebrate, Robust, Advanced, Moderate, Starting, max, letra) {
    Highcharts.chart(letra + 'R', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'SMART Completeness',
            align: 'left'
        },
        xAxis: {
            categories: ['Vertebrate', 'Robust', 'Advanced', 'Moderate', 'Starting'],
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Means',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ' Points'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Mean',
            data: [Vertebrate, Robust, Advanced, Moderate, Starting]
        }, {
            name: 'Best',
            data: max
        }]
    });


}

//Funcion para completar seccion 'All subdimensions'
function all(letra, A, R, M, V, S, max, secondCategories) {
    Highcharts.chart(letra + '-all', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'SMART Completeness',
            align: 'left'
        },
        xAxis: {
            categories: ['Vertebrate', 'Robust', 'Advanced', 'Moderate', 'Starting'],
            title: {
                text: null
            }
        },
        yAxis: [{
            min: 0,
            title: {
                text: 'Means',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        }, {
            title: {
                text: 'Second Categories',
                align: 'high'
            },
            opposite: true,
            categories: secondCategories
        }],
        tooltip: {
            valueSuffix: ' millions'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Mean',
            data: [V, R, A, M, S]
        }, {
            name: 'Best',
            data: max
        }],
        yAxis: {
            min: 0,
            title: {
                text: 'Means',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        }
    });
}

// Función para abrir una pestaña
function openTab(evt, tabName, letra) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-pane");

    // Oculta todos los elementos con la clase "tab-pane"
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.remove("show", "active");
    }

    tablinks = document.getElementsByClassName("nav-link");

    // Remueve la clase "active" de todos los elementos con la clase "nav-link"
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    // Muestra el contenido de la pestaña seleccionada
    document.getElementById(tabName).classList.add("show", "active");

    // Agrega la clase "active" al enlace de la pestaña seleccionada
    evt.currentTarget.classList.add("active");

    event.preventDefault(); // Evita que se navegue a la parte superior de la página

    if (letra != null) {
        // Llama a la función getSubdi con la letra correspondiente
        getSubdi(letra);
    }
}

// Arreglos para almacenar los valores de las subdimensiones
VertebrateAll = [];
RobustAll = [];
AdvancedAll = [];
ModerateAll = [];
StartingAll = [];

// Función para obtener las subdimensiones
async function getSubdi(letra) {
    VertebrateAll = [];
    RobustAll = [];
    AdvancedAll = [];
    ModerateAll = [];
    StartingAll = [];

    // Oculta los elementos con las clases "GL", "GC", "GP", "GE", "GU" e "GI"
    var elementosOcultar = document.querySelectorAll(".GL, .GC, .GP, .GE, .GU, .GI");
    for (var i = 0; i < elementosOcultar.length; i++) {
        elementosOcultar[i].style.display = "none";
    }

    // Muestra los elementos que tienen la clase "G" seguida de la letra deseada
    var elementosMostrar = document.querySelectorAll(".G" + letra);
    for (var j = 0; j < elementosMostrar.length; j++) {
        elementosMostrar[j].style.display = "block";
    }

    subdiVal = [];
    subdiMax = [];
    subdiNom = [];
    subdimensiones = [];

    // Obtiene las subdimensiones del servidor
    await fetch('http://127.0.0.1:8000/api/subdi/' + letra, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(response => {
            Sub = response;
            Sub.forEach(Subdimension => {
                subdimensiones.push(Subdimension.Subdimension);

                // Realiza cálculos con las subdimensiones
                sumaSubdi(Subdimension.Subdimension);
            });
        })
        .catch(error => console.log(error));
    getGlobal();
    maturityGraphMedia();
    ponerTabs(letra)

    //all(letra);
}


async function sumaSubdi(letra) {
    const hash = localStorage.getItem('ciudad').substring(1);
    let suma = []
    let max = []
    let nombre = []
    await fetch('http://127.0.0.1:8000/api/sumdi/' + letra + '/' + hash, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(response => {
            var Sub = response;

            if (Sub.length > 0) {
                Sub.forEach(Subdimension => {
                    nombre.push(Subdimension.NombreLevel);
                    max.push(Subdimension.maxpregunta);
                    if (Subdimension.respuesta != null) {
                        suma.push(Subdimension.respuesta);
                    } else {
                        suma.push(0)
                    }
                });
            } else {
                suma = [0, 0, 0, 0, 0, 0];
                max = [1, 1, 1, 1, 1, 1];
                nombre = ['Nivel', 'Nivel', 'Nivel', 'Nivel', 'Nivel', 'Nivel'];
            }


        })
        .catch(error => console.log(error));
    maturityGraph(letra);
    //complete(suma, max, nombre, letra);
    //each(letra);


    // Generar la gráfica dentro del div creado
    Highcharts.chart(letra, {
        //opciones de la gráfica
        chart: {
            polar: true,
            type: 'line'
        },

        accessibility: {
            description: 'A spiderweb chart compares the allocated budget against actual spending within an organization. The spider chart has six spokes. Each spoke represents one of the 6 departments within the organization: sales, marketing, development, customer support, information technology and administration. The chart is interactive, and each data point is displayed upon hovering. The chart clearly shows that 4 of the 6 departments have overspent their budget with Marketing responsible for the greatest overspend of $20,000. The allocated budget and actual spending data points for each department are as follows: Sales. Budget equals $43,000; spending equals $50,000. Marketing. Budget equals $19,000; spending equals $39,000. Development. Budget equals $60,000; spending equals $42,000. Customer support. Budget equals $35,000; spending equals $31,000. Information technology. Budget equals $17,000; spending equals $26,000. Administration. Budget equals $10,000; spending equals $14,000.'
        },

        title: {
            text: letra,
            align: 'center'
        },

        pane: {
            size: '50%'
        },

        xAxis: {
            categories: nombre,
            tickmarkPlacement: 'on',
            lineWidth: 0
        },

        yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            min: 0
        },

        tooltip: {
            shared: true,
            pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f} P</b><br/>'
        },

        legend: {
            align: 'right',
            verticalAlign: 'middle',
            layout: 'vertical'
        },

        series: [{
            name: 'Mean',
            data: suma,
            pointPlacement: 'on'
        }, {
            name: 'Best',
            data: max,
            pointPlacement: 'on'
        }],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        align: 'center',
                        verticalAlign: 'bottom',
                        layout: 'horizontal'
                    },
                    pane: {
                        size: '40%'
                    }
                }
            }]
        }
    });

}

// Función para obtener los datos del gráfico de madurez
async function maturityGraph(letra) {
    // Obtener el hash de la ciudad almacenado en el almacenamiento local
    const hash = localStorage.getItem('ciudad').substring(1);

    const suma = [];
    const max = [];
    const nombre = [];
    var Vertebrate = [];
    var Robust = [];
    var Advanced = [];
    var Moderate = [];
    var Starting = [];
    var maxGraph = [1, 1, 1, 1, 1];

    // Realizar una solicitud al servidor para obtener los datos del gráfico de madurez
    await fetch('http://127.0.0.1:8000/api/graficaMaturity/' + letra + '/' + hash, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(response => {
            Sub = response;

            // Procesar los datos de las subdimensiones
            Sub.forEach(Subdimension => {
                nombre.push(Subdimension.NombreLevel);
                max.push(1);
                suma.push(Subdimension.valor);

                // Clasificar los valores en categorías según la letra del nivel
                if ((Subdimension.NombreLevel).includes('T')) {
                    Vertebrate.push(Subdimension.valor);
                    VertebrateAll.push(Subdimension.valor);
                }

                if (((Subdimension.NombreLevel).includes('R'))) {
                    Robust.push(Subdimension.valor);
                    RobustAll.push(Subdimension.valor);
                }

                if ((Subdimension.NombreLevel).includes('A')) {
                    Advanced.push(Subdimension.valor);
                    AdvancedAll.push(Subdimension.valor);
                }

                if ((Subdimension.NombreLevel).includes('M')) {
                    Moderate.push(Subdimension.valor);
                    ModerateAll.push(Subdimension.valor);
                }
                if ((Subdimension.NombreLevel).includes('S')) {
                    Starting.push(Subdimension.valor);
                    StartingAll.push(Subdimension.valor);
                }
            });
        })
        .catch(error => console.log(error));

    let mediaV;
    let mediaA;
    let mediaM;
    let mediaS;
    let mediaR;
    let mediAllV;
    let mediAllA;
    let mediAllM;
    let mediAllS;
    let mediAllR;

    // Calcular las medias de los valores de cada categoría
    if (Vertebrate.length > 0) {
        const sumaV = Vertebrate.reduce((accumulator, currentValue) => accumulator + currentValue);
        mediaV = sumaV / Vertebrate.length;
    } else {
        mediaV = 0;
    }

    if (Robust.length > 0) {
        const sumaR = Robust.reduce((accumulator, currentValue) => accumulator + currentValue);
        mediaR = sumaR / Robust.length;
    } else {
        mediaR = 0;
    }

    if (Advanced.length > 0) {
        const sumaA = Advanced.reduce((accumulator, currentValue) => accumulator + currentValue);
        mediaA = sumaA / Advanced.length;
    } else {
        mediaA = 0;
    }

    if (Moderate.length > 0) {
        const sumaM = Moderate.reduce((accumulator, currentValue) => accumulator + currentValue);
        mediaM = sumaM / Moderate.length;
    } else {
        mediaM = 0;
    }

    if (Starting.length > 0) {
        const sumaS = Starting.reduce((accumulator, currentValue) => accumulator + currentValue);
        mediaS = sumaS / Starting.length;
    } else {
        mediaS = 0;
    }

    // Calcular las medias de los valores de todas las subdimensiones
    if (VertebrateAll.length > 0) {
        const sumaV = VertebrateAll.reduce((accumulator, currentValue) => accumulator + currentValue);
        mediAllV = Math.round((sumaV / VertebrateAll.length) * 10) / 10;
    } else {
        mediAllV = 0;
    }

    if (RobustAll.length > 0) {
        const sumaR = RobustAll.reduce((accumulator, currentValue) => accumulator + currentValue);
        mediAllR = Math.round((sumaR / RobustAll.length) * 10) / 10;
    } else {
        mediAllR = 0;
    }

    if (AdvancedAll.length > 0) {
        const sumaA = AdvancedAll.reduce((accumulator, currentValue) => accumulator + currentValue);
        mediAllA = Math.round((sumaA / AdvancedAll.length) * 10) / 10;
    } else {
        mediAllA = 0;
    }

    if (ModerateAll.length > 0) {
        const sumaM = ModerateAll.reduce((accumulator, currentValue) => accumulator + currentValue);
        mediAllM = Math.round((sumaM / ModerateAll.length) * 10) / 10;
    } else {
        mediAllM = 0;
    }

    if (StartingAll.length > 0) {
        const sumaS = StartingAll.reduce((accumulator, currentValue) => accumulator + currentValue);
        mediAllS = Math.round((sumaS / StartingAll.length) * 10) / 10;
    } else {
        mediAllS = 0;
    }

    // Llamar a las funciones complete, each y all con los datos calculados
    complete(suma, max, nombre, letra);
    each(mediaV, mediaR, mediaA, mediaM, mediaS, maxGraph, letra);
    all(letra.charAt(0), mediAllA, mediAllM, mediAllR, mediAllV, mediAllS, maxGraph);
}


async function maturityGraphAll() {
    const hash = localStorage.getItem('ciudad').substring(1);

    // Realizar una solicitud GET a la API
    await fetch('http://127.0.0.1:8000/api/graficaMaturityAll/' + hash, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json()) // Convertir la respuesta a formato JSON
        .then(response => {
            Sub = response;

            // Iterar sobre cada subdimensión de la respuesta
            Sub.forEach(Subdimension => {

                tabla[Subdimension.NombreLevel.substring(0, 3)] += Subdimension.valor;
                maxMedia[Subdimension.NombreLevel.substring(0, 3)] += 1;

            });

            const mediaPorCampo = {};

            // Calcular la media de cada campo
            for (const key in tabla) {
                if (tabla.hasOwnProperty(key)) {
                    const campo = key.substring(0, 3);
                    const valor = tabla[key];
                    const total = maxMedia[campo];
                    const media = total !== 0 ? valor / total : 0;
                    mediaPorCampo[campo] = media;
                }
            }

            console.log(mediaPorCampo);
            createGridChart(mediaPorCampo); // Llamar a la función createGridChart con los datos calculados
        })
        .catch(error => console.log(error)); // Capturar y mostrar errores en la consola
}


const tabla = {
    'C1A': 0, 'C1M': 0, 'C1R': 0, 'C1S': 0, 'C1T': 0,
    'C2A': 0, 'C2M': 0, 'C2R': 0, 'C2S': 0, 'C2T': 0,
    'E1A': 0, 'E1M': 0, 'E1R': 0, 'E1S': 0, 'E1T': 0,
    'I1A': 0, 'I1M': 0, 'I1R': 0, 'I1S': 0, 'I1T': 0,
    'I2A': 0, 'I2M': 0, 'I2R': 0, 'I2S': 0, 'I2T': 0,
    'L1A': 0, 'L1M': 0, 'L1R': 0, 'L1S': 0, 'L1T': 0,
    'L2A': 0, 'L2M': 0, 'L2R': 0, 'L2S': 0, 'L2T': 0,
    'L3A': 0, 'L3M': 0, 'L3R': 0, 'L3S': 0, 'L3T': 0,
    'L4A': 0, 'L4M': 0, 'L4R': 0, 'L4S': 0, 'L4T': 0,
    'P1A': 0, 'P1M': 0, 'P1R': 0, 'P1S': 0, 'P1T': 0,
    'P2A': 0, 'P2M': 0, 'P2R': 0, 'P2S': 0, 'P2T': 0,
    'U1A': 0, 'U1M': 0, 'U1R': 0, 'U1S': 0, 'U1T': 0
};

const maxMedia = {
    'C1A': 0, 'C1M': 0, 'C1R': 0, 'C1S': 0, 'C1T': 0,
    'C2A': 0, 'C2M': 0, 'C2R': 0, 'C2S': 0, 'C2T': 0,
    'E1A': 0, 'E1M': 0, 'E1R': 0, 'E1S': 0, 'E1T': 0,
    'I1A': 0, 'I1M': 0, 'I1R': 0, 'I1S': 0, 'I1T': 0,
    'I2A': 0, 'I2M': 0, 'I2R': 0, 'I2S': 0, 'I2T': 0,
    'L1A': 0, 'L1M': 0, 'L1R': 0, 'L1S': 0, 'L1T': 0,
    'L2A': 0, 'L2M': 0, 'L2R': 0, 'L2S': 0, 'L2T': 0,
    'L3A': 0, 'L3M': 0, 'L3R': 0, 'L3S': 0, 'L3T': 0,
    'L4A': 0, 'L4M': 0, 'L4R': 0, 'L4S': 0, 'L4T': 0,
    'P1A': 0, 'P1M': 0, 'P1R': 0, 'P1S': 0, 'P1T': 0,
    'P2A': 0, 'P2M': 0, 'P2R': 0, 'P2S': 0, 'P2T': 0,
    'U1A': 0, 'U1M': 0, 'U1R': 0, 'U1S': 0, 'U1T': 0
};

function createGridChart(data) {
    const rows = ['C1', 'C2', 'E1', 'I1', 'I2', 'L1', 'L2', 'L3', 'L4', 'P1', 'P2', 'U1'];
    const cols = ['S', 'M', 'A', 'R', 'T'];
    var ponerColor = false; // Variable para controlar el cambio de color
    const gridChart = document.getElementById('Full');

    // Create table element with Bootstrap classes
    const table = document.createElement('table');
    table.classList.add('table', 'table-bordered');
    table.style.width = '80%'; // Establecer el ancho al 80%
    table.style.height = '10%'; // Establecer la altura al 10%
    gridChart.style.display = 'flex';
    gridChart.style.justifyContent = 'center';

    // Create table head with column labels
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    tr.appendChild(th);
    for (const col of cols) {
        const th = document.createElement('th');
        th.textContent = col;
        tr.appendChild(th);
    }
    thead.appendChild(tr);
    table.appendChild(thead);

    // Create table body with rows and cells
    const tbody = document.createElement('tbody');
    for (const row of rows) {
        ponerColor = true; // Reiniciar la variable ponerColor a true para cada fila
        const tr = document.createElement('tr');
        const th = document.createElement('th');
        th.textContent = row;
        tr.appendChild(th);
        // Establecer el color azul para los recuadros de las filas
        th.style.backgroundColor = '#007bff';
        for (const col of cols) {
            const td = document.createElement('td');
            td.classList.add('text-center');
            const value = data[row + col];
            if (value >= 0.8 && ponerColor == true) {
                td.style.backgroundColor = 'rgb(84, 79, 197)'; // Establecer el color azul oscuro
            } else if (value < 0.8 && ponerColor == true) {
                ponerColor = false; // Evitar el cambio de color para el resto de las celdas de la fila
                const colorSize = value * 100; // Calcular el tamaño del color como porcentaje del valor
                td.style.background = `linear-gradient(to right, rgb(84, 79, 197) ${colorSize}%, transparent ${colorSize}%)`; // Establecer un degradado de color
            }

            // Set the background color for column headers
            const thElements = table.querySelectorAll('th:not(:first-child)');
            for (const thElement of thElements) {
                thElement.style.backgroundColor = '#007bff';
            }
            // No se muestra el contenido numérico
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);

    // Add table to chart container
    gridChart.innerHTML = '';
    gridChart.appendChild(table);
}



const ciudadUsuario = async (email) => {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/obtenerCiudad/' + email, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            const data = await response.json();
            const ciudad = '#' + data[0].City; // Obtener el valor de la ciudad desde la respuesta de la API
            localStorage.setItem('ciudad', ciudad); // Guardar la ciudad en el LocalStorage con la clave 'ciudad'
            const rol = data[0].ProfesionalRole; // Obtener el valor de la ciudad desde la respuesta de la API
            localStorage.setItem('rol', rol); // Guardar la ciudad en el LocalStorage con la clave 'ciudad'
        } else {
            console.error('Error en la respuesta de la API');
        }
    } catch (error) {
        console.error('Error al obtener la ciudad del usuario:', error);
    }
    location.reload();
};




async function maturityGraphMedia() {
    const hash = window.location.hash.substring(1);

    // Realizar una solicitud GET a la API
    await fetch('http://127.0.0.1:8000/api/mediasCiudades/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json()) // Convertir la respuesta a formato JSON
        .then(response => {
            // Obtener los datos de las ciudades
            const citiesData = response;

            // Verificar si la ciudad actual coincide con el hash
            const currentCity = citiesData[hash] ? hash : Object.keys(citiesData)[0];

            // Obtener los valores de los datos de las ciudades
            const currentCityData = Object.values(citiesData[currentCity]);
            const avgTotalData = Object.values(citiesData['avgTotal']);

            // Actualizar los datos y etiquetas de los datasets
            myChart.data.datasets[0].data = currentCityData;
            myChart.data.datasets[0].label = currentCity;
            myChart.data.datasets[1].data = avgTotalData;
            myChart.data.datasets[1].label = 'Media Ciudades';
            myChart.options.plugins.title.text = window.location.hash.substring(1);

            myChart.update();
        })
        .catch(error => console.log(error)); // Capturar y mostrar errores en la consola
}







// Definición de las utilidades y funciones auxiliares
const Utils = {
    // Array de variables personalizadas
    variables: ['L', 'P', 'I', 'C', 'U', 'E'],

    // Genera un array de números aleatorios dentro de un rango dado
    numbers: function (count) {
        const min = -100;
        const max = 100;
        const numbers = [];
        for (let i = 0; i < count; i++) {
            const number = Math.floor(Math.random() * (max - min + 1)) + min;
            numbers.push(number);
        }
        return numbers;
    },
    CHART_COLORS: {
        red: '#FF0000',
        blue: '#0000FF'
        // Define otros colores de gráfico aquí si es necesario
    },
    transparentize: function (color, opacity) {
        // Implementa la lógica para hacer un color transparente según la opacidad proporcionada
        // ...
    },
    randomColor: function () {
        // Genera un color aleatorio en formato hexadecimal
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    },
    rand: function (min, max) {
        // Implementa la lógica para generar un número aleatorio entre min y max
        // ...
    }
};

// Configuración de datos para el gráfico
const dato = {
    // Etiquetas personalizadas
    labels: Utils.variables,
    datasets: [
        {
            label: 'Dataset 1',
            data: Utils.numbers(6), // Genera 6 números aleatorios
            backgroundColor: Utils.CHART_COLORS.red,
            borderColor: Utils.CHART_COLORS.red,
            borderWidth: 1,
            order: 1
        },
        {
            label: 'Dataset 2',
            data: Utils.numbers(6), // Genera 6 números aleatorios
            backgroundColor: Utils.CHART_COLORS.blue,
            borderColor: Utils.CHART_COLORS.blue,
            borderWidth: 1,
            type: 'line',
            order: 0
        },
    ]
};

// Configuración del gráfico
const config = {
    type: 'bar',
    data: dato,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: window.location.hash.substring(1)
            }
        }
    },
};

// Acciones disponibles para el gráfico
const actions = [

];

// Obtén una referencia al elemento canvas
const canvas = document.getElementById('myChart');

// Crea el gráfico utilizando la biblioteca Chart.js
const ctx = canvas.getContext('2d');
const myChart = new Chart(ctx, config);

// Agrega interacciones o acciones al gráfico como botones
actions.forEach(action => {
    const button = document.createElement('button');
    button.innerText = action.name;
    button.addEventListener('click', () => action.handler(myChart));
    document.body.appendChild(button);
});


document.getElementById("contenido2").style.display = "none";
document.getElementById("contenido3").style.display = "none";
document.getElementById("contenido4").style.display = "none";
document.getElementById("contenido5").style.display = "none";

if (localStorage.getItem('rol') != 'Admin') {
    document.getElementById("Donostia").style.display = "none";
    document.getElementById("Valencia").style.display = "none";
    document.getElementById("Sevilla").style.display = "none";


    document.getElementById(localStorage.getItem('ciudad').substring(1)).style.display = "block";

} else {
    document.getElementById("quest").style.display = "none";
}

maturityGraphAll();


