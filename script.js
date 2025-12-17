// Page transition script: fade overlay on load and when navigating between internal pages
(function(){
    const DURATION = 420; // must match CSS transition duration in pages
    const root = document.documentElement;

    // On initial load, reveal page by adding .is-ready
    function runReady(){
        // ensure a tick so transition can run
        requestAnimationFrame(()=> root.classList.add('is-ready'));
    }
    if(document.readyState === 'loading'){
        window.addEventListener('DOMContentLoaded', runReady);
    } else {
        runReady();
    }

    // Intercept clicks to animate out for internal navigation
    document.addEventListener('click', (e)=>{
        const a = e.target.closest('a');
        if(!a) return;
        const href = a.getAttribute('href');
        if(!href) return;

        // Skip external, mailto, tel, anchors and blank targets
        if(href.startsWith('http') && !href.startsWith(window.location.origin)) return;
        if(href.startsWith('mailto:') || href.startsWith('tel:')) return;
        if(a.target && a.target.toLowerCase()==='_blank') return;
        if(href.startsWith('#')) return;

        // Internal navigation: animate out then navigate
        e.preventDefault();
        root.classList.remove('is-ready');
        root.classList.add('is-exiting');

        setTimeout(()=>{
            window.location.href = href;
        }, DURATION);
    });

    // Ensure when using back/forward, page shows ready state
    window.addEventListener('pageshow', (ev)=>{
        // remove exiting if present
        root.classList.remove('is-exiting');
        runReady();
    });
})();
