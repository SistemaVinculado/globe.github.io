document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggler
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    themeToggle.addEventListener('click', () => {
        if (body.dataset.theme === 'dark') {
            body.dataset.theme = 'light';
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            body.dataset.theme = 'dark';
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });

    // Mobile Menu
    const menuHamburger = document.querySelector('.menu-hamburger');
    const navLinks = document.querySelector('.nav-links');

    menuHamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // ScrollReveal
    const sr = ScrollReveal({
        distance: '50px',
        duration: 1500,
        reset: true
    });

    sr.reveal('.hero-content', { origin: 'top' });
    sr.reveal('.about-content', { origin: 'left' });
    sr.reveal('.about-image', { origin: 'right' });
    sr.reveal('.project-card', { interval: 200 });
    sr.reveal('.tech-icon', { interval: 100 });

    // Typed.js
    new Typed('.typed-text', {
        strings: ["Seu Nome", "Desenvolvedor Web", "Freelancer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });
});
