
const apiKey = process.env.API_KEY || "defaultApiKey";
const apiUrl = process.env.API_URL || "defaultApiUrl";

const searchBtn = document.querySelector('.search button');
const searchBox = document.querySelector('.search input');

const weatherIcon = document.querySelector('.weather-icon');

async function checkWeather(cityInput){
    try {
        const response = await fetch(apiUrl + cityInput + `&appid=${apiKey}`);
        console.log(response);

        if (!response.ok) {
            throw new Error("HTTP Error -- Error status: ${response.status}");
        }
        const data = await response.json();
        console.log(data);

        const temp = document.querySelector('.temp');
        const city = document.querySelector('.city');
        const humidity = document.querySelector('.humidity');
        const wind = document.querySelector('.wind');

        //Wheather Conditions Statements 
        if (data.weather[0].main === "Clear") {
            weatherIcon.src = "images/clear.png";
        } else if (data.weather[0].main === "Clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (data.weather[0].main === "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (data.weather[0].main === "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (data.weather[0].main === "Snow") {
            weatherIcon.src = "images/snow.png";
        } else if (data.weather[0].main === "Mist") {
            weatherIcon.src = "images/mist.png";
        }

        city.innerHTML = data.name;
        temp.innerHTML = data.main.temp.toFixed(1) + "°c";
        humidity.innerHTML = data.main.humidity + "%";
        wind.innerHTML = data.wind.speed + "km/h";
} catch(error) {
    console.error('An error has occred:', error);
    alert("Failed to fetch the weather data (temporarily). Please try again later! :)");
}
}

searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value);
});




// Error handling should be done afterwards ****************************************