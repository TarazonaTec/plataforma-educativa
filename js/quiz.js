const params = new URLSearchParams(window.location.search);

const curso = params.get("curso");
const quiz = params.get("quiz");

let preguntas = [];
let actual = 0;
let puntaje = 0;

const mediaEl =
document.getElementById("media");

const preguntaEl =
document.getElementById("pregunta");

const opcionesEl =
document.getElementById("opciones");

const progresoEl =
document.getElementById("progreso");

const siguienteBtn =
document.getElementById("siguiente");

fetch(`../data/${curso}/${quiz}.json`)
  .then(res => res.json())
  .then(data => {

    preguntas = data;

    mostrarPregunta();

  });

function mostrarPregunta(){

  const preguntaActual =
  preguntas[actual];

  progresoEl.innerHTML =
  `Pregunta ${actual + 1} de ${preguntas.length}`;

preguntaEl.innerHTML =
preguntaActual.pregunta;

mediaEl.innerHTML = "";

if(preguntaActual.imagen){

  mediaEl.innerHTML = `
    <img
      src="${preguntaActual.imagen}"
      class="pregunta-img"
    >
  `;

}

if(preguntaActual.video){

  mediaEl.innerHTML = `
    <video
      class="pregunta-video"
      controls
    >
      <source
        src="${preguntaActual.video}"
        type="video/mp4"
      >
    </video>
  `;

}

if(preguntaActual.youtube){

  mediaEl.innerHTML = `
   
    <iframe width="315" 
    height="576" 
    src="https://www.youtube.com/embed/${preguntaActual.youtube}"
      frameborder="0" 
      allow="accelerometer; 
      autoplay; clipboard-write; 
      encrypted-media; gyroscope; 
      picture-in-picture; 
      web-share" 
      referrerpolicy="strict-origin-when-cross-origin" 
      allowfullscreen>
    </iframe>

  `;

}

  opcionesEl.innerHTML = "";



  mostrarOpciones(

    opcionesEl,

    preguntaActual.opciones,

    responder

);

}

function responder(index){

  const correcta =
  preguntas[actual].correcta;

  const botones =
  document.querySelectorAll(".opcion");

  botones.forEach(btn => {
    btn.disabled = true;
  });

  if(index === correcta){

    botones[index]
    .classList.add("correcta");

    puntaje++;

  }else{

    botones[index]
    .classList.add("incorrecta");

    botones[correcta]
    .classList.add("correcta");

  }

}

siguienteBtn.addEventListener(
  "click",
  () => {

    actual++;

    if(actual < preguntas.length){

      mostrarPregunta();

    }else{

      mostrarResultado();

    }

  }
);

function mostrarResultado(){

  document.body.innerHTML = `
    <div class="resultado">

      <h1>Quiz terminado</h1>

      <h2>
        Puntaje:
        ${puntaje}/${preguntas.length}
      </h2>

      <a href="../materia.html?tema=${curso}">
        Volver al inicio
      </a>

    </div>
  `;

}
