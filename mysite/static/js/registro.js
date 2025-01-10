// Función para crear elementos de formulario dinámicamente
function crearElemento(tag, atributos = {}, contenido = "") {
    const elemento = document.createElement(tag);
    for (const [clave, valor] of Object.entries(atributos)) {
        elemento.setAttribute(clave, valor);
    }
    if (contenido) elemento.innerHTML = contenido;
    return elemento;
}

// Construcción dinámica del formulario
function crearFormulario() {
    const contenedor = document.getElementById("registro-container");

    // Título
    const titulo = crearElemento("h2", {}, "Crear Cuenta");
    contenedor.appendChild(titulo);

    // Contenedor para mensajes flash
    const mensajeFlash = crearElemento("div", { class: "alert", style: "display: none;" });
    contenedor.appendChild(mensajeFlash);

    // Formulario
    const formulario = crearElemento("form", { id: "registro-form", method: "POST" });

    // Campos
    const campos = [
        { label: "Nombre", id: "nombre", type: "text", name: "nombre", required: true },
        { label: "Correo Electrónico", id: "email", type: "email", name: "email", required: true },
        { label: "Contraseña", id: "password", type: "password", name: "password", required: true },
    ];

    campos.forEach(campo => {
        const div = crearElemento("div", { class: "mb-3" });
        const label = crearElemento("label", { for: campo.id, class: "form-label" }, campo.label);
        const input = crearElemento("input", {
            type: campo.type,
            class: "form-control",
            id: campo.id,
            name: campo.name,
            required: campo.required,
        });

        div.appendChild(label);
        div.appendChild(input);
        formulario.appendChild(div);
    });

    // Botón de registro
    const botonRegistrar = crearElemento("button", { type: "submit", class: "btn btn-primary" }, "Registrar");
    formulario.appendChild(botonRegistrar);

    // Enlace a iniciar sesión
    const enlaceLogin = crearElemento("p", { class: "mt-3" });
    const enlace = crearElemento("a", { href: "/login" }, "Iniciar sesión");
    enlaceLogin.innerHTML = "¿Ya tienes una cuenta? ";
    enlaceLogin.appendChild(enlace);

    contenedor.appendChild(formulario);
    contenedor.appendChild(enlaceLogin);

    // Manejar el envío del formulario
    formulario.addEventListener("submit", async (e) => {
        e.preventDefault(); // Evita el envío predeterminado del formulario

        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        try {
            const response = await fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nombre, email, password }),
            });

            const data = await response.json();

            mensajeFlash.style.display = "block";
            mensajeFlash.className = `alert alert-${data.type}`;
            mensajeFlash.textContent = data.message;

            if (response.ok) {
                // Redirigir al login después de éxito
                setTimeout(() => {
                    window.location.href = "/login";
                }, 2000);
            }
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
        }
    });
}

// Ejecutar la función al cargar el DOM
document.addEventListener("DOMContentLoaded", crearFormulario);
