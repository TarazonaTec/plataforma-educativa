const params = new URLSearchParams(window.location.search);

const curso = params.get("curso");
const quiz = params.get("quiz");

let preguntas = [];
let actual = 0;
let puntaje = 0;

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

  opcionesEl.innerHTML = "";

  preguntaActual.opciones.forEach(
    (opcion, index) => {

      opcionesEl.innerHTML += `
        <button
          class="opcion"
          onclick="responder(${index})"
        >
          ${opcion}
        </button>
      `;
    }
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