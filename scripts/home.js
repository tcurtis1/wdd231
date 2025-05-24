const events = [
    {
        title: "Timbuktu Business Expo 2025",
        date: "June 15, 2025",
        description: "Join us for a showcase of local businesses and networking opportunities."
    },
    {
        title: "Chamber Monthly Meetup",
        date: "July 5, 2025",
        description: "Connect with fellow members and discuss community growth."
    }
];

// Function to display events
function displayEvents() {
    const eventList = document.getElementById('event-list');
    eventList.innerHTML = '';

    events.forEach(event => {
        const card = document.createElement('div');
        card.classList.add('event-card');
        card.innerHTML = `
            <h3>${event.title}</h3>
            <p><strong>Date:</strong> ${event.date}</p>
            <p>${event.description}</p>
        `;
        eventList.appendChild(card);
    });
}

// Weather API (requires OpenWeatherMap API key)
async function fetchWeather() {
    const apiKey = '7feef4e15a93a98166ebb8b21233cbff';
    const city = 'Timbuktu,ML';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const weatherInfo = document.getElementById('weather-info');
        if (data.cod === 200) {
            weatherInfo.innerHTML = `
                <p><strong>${data.name}</strong>: ${data.weather[0].description}</p>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Humidity: ${data.main.humidity}%</p>
            `;
        } else {
            weatherInfo.innerHTML = '<p>Unable to fetch weather data.</p>';
        }
    } catch (error) {
        console.error('Error fetching weather:', error);
        document.getElementById('weather-info').innerHTML = '<p>Unable to fetch weather data.</p>';
    }
}

// Function to fetch and display random spotlights from members.json
async function displaySpotlights() {
    const spotlightList = document.getElementById('spotlight-list');
    spotlightList.innerHTML = '';

    try {
        // Fetch members.json from the /data directory
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error('Failed to fetch members data');
        }
        const members = await response.json();

        // Filter for gold (3) and silver (2) members
        const eligibleMembers = members.filter(member => member.membershipLevel === 2 || member.membershipLevel === 3);

        // Randomly select 2-3 members
        const selectedMembers = eligibleMembers
            .sort(() => 0.5 - Math.random())
            .slice(0, Math.min(3, eligibleMembers.length));

        // Display selected members
        selectedMembers.forEach(member => {
            const card = document.createElement('div');
            card.classList.add('spotlight-card');
            card.innerHTML = `
                <h3>${member.name}</h3>
                <img src="images/${member.image}" alt="${member.name} Logo" class="member-logo" width="50" height="50">
                <p>${member.tagline}</p>
                <p><a href="${member.url}" target="_blank">Visit Website</a></p>
            `;
            spotlightList.appendChild(card);
        });

        // If no eligible members, display a fallback message
        if (selectedMembers.length === 0) {
            spotlightList.innerHTML = '<p>No gold or silver members available.</p>';
        }
    } catch (error) {
        console.error('Error fetching members:', error);
        spotlightList.innerHTML = '<p>Unable to load business spotlights.</p>';
    }
}

// Initialize content on page load
document.addEventListener('DOMContentLoaded', () => {
    displayEvents();
    fetchWeather();
    displaySpotlights();
});