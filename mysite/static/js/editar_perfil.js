// Función para crear elementos de formulario dinámicamente
function crearElemento(tag, atributos = {}, contenido = "") {
    const elemento = document.createElement(tag);
    for (const [clave, valor] of Object.entries(atributos)) {
        elemento.setAttribute(clave, valor);
    }
    if (contenido) elemento.innerHTML = contenido;
    return elemento;
}

// Función para construir el formulario de edición de perfil
function crearFormularioEdicion() {
    const contenedor = document.getElementById("formulario-editar-container");

    // Título
    const titulo = crearElemento("h2", {}, "Cambiar Contraseña");
    contenedor.appendChild(titulo);

    // Formulario
    const formulario = crearElemento("form", { id: "editar-form", method: "POST" });

    // Campos del formulario
    const campos = [
        { label: "Nombre", id: "nombre", type: "text", name: "nombre", required: true, value: datosUsuario.userName, readonly: true},
        { label: "Correo Electrónico", id: "email", type: "email", name: "email", required: true, value: datosUsuario.email, readonly: true },  // 'readonly' solo para el correo
        { label: "Contraseña Actual", id: "contrasena_actual", type: "password", name: "contrasena_actual", required: true },
        { label: "Nueva Contraseña (Opcional)", id: "nueva_contrasena", type: "password", name: "nueva_contrasena", required: false},
    ];

    // Crear los campos del formulario
    campos.forEach(campo => {
        const div = crearElemento("div", { class: "form-group" });

        const label = crearElemento("label", { for: campo.id, class: "form-label" }, campo.label);
        div.appendChild(label);

        const input = crearElemento("input", {
            type: campo.type,
            class: "form-control",
            id: campo.id,
            name: campo.name,
            required: campo.required,
        });
        if (campo.value) input.value = campo.value; // Establecer el valor inicial si está definido.
        if (campo.readonly) input.setAttribute("readonly", true); // Agregar explicitamente readonly solo si corresponde.
        div.appendChild(input);
        formulario.appendChild(div);
    });

    // Botón de "Guardar Cambios"
    const botonGuardar = crearElemento("button", { type: "submit", class: "btn-primary" }, "Guardar Cambios");
    formulario.appendChild(botonGuardar);

    contenedor.appendChild(formulario);

    // Manejar el envío del formulario
    formulario.addEventListener("submit", async (e) => {
        e.preventDefault(); // Evita el envío predeterminado del formulario

        const nombre = document.getElementById("nombre").value.trim();
        const contrasena_actual = document.getElementById("contrasena_actual").value;
        const nueva_contrasena = document.getElementById("nueva_contrasena").value;

        try {
            const response = await fetch("/editar_perfil", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nombre,
                    contrasena_actual,
                    nueva_contrasena
                }),
            });

            const data = await response.json();

            // Mostrar mensaje de éxito o error
            const mensajeFlash = crearElemento("div", { class: `alert alert-${data.type}` }, data.message);
            contenedor.appendChild(mensajeFlash);

            // Si la operación es exitosa, redirigir al perfil
            if (response.ok) {
                setTimeout(() => {
                    window.location.href = "/mi_cuenta";
                }, 2000);
            }
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
        }
    });
}

// Ejecutar la función al cargar el DOM
document.addEventListener("DOMContentLoaded", crearFormularioEdicion);
