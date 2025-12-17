// Page transition script: fade overlay on load and when navigating between internal pages
(function(){
    const DURATION = 420; // must match CSS transition duration (ms)
    const overlay = document.getElementById('page-overlay');
    if(!overlay) return;

    // On load: hide overlay to reveal page
    window.addEventListener('DOMContentLoaded', ()=>{
        // small delay to ensure smooth enter
        requestAnimationFrame(()=>{
            overlay.classList.add('hidden');
        });
    });

    // Intercept link clicks for internal navigation
    document.addEventListener('click', (e)=>{
        const a = e.target.closest('a');
        if(!a) return;
        const href = a.getAttribute('href');
        if(!href) return;

        // ignore anchors, external links, mailto/tel, and links with target _blank
        if(href.startsWith('http') && !href.startsWith(window.location.origin)) return;
        if(href.startsWith('mailto:') || href.startsWith('tel:')) return;
        if(a.target && a.target.toLowerCase()==='_blank') return;
        if(href.startsWith('#')) return; // anchor on same page

        // assume internal navigation -> animate then navigate
        e.preventDefault();
        overlay.classList.remove('hidden');

        setTimeout(()=>{
            window.location.href = href;
        }, DURATION);
    });

    // If user uses back/forward, briefly show overlay then hide again
    window.addEventListener('pageshow', ()=>{
        if(!overlay.classList.contains('hidden')){
            requestAnimationFrame(()=> overlay.classList.add('hidden'));
        }
    });
})();
