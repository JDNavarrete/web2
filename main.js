//Activating Mobile Menu

const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId);
    const nav = document.getElementById(navId);

    if(toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show');
        })
    }
}

showMenu('nav-toggle', 'nav-menu');

//Toggling Menu by clicking in mobile menu links

const navLink = document.querySelectorAll('.nav-link');

function linkAction() {
    navLink.forEach(n => n.classList.remove('active'));
    this.classList.add('active');

    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show');
}

navLink.forEach(n => n.addEventListener('click', linkAction));

// Changing Active Menu section while scrolling

const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', scrollActive);

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active');
        } else {
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active');
        }
    })
}

// Scroll Reveal Settings

const sr = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 2000,
    reset: true
})

sr.reveal('.home-title', {});
sr.reveal('.home-scroll', {delay: 200});
sr.reveal('.home-img', {origin: 'right', delay: 400 });

sr.reveal('.about-img', {delay: 500});
sr.reveal('.about-subtitle', {delay: 300});
sr.reveal('.about-profession', {delay: 400});
sr.reveal('.about-text', {delay: 500});
sr.reveal('.about-social-icon', {delay: 600, interval: 200});

sr.reveal('.skills-subtitle', {});
sr.reveal('.skills-name', {distance: '20px', delay: 50, interval: 100});
sr.reveal('.skills-img', {delay: 400});

sr.reveal('.portfolio-img', {interval: 200});

sr.reveal('.contact-subtitle', {});
sr.reveal('.contact-text', {interval: 200});
sr.reveal('.contact-input', {delay: 400});
sr.reveal('.contact-button', {delay: 600});


// Lightbox mejorado
document.querySelectorAll('.portfolio-img').forEach(img => {
    img.addEventListener('click', (e) => {
        e.preventDefault();
        
        const imgElement = img.querySelector('img');
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxText = document.getElementById('lightbox-text');
        
        // Cargar contenido
        lightboxImg.src = imgElement.src;
        lightboxImg.alt = imgElement.alt;
        lightboxText.textContent = imgElement.dataset.description || "Descripción no disponible";
        
        // Mostrar lightbox
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Bloquear scroll de fondo
    });
});

// Cerrar lightbox
document.querySelector('.close-lightbox').addEventListener('click', closeLightbox);
document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target === document.getElementById('lightbox')) {
        closeLightbox();
    }
});

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
    document.body.style.overflow = 'auto'; // Restaurar scroll
}

// Cerrar al hacer clic fuera de la imagen
document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target === document.getElementById('lightbox')) {
        document.getElementById('lightbox').style.display = 'none';
    }
});
// =============================================
// FORMULARIO DE CONTACTO
// =============================================

document.getElementById('contactForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = this;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    try {
        // Feedback visual durante el envío
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';

        // Enviar datos a FormSubmit
        const response = await fetch('https://formsubmit.co/ajax/navarretedamianj@gmail.com', {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Error al enviar');

        // Mostrar alerta de éxito
        await Swal.fire({
            title: '¡Éxito!',
            text: 'Mensaje enviado correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });

        // Resetear formulario
        form.reset();

    } catch (error) {
        // Mostrar alerta de error
        await Swal.fire({
            title: 'Error',
            text: error.message.includes('Failed to fetch') 
                ? 'Problema de conexión. Verifica tu internet.' 
                : 'Error al enviar el mensaje. Intenta nuevamente.',
            icon: 'error',
            confirmButtonText: 'Entendido'
        });
    } finally {
        // Restaurar el botón
        submitButton.disabled = false;
        submitButton.textContent = originalText;
    }
});