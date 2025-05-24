export function initFooter() {
    const currentYear = document.getElementById('current-year');
    const lastModified = document.getElementById('last-modified');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    } else {
        console.error("Element with ID 'current-year' not found.");
    }
    if (lastModified) {
        lastModified.textContent = document.lastModified;
    } else {
        console.error("Element with ID 'last-modified' not found.");
    }
}