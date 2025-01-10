// Función para crear un elemento con clases y contenido opcionales
function createElement(tag, className = '', content = '') {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (content) element.innerHTML = content;
    return element;
}

// Contenedor principal
const container = document.createElement('section');
container.className = 'quienes-somos py-5';

// Crear el contenedor principal
const mainContainer = createElement('div', 'container text-center');

// Título principal
const title = createElement('h2', 'mb-5 text-primary font-weight-bold', '¿Quiénes Somos?');

// Descripción principal
const description = createElement(
    'p',
    'lead mb-4 text-muted',
    '<strong>CursoWeb</strong> es una plataforma educativa que ofrece cursos online en las áreas más demandadas, con el objetivo de ayudarte a aprender nuevas habilidades y avanzar en tu carrera profesional.'
);

// Fila de tarjetas
const row = createElement('div', 'row');

// Primera tarjeta: Nuestra Misión
const missionCard = createElement('div', 'col-md-6 mb-4');
const missionCardInner = createElement('div', 'card shadow-lg border-light rounded p-4');
const missionTitle = createElement('h3', 'text-dark font-weight-bold mb-3', 'Nuestra Misión');
const missionText = createElement(
    'p',
    'text-muted',
    'Proveer educación de alta calidad a través de cursos interactivos, accesibles desde cualquier lugar del mundo. Queremos facilitar el aprendizaje en tecnología, marketing, negocios, y más, para que puedas lograr tus objetivos.'
);
missionCardInner.appendChild(missionTitle);
missionCardInner.appendChild(missionText);
missionCard.appendChild(missionCardInner);

// Segunda tarjeta: Nuestros Valores
const valuesCard = createElement('div', 'col-md-6 mb-4');
const valuesCardInner = createElement('div', 'card shadow-lg border-light rounded p-4');
const valuesTitle = createElement('h3', 'text-dark font-weight-bold mb-3', 'Nuestros Valores');
const valuesList = createElement('ul', 'list-unstyled');
const values = [
    'Compromiso con la calidad',
    'Innovación constante',
    'Accesibilidad para todos',
    'Aprendizaje práctico y útil'
];
values.forEach(value => {
    const listItem = createElement('li', 'mb-2', `<i class="fas fa-check-circle text-success"></i> <strong>${value}</strong>`);
    valuesList.appendChild(listItem);
});
valuesCardInner.appendChild(valuesTitle);
valuesCardInner.appendChild(valuesList);
valuesCard.appendChild(valuesCardInner);

// Añadir las tarjetas a la fila
row.appendChild(missionCard);
row.appendChild(valuesCard);

// Sección "¿Por qué elegirnos?"
const whyChooseUsTitle = createElement('h3', 'my-5 text-primary font-weight-bold', '¿Por qué elegirnos?');
const whyChooseUsText = createElement(
    'p',
    'text-muted mb-5',
    'Contamos con un equipo de expertos y profesores que crean contenido educativo de vanguardia. Además, ofrecemos soporte en vivo para que tu experiencia de aprendizaje sea aún mejor.'
);

// Imagen del equipo
const imageContainer = createElement('div', 'mt-5');
const teamImage = createElement('img', 'img-fluid rounded shadow-lg');
teamImage.src = '/static/img/equipo.jpg';
teamImage.alt = 'Equipo CursoWeb';
imageContainer.appendChild(teamImage);

// Ensamblar todo el contenido
mainContainer.appendChild(title);
mainContainer.appendChild(description);
mainContainer.appendChild(row);
mainContainer.appendChild(whyChooseUsTitle);
mainContainer.appendChild(whyChooseUsText);
mainContainer.appendChild(imageContainer);

// Añadir el contenido principal al contenedor
container.appendChild(mainContainer);

// Añadir el contenedor a la página
document.getElementById('dynamic-content').appendChild(container);
