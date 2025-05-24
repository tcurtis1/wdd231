export async function fetchEvents() {
    const eventList = document.getElementById('event-list');
    if (!eventList) return;
    try {
        const response = await fetch('data/events.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const events = await response.json();
        displayEvents(events.slice(0, 3));
    } catch (error) {
        console.error('Error fetching events:', error);
        eventList.innerHTML = '<p>Error loading events. Please try again later.</p>';
    }
}

function displayEvents(events) {
    const eventList = document.getElementById('event-list');
    if (!eventList) return;
    eventList.innerHTML = '';
    events.forEach(event => {
        eventList.innerHTML += `
            <div class="event-card">
                <h3>${event.title}</h3>
                <p>${event.date}</p>
                <p>${event.description}</p>
            </div>
        `;
    });
}