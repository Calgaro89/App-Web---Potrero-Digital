
      // Función que obtiene los datos de la API y crea las cards
      function obtenerDatos() {
        // Utilizamos la función fetch para obtener los datos de la API , La función fetch es una API web que permite realizar solicitudes HTTP asincrónicas, lo que significa que puede solicitar datos de recursos en línea sin tener que recargar la página web completa.
        fetch('https://cristiancalgaro-b233f-default-rtdb.firebaseio.com/cursos.json')
        // El navegador enviará una solicitud HTTP GET al servidor que aloja la API para obtener los datos.
        //Luego, la respuesta a esa solicitud se pasa a la función .then(),se crea el objeto response, que guarda la PROMESA Y donde se llama a .json() para convertir los datos en formato JSON a un objeto JavaScript.
          .then(response => response.json())
          .then(data => { //Recibe esos datos y crea la variable data que va a contener todos los datos en formato JSON que se obtienen utilizando la función fetch.
            // Obtener el elemento contenedor para las cards
            const cardDeck = document.getElementById('card-deck');
            cardDeck.innerHTML = ''; //limpia todo lo que hay en la card anterior(esto hace que siempre que se ejecute la funcion la card cargue de nuevo y no muestre info que ya tenga cargado)
            // Iterar sobre los datos y crear una card para cada objeto
            for (let key in data) {  //La variable data contiene los datos en formato JSON que se obtienen utilizando la función fetch.
              const objeto = data[key]; //se utiliza para recorrer los objetos dentro de data. En cada iteración, la variable key tomará el valor de una de las propiedades de data. La variable objeto se utiliza para almacenar el objeto que se encuentra en la posición key de data.

              // Crear un contenedor de columna para la tarjeta
              const col = document.createElement('div');
              col.classList.add('col-md-4', 'mb-4');  // 3 tarjetas por fila (12 / 4 = 3)

              // Crear los elementos HTML para la card
              const card = document.createElement('div');  //Aquí se está creando un nuevo elemento HTML div y asignándolo a la variable card. Luego se agrega la clase "card" a ese elemento utilizando el método classList.add().
              card.classList.add('card');

              const imagen = document.createElement('img');
              imagen.classList.add('card-img-top');
              imagen.src = objeto.imagen;

              const cardBody = document.createElement('div');
              cardBody.classList.add('card-body');

              const titulo = document.createElement('h5');
              titulo.classList.add('card-title');
              titulo.textContent = objeto["nombrecurso"];

              const duracion = document.createElement('p');
              duracion.classList.add('card-text');
              duracion.textContent = 'Duración: ' + objeto.duracion + ' horas';

              const dificultad=document.createElement('p');
              dificultad.classList.add('card-text');
              dificultad.textContent = 'Dificultad: ' + objeto.dificultad;

              switch (objeto.dificultad.toLowerCase()) {
                case 'principiante':
                  dificultad.style.color = 'green';  // Dificultad fácil es verde
                  break;
                case 'medio':
                  dificultad.style.color = 'orange';  // Dificultad media es amarilla
                  break;
                case 'experto':
                  dificultad.style.color = 'red';  // Dificultad experta es roja
                  break;
                default:
                  dificultad.style.color = 'black';  // Si no hay dificultad, color por defecto
              }

              const valor = document.createElement('p');
              valor.classList.add('card-text' , 'valor-curso');
              valor.textContent = 'Valor: $' + objeto.valor;

              const detalle = document.createElement('a');
              detalle.classList.add('btn', 'btn-primary');
              detalle.href = '/detalle_curso/' +key; // key es el id del curso.
              detalle.textContent = "Ver más detalles"


              // Agregar los elementos a la card, crea los elementos HTML que conforman una tarjeta y los agrega en el orden correspondiente, para finalmente agregar la tarjeta completa al contenedor de tarjetas.
              cardBody.appendChild(titulo);
              cardBody.appendChild(duracion);
              cardBody.appendChild(dificultad);
              cardBody.appendChild(valor);
              cardBody.appendChild(detalle);

              card.appendChild(imagen);
              card.appendChild(cardBody);

              // Añadir la tarjeta a la columna
              col.appendChild(card);

               // Añadir la columna al contenedor
              cardDeck.appendChild(col);
            }
          })
          .catch(error => {
            console.error('Error al obtener los datos: ', error);
            alert('Hubo un error al cargar los datos.');
          });
      }

      // Ejecutar la función obtenerDatos al cargar la página
      document.addEventListener('DOMContentLoaded', function() {
        obtenerDatos();
      });

      // Ejecutar la función obtenerDatos cada 5 segundos utilizando setInterval
      //setInterval(obtenerDatos, 5000);
    