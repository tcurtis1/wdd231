// Hamburger menu toggle for mobile
document.getElementById('menu-toggle').addEventListener('click', () => {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('active');
    // Update aria-expanded for accessibility
    const menuToggle = document.getElementById('menu-toggle');
    const isExpanded = navMenu.classList.contains('active');
    menuToggle.setAttribute('aria-expanded', isExpanded);
    // Toggle menu icon between hamburger (☰) and close (✕)
    menuToggle.textContent = isExpanded ? '✕' : '☰';
});

// Set current year and last modified date in footer
document.getElementById('current-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;