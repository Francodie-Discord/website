(function() {
    const DURATION = 420; // Durée de la transition CSS

    /**
     * GESTION DE L'OVERLAY DE CHARGEMENT
     */
    function hideOverlay() {
        const overlay = document.getElementById('page-overlay');
        if (overlay) {
            overlay.classList.add('hidden');
        }
    }

    function showOverlay() {
        const overlay = document.getElementById('page-overlay');
        if (overlay) {
            overlay.classList.remove('hidden');
        }
    }

    // Masquer l'overlay dès que la page est chargée
    if (document.readyState === 'complete') {
        hideOverlay();
    } else {
        window.addEventListener('load', hideOverlay);
    }

    // Sécurité : au cas où le chargement prendrait trop de temps (ex: image manquante)
    // On force l'affichage après 1.5 seconde maximum
    setTimeout(hideOverlay, 1500);

    /**
     * GESTION DES TRANSITIONS ENTRE PAGES
     */
    document.addEventListener('click', (e) => {
        const a = e.target.closest('a');
        
        // On ignore si : pas de lien, lien externe, lien vers une ancre (#), ou target="_blank"
        if (!a || !a.href) return;
        if (a.target === '_blank') return;
        if (a.href.includes('#')) return;
        if (!a.href.startsWith(window.location.origin)) return;

        // Si c'est un lien interne (index.html ou staff.html)
        e.preventDefault();
        const targetHref = a.href;
        
        showOverlay();

        // On change de page après la durée de l'animation
        setTimeout(() => {
            window.location.href = targetHref;
        }, DURATION);
    });

    /**
     * GESTION DU MENU MOBILE
     */
    const hamburger = document.getElementById('hamburger');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const htmlEl = document.documentElement;

    function toggleMenu() {
        htmlEl.classList.toggle('mobile-open');
        const isOpen = htmlEl.classList.contains('mobile-open');
        
        const menu = document.getElementById('mobile-menu');
        if (menu) {
            menu.setAttribute('aria-hidden', !isOpen);
        }
    }

    function closeMenu() {
        htmlEl.classList.remove('mobile-open');
    }

    if (hamburger) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });
    }

    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', closeMenu);
    }

    // Fermer le menu si on clique sur un lien du menu mobile
    document.addEventListener('click', (e) => {
        if (e.target.closest('#mobile-menu a')) {
            closeMenu();
        }
    });

    // Gestion du bouton "Précédent" du navigateur
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            hideOverlay();
        }
    });
})();