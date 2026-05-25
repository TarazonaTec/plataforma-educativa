fetch("data/materia/materias.json")
  .then(res => res.json())
  .then(data => {

    const container =
    document.getElementById("materias");

    data.forEach(materia => {

      container.innerHTML += `
        <a
          class="card"
          href="materia.html?tema=${materia.slug}"
        >

          <div class="icono">
            ${materia.icono}
          </div>

          <div>
            ${materia.nombre}
          </div>

        </a>
      `;
    });

  });