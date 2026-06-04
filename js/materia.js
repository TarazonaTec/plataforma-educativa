const params =
new URLSearchParams(window.location.search);

const tema =
params.get("tema");


fetch(`data/${tema}/temas.json`)
  .then(res => res.json())
  .then(data => {

    const container =
    document.getElementById("contenedor");
    

    container.innerHTML = "";

    data.forEach(item => {

      let rutaJuego = "";

      // Detectar tipo de juego
      if(item.juego === "quiz"){

        rutaJuego =
        `juegos/quiz.html?curso=${tema}&quiz=${item.archivo}`;

      }

      else if(item.juego === "vf"){

        rutaJuego =
        `juegos/vf.html?curso=${tema}&quiz=${item.archivo}`;

      }

      else if(item.juego === "memoria"){

        rutaJuego =
        `juegos/memoria.html?curso=${tema}&quiz=${item.archivo}`;

      }

      else if(item.juego === "arrastrar"){

        rutaJuego =
        `juegos/arrastrar.html?curso=${tema}&quiz=${item.archivo}`;

      }

      container.innerHTML += `

        <div class="card">

          <h2>${item.nombre}</h2>

          <p>${item.descripcion}</p>

          <small>${item.tipo}</small>

          <br><br>

          <a href="${rutaJuego}">
            Jugar
          </a>

        </div>

      `;

    });

  });