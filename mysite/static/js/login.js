document.addEventListener("DOMContentLoaded", function () {
    construirLogin();
});

// Función para crear elementos HTML dinámicamente
function crearElemento(tag, atributos = {}, contenido = "") {
    const elemento = document.createElement(tag);
    for (const [clave, valor] of Object.entries(atributos)) {
        elemento.setAttribute(clave, valor);
    }
    if (contenido) elemento.innerHTML = contenido;
    return elemento;
}

// Función para construir el formulario de login dinámicamente
function construirLogin() {
    const contenedor = document.getElementById("login-container");

    // Título
    const titulo = crearElemento("h2", {}, "Iniciar sesión");
    contenedor.appendChild(titulo);

    // Formulario
    const formulario = crearElemento("form", { method: "POST", id: "login-form" });
    formulario.addEventListener('submit', loginUsuario);

    // Grupo de correo
    const emailGroup = crearElemento("div", { class: "mb-3" });
    const emailLabel = crearElemento("label", { for: "email", class: "form-label" }, "Correo Electrónico");
    const emailInput = crearElemento("input", { type: "email", class: "form-control", id: "email", name: "email", required: true });
    emailGroup.appendChild(emailLabel);
    emailGroup.appendChild(emailInput);

    // Grupo de contraseña
    const passwordGroup = crearElemento("div", { class: "mb-3" });
    const passwordLabel = crearElemento("label", { for: "password", class: "form-label" }, "Contraseña");
    const passwordInput = crearElemento("input", { type: "password", class: "form-control", id: "password", name: "password", required: true });
    passwordGroup.appendChild(passwordLabel);
    passwordGroup.appendChild(passwordInput);

    // Botón de submit
    const submitButton = crearElemento("button", { type: "submit", class: "btn btn-primary" }, "Iniciar sesión");

    formulario.appendChild(emailGroup);
    formulario.appendChild(passwordGroup);
    formulario.appendChild(submitButton);

    contenedor.appendChild(formulario);

    // Enlace para registrarse
    const registroEnlace = crearElemento("p", { class: "mt-3" });
    const registroLink = crearElemento("a", { href: "/register" }, "Registrarse");
    registroEnlace.innerHTML = "¿No tienes cuenta? ";
    registroEnlace.appendChild(registroLink);

    contenedor.appendChild(registroEnlace);
}

// Función para manejar el login (autenticación)
async function loginUsuario(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    // Mostrar el mensaje flash
    mostrarMensaje(data.message, data.type);

    // Si el login es exitoso, redirigir al usuario
    if (data.type === 'success') {
        setTimeout(() => {
            window.location.href = '/mi_cuenta'; // Redirigir al dashboard o cursos
        }, 1500);
    }
}

// Función para mostrar mensajes flash (de éxito o error)
function mostrarMensaje(mensaje, tipo) {
    const contenedor = document.getElementById("login-container");

    // Eliminar mensajes previos
    const mensajesAnteriores = contenedor.querySelectorAll('.alert');
    mensajesAnteriores.forEach(alert => alert.remove());

    // Crear el nuevo mensaje de alerta
    const alerta = crearElemento("div", { class: `alert alert-${tipo} mt-3` }, mensaje);
    contenedor.appendChild(alerta);
}
