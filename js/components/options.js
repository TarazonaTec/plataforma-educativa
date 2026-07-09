function mostrarOpciones(contenedor, opciones, callback) {

    // Limpiar opciones anteriores
    contenedor.innerHTML = "";

    opciones.forEach((opcion, index) => {

        const boton = document.createElement("button");

        boton.className = "opcion";

        boton.textContent = opcion;

        boton.addEventListener("click", () => {

            callback(index);

        });

        contenedor.appendChild(boton);

    });

}
