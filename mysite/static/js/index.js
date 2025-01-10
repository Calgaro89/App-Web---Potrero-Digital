document.addEventListener("DOMContentLoaded", () => {
    // Seleccionamos el contenedor principal donde se insertará el contenido generado
    const indexContent = document.getElementById("index-content");

    // Crear sección Héroe Principal
    const heroSection = document.createElement('section');
    heroSection.classList.add('hero', 'bg-primary2', 'text-white', 'text-center', 'py-5');
    const heroContainer = document.createElement('div');
    heroContainer.classList.add('container');

    const heroTitle = document.createElement('h1');
    heroTitle.classList.add('display-4', 'font-weight-bold');
    heroTitle.textContent = '¡Aprende desde Casa!';

    const heroParagraph = document.createElement('p');
    heroParagraph.classList.add('lead');
    heroParagraph.textContent = 'Accede a los mejores cursos online en tecnología, negocios, marketing y más.';

    const heroButton = document.createElement('a');
    heroButton.classList.add('btn', 'btn-light', 'btn-lg', 'mt-3');
    heroButton.href = '/cursos';
    heroButton.textContent = 'Ver Cursos';

    heroContainer.append(heroTitle, heroParagraph, heroButton);
    heroSection.appendChild(heroContainer);
    indexContent.appendChild(heroSection);  // Insertar en main-content

    // Crear la sección de Beneficios
    const beneficiosSection = document.createElement('section');
    beneficiosSection.classList.add('beneficios', 'bg-light', 'py-5');
    const beneficiosContainer = document.createElement('div');
    beneficiosContainer.classList.add('container', 'text-center');

    const beneficiosTitle = document.createElement('h2');
    beneficiosTitle.classList.add('mb-4');
    beneficiosTitle.textContent = '¿Por qué elegirnos?';

    const row = document.createElement('div');
    row.classList.add('row');

    // Beneficios - Aprender a tu Ritmo
    const beneficio1 = document.createElement('div');
    beneficio1.classList.add('col-md-4');
    const icon1 = document.createElement('div');
    icon1.classList.add('icon');
    const i1 = document.createElement('i');
    i1.classList.add('fas', 'fa-laptop-code', 'fa-3x');
    icon1.appendChild(i1);

    const h4_1 = document.createElement('h4');
    h4_1.textContent = 'Aprende a tu Ritmo';

    const p1 = document.createElement('p');
    p1.textContent = 'Accede a nuestros cursos en cualquier momento y desde cualquier lugar.';

    beneficio1.append(icon1, h4_1, p1);

    // Beneficios - Certificación Reconocida
    const beneficio2 = document.createElement('div');
    beneficio2.classList.add('col-md-4');
    const icon2 = document.createElement('div');
    icon2.classList.add('icon');
    const i2 = document.createElement('i');
    i2.classList.add('fas', 'fa-certificate', 'fa-3x');
    icon2.appendChild(i2);

    const h4_2 = document.createElement('h4');
    h4_2.textContent = 'Certificación Reconocida';

    const p2 = document.createElement('p');
    p2.textContent = 'Obtén certificados de calidad que podrás agregar a tu CV.';

    beneficio2.append(icon2, h4_2, p2);

    // Beneficios - Comunidad Global
    const beneficio3 = document.createElement('div');
    beneficio3.classList.add('col-md-4');
    const icon3 = document.createElement('div');
    icon3.classList.add('icon');
    const i3 = document.createElement('i');
    i3.classList.add('fas', 'fa-users', 'fa-3x');
    icon3.appendChild(i3);

    const h4_3 = document.createElement('h4');
    h4_3.textContent = 'Comunidad Global';

    const p3 = document.createElement('p');
    p3.textContent = 'Conéctate con estudiantes y expertos de todo el mundo.';

    beneficio3.append(icon3, h4_3, p3);

    row.append(beneficio1, beneficio2, beneficio3);
    beneficiosContainer.append(beneficiosTitle, row);
    beneficiosSection.appendChild(beneficiosContainer);
    indexContent.appendChild(beneficiosSection);  // Insertar en main-content

    // Crear la sección de Testimonios
    const testimoniosSection = document.createElement('section');
    testimoniosSection.classList.add('testimonios', 'py-5');
    const testimoniosContainer = document.createElement('div');
    testimoniosContainer.classList.add('container', 'text-center');

    const testimoniosTitle = document.createElement('h2');
    testimoniosTitle.classList.add('mb-5');
    testimoniosTitle.textContent = 'Lo que dicen nuestros estudiantes';

    const testimoniosRow = document.createElement('div');
    testimoniosRow.classList.add('row', 'justify-content-center');

    // Testimonio 1
    const testimonio1 = document.createElement('div');
    testimonio1.classList.add('col-md-4', 'mb-4');
    const card1 = document.createElement('div');
    card1.classList.add('card');

    const img1 = document.createElement('img');
    img1.classList.add('card-img-top');
    img1.src = "https://th.bing.com/th?q=Foto+Carnet+Personas&w=120&h=120&c=1&rs=1&qlt=90&cb=1&pid=InlineBlock&mkt=es-AR&cc=AR&setlang=es&adlt=moderate&t=1&mw=247";
    img1.alt = "Carlos Pérez";

    const cardBody1 = document.createElement('div');
    cardBody1.classList.add('card-body');

    const blockquote1 = document.createElement('blockquote');
    blockquote1.classList.add('blockquote');
    const p1_testimonio = document.createElement('p');
    p1_testimonio.classList.add('mb-0');
    p1_testimonio.textContent = '"Los cursos son completos, interactivos y muy fáciles de seguir. ¡Aprendí mucho!"';

    blockquote1.appendChild(p1_testimonio);

    const h4_1_testimonio = document.createElement('h4');
    h4_1_testimonio.textContent = 'Carlos Pérez';

    const footer1 = document.createElement('footer');
    footer1.classList.add('blockquote-footer');
    footer1.textContent = 'Estudiante de AWS';

    cardBody1.append(blockquote1, h4_1_testimonio, footer1);
    card1.append(img1, cardBody1);
    testimonio1.appendChild(card1);

    // Testimonio 2
    const testimonio2 = document.createElement('div');
    testimonio2.classList.add('col-md-4', 'mb-4');
    const card2 = document.createElement('div');
    card2.classList.add('card');

    const img2 = document.createElement('img');
    img2.classList.add('card-img-top');
    img2.src = "https://th.bing.com/th?q=Mujer+Normal&w=120&h=120&c=1&rs=1&qlt=90&cb=1&pid=InlineBlock&mkt=es-AR&cc=AR&setlang=es&adlt=moderate&t=1&mw=247";
    img2.alt = "Ana López";

    const cardBody2 = document.createElement('div');
    cardBody2.classList.add('card-body');

    const blockquote2 = document.createElement('blockquote');
    blockquote2.classList.add('blockquote');
    const p2_testimonio = document.createElement('p');
    p2_testimonio.classList.add('mb-0');
    p2_testimonio.textContent = '"Recomiendo ampliamente CursoWeb, ya que pude mejorar mis habilidades y avanzar en mi carrera."';

    blockquote2.appendChild(p2_testimonio);

    const h4_2_testimonio = document.createElement('h4');
    h4_2_testimonio.textContent = 'Ana López';

    const footer2 = document.createElement('footer');
    footer2.classList.add('blockquote-footer');
    footer2.textContent = 'Estudiante de Python';

    cardBody2.append(blockquote2, h4_2_testimonio, footer2);
    card2.append(img2, cardBody2);
    testimonio2.appendChild(card2);

    // Testimonio 3 (continuación)
    const testimonio3 = document.createElement('div');
    testimonio3.classList.add('col-md-4', 'mb-4');
    const card3 = document.createElement('div');
    card3.classList.add('card');

    const img3 = document.createElement('img');
    img3.classList.add('card-img-top');
    img3.src = "https://th.bing.com/th?q=Personas+Foto+De+Perfil&w=120&h=120&c=1&rs=1&qlt=90&cb=1&pid=InlineBlock&mkt=es-AR&cc=AR&setlang=es&adlt=moderate&t=1&mw=247";
    img3.alt = "Juan García";

    const cardBody3 = document.createElement('div');
    cardBody3.classList.add('card-body');

    const blockquote3 = document.createElement('blockquote');
    blockquote3.classList.add('blockquote');
    const p3_testimonio = document.createElement('p');
    p3_testimonio.classList.add('mb-0');
    p3_testimonio.textContent = '"Excelente plataforma de aprendizaje, con material actualizado y de gran calidad."';

    blockquote3.appendChild(p3_testimonio);

    const h4_3_testimonio = document.createElement('h4');
    h4_3_testimonio.textContent = 'Juan García';

    const footer3 = document.createElement('footer');
    footer3.classList.add('blockquote-footer');
    footer3.textContent = 'Estudiante de Salesforce';

    cardBody3.append(blockquote3, h4_3_testimonio, footer3);
    card3.append(img3, cardBody3);
    testimonio3.appendChild(card3);

    // Añadir testimonios a la fila
    testimoniosRow.append(testimonio1, testimonio2, testimonio3);
    testimoniosContainer.append(testimoniosTitle, testimoniosRow);
    testimoniosSection.appendChild(testimoniosContainer);

    // Añadir la sección de testimonios a la página
    indexContent.appendChild(testimoniosSection);  // Insertar en index-content
});
