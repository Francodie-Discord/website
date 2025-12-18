document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const htmlEl = document.documentElement;

<<<<<<< HEAD
<<<<<<< HEAD
    const toggleMenu = () => htmlEl.classList.toggle('mobile-open');
    const closeMenu = () => htmlEl.classList.remove('mobile-open');
=======
=======
>>>>>>> parent of 6daca17 (edx)
    // On initial load, mark entering then remove to animate in
    function runEnter(){
        root.classList.add('is-entering');
        requestAnimationFrame(()=> root.classList.remove('is-entering'));
    }
    if(document.readyState === 'loading'){
        window.addEventListener('DOMContentLoaded', runEnter);
    } else {
        // DOM already parsed (script included at end) — run immediately
        runEnter();
    }
>>>>>>> parent of 6daca17 (edx)

    if (hamburger) hamburger.addEventListener('click', toggleMenu);
    if (mobileOverlay) mobileOverlay.addEventListener('click', closeMenu);

<<<<<<< HEAD
    // Fermer le menu si on clique sur un lien à l'intérieur
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
});
=======
        // Skip external, mailto, tel, anchors and blank targets
        if(href.startsWith('http') && !href.startsWith(window.location.origin)) return;
        if(href.startsWith('mailto:') || href.startsWith('tel:')) return;
        if(a.target && a.target.toLowerCase()==='_blank') return;
        if(href.startsWith('#')) return;

        // Internal navigation: animate then navigate
        e.preventDefault();
        root.classList.add('is-exiting');

        setTimeout(()=>{
            window.location.href = href;
        }, DURATION);
    });

    // When navigating via back/forward, ensure enter animation runs
    window.addEventListener('pageshow', (ev)=>{
        if(ev.persisted){
            // Force reflow then animate in
            root.classList.remove('is-exiting');
            root.classList.add('is-entering');
            requestAnimationFrame(()=> root.classList.remove('is-entering'));
        }
    });
})();
>>>>>>> parent of 6daca17 (edx)
