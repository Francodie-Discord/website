// Page transition script: fade overlay on load and when navigating between internal pages
(function(){
    const DURATION = 420; // must match CSS transition duration in pages
    const root = document.documentElement;

    // On initial load, mark entering then remove to animate in
    window.addEventListener('DOMContentLoaded', ()=>{
        root.classList.add('is-entering');
        // next frame remove class to trigger transition
        requestAnimationFrame(()=>{
            root.classList.remove('is-entering');
        });
    });

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
