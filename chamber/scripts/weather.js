async function getWeatherData() {
    const response = await fetch("json/weather-info.json");
    const weatherInfo = await response.json();
    displayWeather(weatherInfo);
}

function displayWeather(weatherInfo) {
    const currentWeatherContainer = document.getElementById("weather-details");
    const forecastContainer = document.getElementById("forecast-details");

    weatherInformation = `
        <li><span>${weatherInfo[0].weather}°F</span></li>
        <li>${weatherInfo[0].description}</li>
        <li>High: ${weatherInfo[0].high}°F</li>
        <li>Low: ${weatherInfo[0].low}°F</li>
        <li>Humidity: ${weatherInfo[0].humidity}%</li>
        <li>Wind Speed: ${weatherInfo[0].wind} mph</li>
        <li>Sunrise: ${weatherInfo[0].sunrise}</li>
        <li>Sunset: ${weatherInfo[0].sunset}</li>
    `;
    currentWeatherContainer.innerHTML = weatherInformation;

    const forecastData = weatherInfo[1];
    const daysOfWeek = Object.keys(forecastData);
    const todayIndex = new Date().getDay();
    const mapDays = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
    ];

    let forecastHTML = "";
    for (let i = 0; i < 3; i++) {
        let dayIndex = (todayIndex + i) % 7;
        let dayName = mapDays[dayIndex];
        let temp = forecastData[dayName];
        forecastHTML += `<li><strong>${dayName}</strong>: ${temp}°F</li>`;
    }

    forecastContainer.innerHTML = forecastHTML;
}

getWeatherData();
