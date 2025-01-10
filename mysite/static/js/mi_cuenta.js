// Función para crear elementos dinámicamente
function crearElemento(tag, atributos = {}, contenido = "") {
    const elemento = document.createElement(tag);
    for (const [clave, valor] of Object.entries(atributos)) {
        elemento.setAttribute(clave, valor);
    }
    if (contenido) elemento.innerHTML = contenido;
    return elemento;
}

// Función para construir la página de "Mi Cuenta"
function construirMiCuenta() {
    const contenedor = document.getElementById("mi-cuenta-container");

    // Mostrar el nombre del usuario
    const nombreUsuario = document.getElementById("user-name");
    nombreUsuario.textContent = `Mi Cuenta - ${datosUsuario.userName}`;

    // Mostrar mensajes flash
    if (datosUsuario.mensajesFlash && datosUsuario.mensajesFlash.length > 0) {
        const mensaje = datosUsuario.mensajesFlash[0];
        const alerta = crearElemento("div", { class: `alert alert-${mensaje.tipo}` }, mensaje.mensaje);
        contenedor.appendChild(alerta);
    }

    // Mostrar cursos adquiridos
    const tituloCursos = crearElemento("h3", {}, "Mis Cursos Adquiridos");
    contenedor.appendChild(tituloCursos);

    if (datosUsuario.cursos && datosUsuario.cursos.length > 0) {
        const listaCursos = crearElemento("ul", { class: "list-group" });

        datosUsuario.cursos.forEach((curso) => {
            const itemCurso = crearElemento("li", { class: "list-group-item" });
            const tituloCurso = crearElemento("strong", {}, curso.nombrecurso);
            const descripcionCurso = crearElemento("span", {}, `<br>${curso.descripcion}`);

            itemCurso.appendChild(tituloCurso);
            itemCurso.appendChild(descripcionCurso);
            listaCursos.appendChild(itemCurso);
        });

        contenedor.appendChild(listaCursos);
    } else {
        const noCursos = crearElemento("p", {}, "No has adquirido ningún curso aún.");
        contenedor.appendChild(noCursos);
    }

    // Añadir enlaces adicionales
    const enlaceCursos = crearElemento("p", {});
    const enlaceVerCursos = crearElemento("a", { href: "/cursos" }, "Adquirir más cursos");
    enlaceCursos.appendChild(enlaceVerCursos);

    const enlaceLogout = crearElemento("p", {});
    const enlaceCerrarSesion = crearElemento("a", { href: "/logout" }, "Cerrar sesión");
    enlaceLogout.appendChild(enlaceCerrarSesion);

    const botonEditar = crearElemento("button", { class: "btn btn-primary", id: "editar-btn" }, "CAMBIAR CONTRASEÑA");
    botonEditar.addEventListener("click", function () {
    window.location.href = "/editar_perfil";  // Redirige al formulario de edición
});
contenedor.appendChild(botonEditar);

    contenedor.appendChild(enlaceCursos);
    contenedor.appendChild(enlaceLogout);
}

// Ejecutar la función para construir la página al cargar el DOM
document.addEventListener("DOMContentLoaded", construirMiCuenta);



