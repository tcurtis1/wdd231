import { initNav } from './nav.js';
import { initFooter } from './footer.js';
import { fetchMembers, displayMembers, initViewToggle } from './members.js';
import { displaySpotlights } from './spotlights.js';
import { fetchEvents } from './events.js';
import { fetchWeather } from './weather.js';
import { initGallery, initLastVisit } from './gallery.js';

document.addEventListener('DOMContentLoaded', () => {

    initNav();
    initFooter();


    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    if (currentPage === 'index.html' || currentPage === '') {

        fetchMembers().then(members => {
            if (members && document.getElementById('spotlight-list')) {
                displaySpotlights(members);
            }
        });
        if (document.getElementById('event-list')) {
            fetchEvents();
        }
        if (document.getElementById('weather-info')) {
            fetchWeather();
        }
    } else if (currentPage === 'directory.html') {
       
        fetchMembers().then(members => {
            if (members && document.getElementById('member-directory')) {
                displayMembers(members, 'grid');
                initViewToggle();
            }
        });
    } else if (currentPage === 'discover.html') {
 
        initGallery();
        initLastVisit();
    }
    
});