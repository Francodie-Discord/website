document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('page-overlay');
    const container = document.querySelector('.container');

    // 1. Entrée de page : On retire l'overlay proprement
    if (overlay) {
        // Un petit délai pour laisser le temps au navigateur de rendre le CSS
        requestAnimationFrame(() => {
            overlay.classList.add('hidden');
        });
    }

    // 2. Sortie de page : On gère les liens
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');

        // On ne gère que les liens internes qui ne s'ouvrent pas dans un nouvel onglet
        if (
            link && 
            link.href.startsWith(window.location.origin) && 
            !link.hash && 
            link.target !== '_blank'
        ) {
            e.preventDefault();
            const destination = link.href;

            // On fait disparaître le contenu actuel
            if (container) container.classList.add('fade-out');
            
            // On fait revenir l'overlay (optionnel, pour le style)
            if (overlay) {
                overlay.style.transform = "translateY(20px)";
                overlay.classList.remove('hidden');
            }

            // Redirection après l'animation
            setTimeout(() => {
                window.location.href = destination;
            }, 400);
        }
    });

    // 3. Gestion Menu Mobile (Simple et efficace)
    const hamburger = document.getElementById('hamburger');
    const mobileOverlay = document.getElementById('mobile-overlay');

    const toggleMenu = () => document.documentElement.classList.toggle('mobile-open');

    if (hamburger) hamburger.addEventListener('click', toggleMenu);
    if (mobileOverlay) mobileOverlay.addEventListener('click', toggleMenu);
});