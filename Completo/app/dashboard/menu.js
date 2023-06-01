const hamburger = document.querySelector(".respon");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach((link) =>
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  }));

let label = document.getElementById('lb');
$(document).ready(function () {
  $("#lb").on('click', function (event) {
    menu.style.display = 'block';
  });
});

var form = document.getElementById('form');
var button = document.getElementById('log');
var leaveLogin = document.getElementById('salir');

function disableScroll() {
  window.scrollTo(0, 0);
}

if (!localStorage.getItem("token")) {
  form.style.display = "block";
  form.style.position = "fixed";
  let cont = document.getElementById("page");
  cont.classList.add("blur");
  window.addEventListener('scroll', disableScroll);
}

function leave() {
  form.style.display = "none";
  let cont = document.getElementById("page");
  cont.classList.remove("blur");
  window.removeEventListener('scroll', disableScroll);
}

document.querySelector("#registrarse").addEventListener("click", function () {
  document.querySelector("#loginF").style.display = "none";
  document.querySelector("#formR").style.display = "block";

});

document.querySelector('#Loguearse').addEventListener('click', function () {
  document.querySelector("#loginF").style.display = "block";
  document.querySelector("#formR").style.display = "none";
});


//Sesion

if (localStorage.getItem("token")) {
  // Hay un usuario logueado
  console.log("Usuario logueado");
  var user = localStorage.getItem("usuario");

  let cont = document.getElementById("page");
  cont.classList.remove("blur");

  button.style.display = "none";
  var log = document.getElementById("botones");
  log.innerHTML = "<button id='logoutBtn'>Logout <i class='fa-solid fa-door-open'></i></button>";
  var logoutBtn = document.getElementById('logoutBtn');
  logoutBtn.style.float = "right";

  //Cerrar sesión
  var logout = document.getElementById("logoutBtn");
  logout.addEventListener("click", function () {
    // Elimina la información del usuario logueado del navegador
    localStorage.clear();
    // Recargar pagina
    location.reload();
  })
} else {
  // No hay un usuario logueado
  console.log("No hay un usuario logueado");
}


//Loguearse
formulario = document.getElementById('loguear');
formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  var datal = new FormData(formulario);
  // Agrega los datos del usuario a un objeto
  var userData = {
    email: datal.get("email"),
    password: datal.get("password")
  };
  // Envia los datos del usuario al servidor
  fetch('http://127.0.0.1:8000/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("token")
    },
    body: JSON.stringify(userData)
  })
    .then(response => response.json())
    .then(response => {
      console.log(response)
      responseGlobal = response;

      var error = document.getElementById("error");
      var inicio = document.getElementById("inicio");
      localStorage.removeItem("usuario");
      if (response.status === "success") {
        console.log("Usuario encontrado, iniciando sesión...");
        // Código para iniciar sesión del usuario y guardar datos
        let token = response.authorisation.token;
        let usuario = response.user.name;
        let email = response.user.email
        localStorage.setItem("token", token);
        localStorage.setItem("usuario", usuario);
        localStorage.setItem("email", email);
        //alert(usuario);

        error.innerHTML = "";
        inicio.innerHTML = "Usuario encontrado, iniciando sesion...";
        inicio.style.color = "green";
        location.reload();

      } else {
        console.log("Usuario no encontrado, verifica tus credenciales");
        error.innerHTML = "Usuario o contraseña incorrectos revise los datos";
        error.style.color = "red";
        // Código para mostrar un error al usuario
      }
    })
    .catch(err => console.error(err));
});

//Registrar un usuario
formularioR = document.getElementById('registrar');
formularioR.addEventListener("submit", function (event) {
  event.preventDefault();
  //mandar datos del formulario 
  var data = new FormData(formularioR);
  data.append('City', formularioR.City.value);
  data.append('ProfesionalRole', formularioR.ProfesionalRole.value);
  data.append('YearsOfExperience', formularioR.YearsOfExperience.value);
  data.append('mainChallenges', formularioR.mainChallenges.value);
  const options = { method: 'POST', body: data };
  fetch('http://127.0.0.1:8000/api/register', options)
    .then(response => response.json())
    .then(response => {
      //.catch(err => console.error(err));
      console.log(response);
      if (response.status === "success") {
        var registrado = document.getElementById("registrado")
        registrado.innerHTML = "Usuario registrado";
        registrado.style.color = "green";
        formularioR.reset();
        setTimeout(function () {
          registrado.innerHTML = "";
          registrado.style.color = "";
        }, 1500);
      } else {
        console.log("Correo en uso");

      }
    })
    //Si es correo ya existe mostrar mensaje
    .catch(error => {
      console.log('Error: ', error);
      registrado.innerHTML = "correo ya en uso";
      registrado.style.color = "red";
    })

});

var links = document.querySelectorAll('.city');
var titulo = document.getElementById('ciudad');

function datos() {
  var ciudadSeleccionada = localStorage.getItem('ciudad').substring(1);
  console.log(ciudadSeleccionada)
  if (ciudadSeleccionada) {
    fetch('http://127.0.0.1:8000/api/ciudades?Ciudad=' + encodeURIComponent(ciudadSeleccionada), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(response => {
        for (let i = 0; i < response.length; i++) {
          //console.log(response[i])
          if (response[i].Ciudad == ciudadSeleccionada) {
            titulo.innerHTML = `${response[i].Ciudad}`;
          }
        }
      });
  }
}

document.addEventListener('DOMContentLoaded', function () {
  datos();
});
links.forEach(function (link) {
  link.addEventListener('click', function (event) {
    event.preventDefault();
    var ciudadNombre = this.dataset.ciudad;
    if (localStorage.getItem('rol') == 'Admin') {
      location.hash = ciudadNombre;
      localStorage.setItem("ciudad", location.hash)
      if (location.hash && localStorage.getItem("token")) {
        var formu = document.getElementById('RealizarF');
        formu.style.display = "block";
        var enlace = "../form/index.html" + location.hash;

      }
    }
    datos();
  });

});

if (localStorage.getItem('ciudad') && localStorage.getItem("token")) {
  var formu = document.getElementById('RealizarF');
  formu.style.display = "block";
  var enlace = "../form/index.html" + localStorage.getItem('ciudad');
  formu.innerHTML = "<a id='quest' href='" + enlace + "' class='nav-link2'> Quest <i class='fa-solid fa-clipboard'></i></a>";
}



