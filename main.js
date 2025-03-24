// Activar Menú Móvil
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId);
    const nav = document.getElementById(navId);

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show');
        });
    }
};

showMenu('nav-toggle', 'nav-menu');

// Alternar Menú al hacer clic en los enlaces del menú móvil
const navLink = document.querySelectorAll('.nav-link');

function linkAction() {
    navLink.forEach(n => n.classList.remove('active'));
    this.classList.add('active');

    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show');
}

navLink.forEach(n => n.addEventListener('click', linkAction));

// Cambiar la sección activa del menú al desplazarse
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', scrollActive);

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active');
        } else {
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active');
        }
    });
}

// Ocultar la introducción después de un tiempo
document.addEventListener('DOMContentLoaded', function () {
    const introOverlay = document.getElementById('intro-overlay');
    const pageContent = document.getElementById('page-content');

    // Esperar 3 segundos antes de comenzar la animación
    setTimeout(() => {
        introOverlay.classList.add('hide'); // Aplicar la clase para ocultar
    }, 3000);

    // Eliminar el overlay del DOM después de la animación
    introOverlay.addEventListener('transitionend', function () {
        if (introOverlay.classList.contains('hide')) {
            introOverlay.remove(); // Eliminar el overlay

            // Mostrar el contenido de la página
            pageContent.style.display = 'block';

            // Inicializar los efectos de la página después de que el overlay desaparezca
            initializePageEffects();
        }
    });
});

// Función para inicializar los efectos de la página
function initializePageEffects() {
    // Configuración de ScrollReveal
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '100px',
        duration: 800,
        delay: 200,
        reset: true
    });

    // Aplicar efecto al texto
    sr.reveal('.texto-ini', {
        opacity: 0,
        transform: 'translateY(100%)',
        easing: 'ease-out',
        delay: 200,
        afterReveal: function (domEl) {
            domEl.style.opacity = '1';
            domEl.style.transform = 'translateY(0)';
        }
    });

    // Aplicar efectos a otros elementos
    sr.reveal('.home-title', {});
    sr.reveal('.home-scroll', { delay: 200 });
    sr.reveal('.home-img', { origin: 'right', delay: 400 });
    sr.reveal('.about-img', { delay: 500 });
    sr.reveal('.about-subtitle', { delay: 300 });
    sr.reveal('.about-profession', { delay: 400 });
    sr.reveal('.about-text', { delay: 500 });
    sr.reveal('.about-social-icon', { delay: 600, interval: 200 });

    sr.reveal('.skills-subtitle', {});
    sr.reveal('.skills-name', { distance: '20px', delay: 50, interval: 100 });
    sr.reveal('.skills-img', { delay: 400 });

    sr.reveal('.portfolio-img', { interval: 200 });

    sr.reveal('.contact-subtitle', {});
    sr.reveal('.contact-text', { interval: 200 });
    sr.reveal('.contact-input', { delay: 400 });
    sr.reveal('.contact-button', { delay: 600 });
    // Inicializar otros efectos de la página (Expanding Cards, Vertical Slider, etc.)
    initializeExpandingCards();
    initializeVerticalSlider();
}

// Función para inicializar Expanding Cards
function initializeExpandingCards() {
    const panels = document.querySelectorAll('.panel');
    let activeIndex = 0;

    function autoExpandPanels() {
      // Remover la clase 'active' de todos los paneles
      panels.forEach(panel => panel.classList.remove('active'));

      // Agregar la clase 'active' al panel actual
      panels[activeIndex].classList.add('active');

      // Incrementar el índice para el siguiente panel
      activeIndex = (activeIndex + 1) % panels.length;
    }

    setInterval(autoExpandPanels, 6000);
    autoExpandPanels();
}

// Función para inicializar Vertical Slider
function initializeVerticalSlider() {
    const sliderContainer = document.querySelector('.slider-container');
    const slideRight = document.querySelector('.right-slide');
    const slideLeft = document.querySelector('.left-slide');
    const slidesLength = slideRight.querySelectorAll('div').length;

    let activeSlideIndex = 0;

    slideLeft.style.top = `-${(slidesLength - 1) * 100}vh`;

    setInterval(() => {
        changeSlide('up');
    }, 3000);

    const changeSlide = (direction) => {
        const sliderHeight = sliderContainer.clientHeight;

        if (direction === 'up') {
            activeSlideIndex++;
            if (activeSlideIndex > slidesLength - 1) {
                activeSlideIndex = 0;
            }
        } else if (direction === 'down') {
            activeSlideIndex--;
            if (activeSlideIndex < 0) {
                activeSlideIndex = slidesLength - 1;
            }
        }

        slideRight.style.transform = `translateY(-${activeSlideIndex * sliderHeight}px)`;
        slideLeft.style.transform = `translateY(${activeSlideIndex * sliderHeight}px)`;
    };
}

