const params =
new URLSearchParams(
  window.location.search
);

const curso =
params.get("curso");

const puzzle =
params.get("puzzle");

fetch(
  `../data/${curso}/${puzzle}.json`
)
.then(res => res.json())
.then(data => {

  document
  .getElementById("titulo")
  .innerHTML = data.titulo;

  console.log(data);

});

let puzzleData;

let piezas = [];

let seleccionada = null;


fetch(
  `../data/${curso}/${puzzle}.json`
)
.then(res => res.json())
.then(data => {

  puzzleData = data;

  document
  .getElementById("titulo")
  .innerHTML =
  data.titulo;

  crearPuzzle();

});

function crearPuzzle(){

  const board =
  document.getElementById(
    "puzzle-board"
  );

  board.innerHTML = "";

  piezas = [];

  for(let i=0;i<9;i++){

    piezas.push(i);

  }

  mezclar();

  renderizar();

}

function mezclar(){

  piezas.sort(
    () => Math.random() - 0.5
  );

}

function renderizar(){

  const board =
  document.getElementById(
    "puzzle-board"
  );

  board.innerHTML = "";

  piezas.forEach(
    (pieza,index)=>{

      const div =
      document.createElement(
        "div"
      );

      div.classList.add(
        "pieza"
      );

      const x =
      (pieza % 3) * 150;

      const y =
      Math.floor(
        pieza / 3
      ) * 150;

      div.style.backgroundImage =
      `url(${puzzleData.imagen})`;

      div.style.backgroundPosition =
      `-${x}px -${y}px`;

      div.dataset.index =
      index;

      div.addEventListener(
        "click",
        seleccionarPieza
      );

      board.appendChild(div);

    }
  );

}

function seleccionarPieza(){

  const index =
  Number(
    this.dataset.index
  );

  if(
    seleccionada === null
  ){

    seleccionada = index;

    this.style.outline =
    "4px solid red";

    return;

  }

  [
    piezas[seleccionada],
    piezas[index]
  ]
  =
  [
    piezas[index],
    piezas[seleccionada]
  ];

  seleccionada = null;

  renderizar();

  verificarPuzzle();

}

function verificarPuzzle(){

  const completo =
  piezas.every(
    (valor,index)=>
    valor === index
  );

  if(completo){

    mostrarPregunta();

  }

}

function mostrarPregunta(){

  alert(
    puzzleData.pregunta
  );

}