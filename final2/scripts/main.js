

document.addEventListener('DOMContentLoaded', function() {
    
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            
            navMenu.classList.toggle('open');
            
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !isExpanded);
        });

        
        
        
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                
                if (navMenu.classList.contains('open')) {
                    navMenu.classList.remove('open');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    
    const lastModifiedSpan = document.getElementById('last-modified');
    if (lastModifiedSpan) {
        
        
        lastModifiedSpan.textContent = document.lastModified;
    }
});
