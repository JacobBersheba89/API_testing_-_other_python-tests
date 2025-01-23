function getForecast(city) {
    const apiKey = '7ead51f4d43b3ee0ac451738a3ea079d';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=cz`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Odpověď sítě nebyla v pořádku');
            }
            return response.json();
        })
        .then(data => {
            displayForecast(data);
        })
        .catch(error => {
            console.error('Problém s operátory:', error);
        });
}

function displayForecast(data) {
    let forecastHtml = '';
    data.list.forEach((item, index) => {
        if (index % 8 === 0) { // Každý den má 8 intervalů po 3 hodinách
            const iconUrl = getWeatherIcon(item.weather[0].description);
            const tempRounded = Math.round(item.main.temp);
            forecastHtml += `
                <div class="dayForecast">
                    <h3>${new Date(item.dt * 1000).toLocaleDateString()}</h3>
                    <img src="${iconUrl}" alt="${item.weather[0].description}" width="50">
                    <p>Teplota:<b> ${tempRounded} °C </b></p>
                    <p>Popis: ${item.weather[0].description}</p>
                    <p>Vlhkost: ${item.main.humidity}%</p>
                </div>
            `;
        }
    });
    document.getElementById('forecastWeatherResult').innerHTML = forecastHtml;
}



function getWeather() {
    const city = document.getElementById('cityInput').value;
    const apiKey = '7ead51f4d43b3ee0ac451738a3ea079d';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=cz`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Přidáno pro diagnostiku
            displayWeather(data);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
        getAirQuality(city);
}

function getWeatherIcon(description) {
    switch (description.toLowerCase()) {
        case 'jasno':
            return 'images/sunny.png';
        case 'zataženo':
            return 'images/cloudy.png';
        case 'polojasno':
        case 'skorojasno':
            return 'images/1partly_cloudy.png';
        case 'oblačno':
            return 'images/2partly_cloudy.png';
        case 'déšť':
        case 'slabý déšť':
        case 'mrholení':
            return 'images/rainy.png';
        case 'bouřka':
            return 'images/storm.png';
        case 'sníh':
        case 'slabé sněžení':
            return 'images/snow.png';
        case 'mlha':
            return 'images/fog.png';
        default:
            return 'images/default.png'; // Obrázek pro neznámé situace
    }
}

function displayWeather(data) {
    document.getElementById('weatherResult').style.display = 'block'; // Zobrazí div pro aktuální počasí
    const iconUrl = getWeatherIcon(data.weather[0].description);

    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString(); // Převod na čitelný čas
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString(); // Převod na čitelný čas

    const weather = `
        <h2>Aktuální počasí ve městě: ${data.name}</h2>
        <img src="${iconUrl}" alt="${data.weather[0].description}" width="50">
        <p>Teplota: <b>${data.main.temp} °C</b></p>
        <p>Aktuální situace: ${data.weather[0].description}</p>
        <p>Vlhkost: ${data.main.humidity}%</p><br>
        <p>Východ slunce: ${sunrise}</p>
        <p>Západ slunce: ${sunset}</p>
    `;
    document.getElementById('currentWeatherResult').innerHTML = weather;
}

function getAirQuality(city) {
    const apiKey = '7ead51f4d43b3ee0ac451738a3ea079d';

    // Nejdříve získáme souřadnice města
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const lat = data.coord.lat;
            const lon = data.coord.lon;
            return fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`);
        })
        .then(response => response.json())
        .then(data => {
            displayAirQuality(data);
        })
        .catch(error => console.error('Error fetching air quality:', error));
}
