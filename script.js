// Page transition script: overlay fade in/out for navigation
(function(){
    const DURATION = 420; // matches CSS transition
    const overlay = document.getElementById('page-overlay');

    function hideOverlay(){
        if(!overlay) return;
        // ensure class removed after a tick so CSS transition runs
        requestAnimationFrame(()=> overlay.classList.add('hidden'));
    }

    function showOverlay(){
        if(!overlay) return;
        overlay.classList.remove('hidden');
    }

    // On load, hide overlay to reveal page
    if(document.readyState === 'loading'){
        window.addEventListener('DOMContentLoaded', hideOverlay);
    } else {
        // DOM already ready
        hideOverlay();
    }

    // Intercept internal link clicks
    document.addEventListener('click', (e)=>{
        const a = e.target.closest('a');
        if(!a) return;
        const href = a.getAttribute('href');
        if(!href) return;

        // ignore external links, mailto, tel, targets _blank and anchors
        if(href.startsWith('http') && !href.startsWith(location.origin)) return;
        if(href.startsWith('mailto:') || href.startsWith('tel:')) return;
        if(a.target && a.target.toLowerCase()==='_blank') return;
        if(href.startsWith('#')) return;

        // internal navigation: show overlay then navigate
        e.preventDefault();
        showOverlay();
        setTimeout(()=> location.href = href, DURATION);
    });

    // On pageshow (back/forward), hide overlay
    window.addEventListener('pageshow', (ev)=>{
        if(ev.persisted && overlay){
            hideOverlay();
        }
    });

    /* Mobile menu toggle */
    const hamburger = document.getElementById('hamburger');
    const mobileOverlay = document.getElementById('mobile-overlay');
    function openMobile(){
        document.documentElement.classList.add('mobile-open');
        // focus first link
        const m = document.getElementById('mobile-menu');
        if(m) m.setAttribute('aria-hidden','false');
    }
    function closeMobile(){
        document.documentElement.classList.remove('mobile-open');
        const m = document.getElementById('mobile-menu');
        if(m) m.setAttribute('aria-hidden','true');
    }
    if(hamburger){
        hamburger.addEventListener('click', ()=>{
            const isOpen = document.documentElement.classList.contains('mobile-open');
            if(isOpen) closeMobile(); else openMobile();
        });
    }
    if(mobileOverlay){
        mobileOverlay.addEventListener('click', closeMobile);
    }
    // close mobile menu when clicking a mobile link
    document.addEventListener('click', (e)=>{
        const a = e.target.closest('#mobile-menu a');
        if(a) closeMobile();
    });
})();
 