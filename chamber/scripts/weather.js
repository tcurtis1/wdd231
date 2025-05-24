export async function fetchWeather() {
    const weatherInfo = document.getElementById('weather-info');
    if (!weatherInfo) return;
    const apiKey = '7feef4e15a93a98166ebb8b21233cbff';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=16.76661&lon=-3.00266&appid=${apiKey}&units=imperial`;

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

    const currentTemp = Math.round(data.main.temp);
    const currentDesc = data.weather[0].description;
    const currentIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

    weatherInfo.innerHTML = `
        <h3>Current Weather in Timbuktu</h3>
        <img src="${currentIcon}" alt="Weather Icon">
        <p>${currentTemp}°F, ${currentDesc}</p>
    `;
}