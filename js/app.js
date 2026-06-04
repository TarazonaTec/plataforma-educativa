fetch("data/materia/materias.json")
  .then(res => res.json())
  .then(data => {

    const container =
    document.getElementById("materias");

    data.forEach(materia => {

      container.innerHTML += `

        <div class="card materia-card">

          <div class="icono">
            ${materia.icono}
          </div>

          <div class="nombre">
            ${materia.nombre}
          </div>

          <a
            class="btn btn-primary"
            href="materia.html?tema=${materia.slug}"
          >
            Entrar
          </a>

        </div>

      `;

    });

  });