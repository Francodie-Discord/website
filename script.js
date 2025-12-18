document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const htmlEl = document.documentElement;

    const toggleMenu = () => htmlEl.classList.toggle('mobile-open');
    const closeMenu = () => htmlEl.classList.remove('mobile-open');

    if (hamburger) hamburger.addEventListener('click', toggleMenu);
    if (mobileOverlay) mobileOverlay.addEventListener('click', closeMenu);

    // Fermer le menu si on clique sur un lien à l'intérieur
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
});