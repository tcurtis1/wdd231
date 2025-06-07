export async function initGallery() {
    const galleryContainer = document.getElementById('gallery');
    if (!galleryContainer) return;

    try {
        const response = await fetch('data/gallery.json');
        if (!response.ok) {
            throw new Error('Failed to load gallery data');
        }
        const data = await response.json();

        data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'gallery-card';
            card.innerHTML = `
                <img src="${item.src}" alt="${item.alt}" loading="lazy">
                <h3>${item.name}</h3>
                <p><strong>Location:</strong> ${item.location}</p>
                <p>${item.description}</p>
            `;
            galleryContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading gallery:', error);
        galleryContainer.innerHTML = '<p>Sorry, unable to load the gallery at this time.</p>';
    }
}

export function initLastVisit() {
    const visitMessage = document.getElementById('visit-message');
    if (!visitMessage) return;

    const lastVisit = localStorage.getItem('lastVisit');
    const currentDate = new Date();
    const currentTime = currentDate.getTime();

    if (!lastVisit) {
        visitMessage.textContent = 'Welcome to Timbuktu! This is your first visit.';
    } else {
        const lastVisitTime = parseInt(lastVisit, 10);
        const daysSinceLastVisit = Math.floor((currentTime - lastVisitTime) / (1000 * 60 * 60 * 24));
        if (daysSinceLastVisit === 0) {
            visitMessage.textContent = 'Welcome back! You visited earlier today.';
        } else {
            visitMessage.textContent = `Welcome back! It's been ${daysSinceLastVisit} day${daysSinceLastVisit === 1 ? '' : 's'} since your last visit.`;
        }
    }

    localStorage.setItem('lastVisit', currentTime);
}