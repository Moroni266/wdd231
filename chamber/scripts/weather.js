const API_KEY = "09860c06531d1166970a653f80851a0f";
const LAT = 19.54;
const LON = -96.92;
const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=imperial&appid=${API_KEY}`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=imperial&appid=${API_KEY}`;

async function getWeatherData() {
    try {
        const currentResponse = await fetch(currentWeatherURL);
        const currentData = await currentResponse.json();
        const forecastResponse = await fetch(forecastURL);
        const forecastData = await forecastResponse.json();

        displayWeather(currentData, forecastData);
    } catch (error) {
        console.error("Bad request 404:", error);
    }
}

function displayWeather(currentData, forecastData) {
    const currentWeatherContainer = document.getElementById("weather-details");
    const forecastContainer = document.getElementById("forecast-details");
    const weatherInformation = `
        <li><span>${currentData.main.temp.toFixed(1)}°F</span></li>
        <li>${currentData.weather[0].description}</li>
        <li>High: ${currentData.main.temp_max.toFixed(1)}°F</li>
        <li>Low: ${currentData.main.temp_min.toFixed(1)}°F</li>
        <li>Humidity: ${currentData.main.humidity}%</li>
        <li>Wind Speed: ${currentData.wind.speed} mph</li>
        <li>Sunrise: ${new Date(
            currentData.sys.sunrise * 1000
        ).toLocaleTimeString()}</li>
        <li>Sunset: ${new Date(
            currentData.sys.sunset * 1000
        ).toLocaleTimeString()}</li>
    `;
    currentWeatherContainer.innerHTML = weatherInformation;
    const forecastList = forecastData.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
    );

    let forecastHTML = "";
    for (let i = 0; i < 3; i++) {
        const day = forecastList[i];
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
        forecastHTML += `
            <li><strong>${dayName}</strong>: ${day.main.temp.toFixed(1)}°F, ${
            day.weather[0].description
        }</li>
        `;
    }

    forecastContainer.innerHTML = forecastHTML;
}

getWeatherData();
