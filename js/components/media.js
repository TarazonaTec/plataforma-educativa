function mostrarMedia(
    contenedor,
    datos
){

    contenedor.innerHTML = "";

    if(datos.imagen){

        contenedor.innerHTML = `
            <img
                src="${datos.imagen}"
                class="pregunta-img"
            >
        `;

        return;

    }

    if(datos.video){

        contenedor.innerHTML = `
            <video
                class="pregunta-video"
                controls
            >
                <source
                    src="${datos.video}"
                    type="video/mp4">
            </video>
        `;

        return;

    }

    if(datos.youtube){

        contenedor.innerHTML = `
            <iframe
                width="315"
                height="576"
                src="https://www.youtube.com/embed/${datos.youtube}"
                allowfullscreen>
            </iframe>
        `;

    }

}
