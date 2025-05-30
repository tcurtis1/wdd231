export async function fetchWeather() {
    const weatherInfo = document.getElementById('weather-info');
    if (!weatherInfo) return;
    const apiKey = '7feef4e15a93a98166ebb8b21233cbff';
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=16.76661&lon=-3.00266&appid=${apiKey}&units=imperial`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather:', error);
        weatherInfo.innerHTML = '<p>Error loading weather. Please try again later.</p>';
    }
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weather-info');
    if (!weatherInfo) return;

    // Get current weather (first entry in the list)
    const currentTemp = Math.round(data.list[0].main.temp);
    const currentDesc = data.list[0].weather[0].description;
    const currentIcon = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png`;

    // Get forecast for the next 3 days (one entry per day, around noon)
    const forecast = [];
    const seenDates = new Set();
    for (const entry of data.list) {
        const date = new Date(entry.dt * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        const hour = new Date(entry.dt * 1000).getHours();
        // Select entries around noon (12 PM) to represent the day's weather
        if (hour >= 11 && hour <= 14 && !seenDates.has(date) && forecast.length < 3) {
            forecast.push({
                date,
                temp: Math.round(entry.main.temp),
                desc: entry.weather[0].description,
                icon: `https://openweathermap.org/img/wn/${entry.weather[0].icon}.png`
            });
            seenDates.add(date);
        }
        if (forecast.length >= 3) break;
    }

    
    let forecastHTML = `
        <h3>Current Weather in Timbuktu</h3>
        <img src="${currentIcon}" alt="Weather Icon">
        <p>${currentTemp}°F, ${currentDesc}</p>
        <h3>3-Day Forecast</h3>
        <div style="display: flex; justify-content: space-around; flex-wrap: wrap;">
    `;

    forecast.forEach(day => {
        forecastHTML += `
            <div style="text-align: center; margin: 10px;">
                <p><strong>${day.date}</strong></p>
                <img src="${day.icon}" alt="Weather Icon">
                <p>${day.temp}°F</p>
                <p>${day.desc}</p>
            </div>
        `;
    });

    forecastHTML += `</div>`;
    weatherInfo.innerHTML = forecastHTML;
}