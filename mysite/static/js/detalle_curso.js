// Obtener el parámetro 'id' de la URL
const urlParams = new URLSearchParams(window.location.search);
const cursoId = window.location.pathname.split('/').pop(); // Esto obtiene el último segmento de la URL

// Realizar una petición a la API para obtener los detalles del curso con el 'id' proporcionado
fetch('https://cristiancalgaro-b233f-default-rtdb.firebaseio.com/cursos/' + cursoId + '.json')
  .then(response => response.json())
  .then(curso => {
    const descripcionContainer = document.getElementById('descripcion-container');

    // Crear elementos HTML para mostrar los detalles del curso
    const container = document.createElement('div');
    container.classList.add('curso-detalle-container');

    const nombreTitulo = document.createElement('h2');
    nombreTitulo.classList.add('titulo-seccion');
    nombreTitulo.textContent = 'Nombre del Curso';

    const nombre = document.createElement('h3');
    nombre.classList.add('nombre-curso');
    nombre.textContent = curso.nombrecurso;

    const imagenContainer = document.createElement('div');
    imagenContainer.classList.add('imagen-container');
    const imagen = document.createElement('img');
    imagen.src = curso.imagen;
    imagen.alt = curso.nombrecurso;
    imagen.classList.add('img-curso');

    const descripcionTitulo = document.createElement('h2');
    descripcionTitulo.classList.add('titulo-seccion');
    descripcionTitulo.textContent = 'Descripción';

    const descripcionTxt = document.createElement('p');
    descripcionTxt.classList.add('descripcion-curso');
    descripcionTxt.textContent = curso.descripcion;

    const valorContainer = document.createElement('div');
    valorContainer.classList.add('valor-container');
    const valorTitulo = document.createElement('h2');
    valorTitulo.classList.add('titulo-seccion');
    valorTitulo.textContent = 'Valor';

    const valor = document.createElement('p');
    valor.classList.add('valor-curso');
    valor.textContent = '$' + curso.valor;

    // Crear el botón "Adquirir Curso"
    const adquirir = document.createElement('button');
    adquirir.classList.add('btn', 'btn-adquirir');
    adquirir.textContent = "Adquirir Curso";
    adquirir.addEventListener('click', function () {
      // Verificar si el usuario está logueado
      fetch('/verificar_login', { method: 'GET' })
        .then(response => response.json())
        .then(data => {
          if (data.logged_in) {
            // Si está logueado, proceder con la adquisición
            fetch(`/adquirir_curso/${cursoId}`, { method: 'POST' })
              .then(response => {
                if (response.ok) {
                  Swal.fire({
                    icon: 'success',
                    title: '¡Curso adquirido!',
                    text: 'Has adquirido el curso con éxito.',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#4caf50',
                  }).then(() => {
                    window.location.href = '/gracias';
                  });
                } else {
                  Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al adquirir el curso. Inténtalo nuevamente.',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#f44336',
                  });
                }
              });
          } else {
            // Mostrar alerta de inicio de sesión requerido
            Swal.fire({
              icon: 'info',
              title: 'Inicia sesión',
              text: 'Debes iniciar sesión para adquirir este curso.',
              showCancelButton: true,
              confirmButtonText: 'Iniciar sesión',
              cancelButtonText: 'Cancelar',
              confirmButtonColor: '#007bff',
              cancelButtonColor: '#6c757d',
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = '/login';
              }
            });
          }
        })
        .catch(error => {
          console.error('Error al verificar el estado de login:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al verificar tu estado de inicio de sesión.',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#f44336',
          });
        });
    });

    // Crear el botón "Regresar a Cursos"
    const regresarBtn = document.createElement('button');
    regresarBtn.classList.add('btn', 'btn-regresar');
    regresarBtn.textContent = 'Regresar';
    regresarBtn.addEventListener('click', function() {
      window.location.href = '/cursos';  // Redirige a la página de cursos
    });

    // Contenedor para los botones (uno a la izquierda y otro al centro)
    const botonesContainer = document.createElement('div');
    botonesContainer.classList.add('botones-container');
    botonesContainer.appendChild(regresarBtn);
    botonesContainer.appendChild(adquirir);

    // Añadir todo al contenedor principal
    container.appendChild(nombreTitulo);
    container.appendChild(nombre);
    container.appendChild(imagenContainer);
    imagenContainer.appendChild(imagen);
    container.appendChild(descripcionTitulo);
    container.appendChild(descripcionTxt);
    container.appendChild(valorContainer);
    valorContainer.appendChild(valorTitulo);
    valorContainer.appendChild(valor);
    container.appendChild(botonesContainer); // Añadir contenedor de botones

    descripcionContainer.appendChild(container);
  })
  .catch(error => {
    console.error('Error:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema al cargar los detalles del curso.',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#f44336',
    });
  });
