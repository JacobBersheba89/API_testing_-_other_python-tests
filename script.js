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
            forecastHtml += `
                <div class="dayForecast">
                    <h3>${new Date(item.dt * 1000).toLocaleDateString()}</h3>
                    <img src="${iconUrl}" alt="${item.weather[0].description}" width="50">
                    <p>Teplota: ${item.main.temp} °C</p>
                    <p>Popis: ${item.weather[0].description}</p>
                    <p>Vlhkost: ${item.main.humidity}%</p>
                </div>
            `;
        }
    });
    document.getElementById('forecastWeatherResult').innerHTML = forecastHtml;
}


function displayWeather(data) {
    const iconUrl = getWeatherIcon(data.weather[0].description);
    const weather = `
        <h2>Aktuální počasí ve městě: ${data.name}</h2>
        <img src="${iconUrl}" alt="${data.weather[0].description}" width="80" style="display: block; margin: 0 auto;">
        <p>Teplota: ${data.main.temp} °C</p>
        <p>Aktuální situace: ${data.weather[0].description}</p>
        <p>Vlhkost: ${data.main.humidity}%</p>
    `;
    document.getElementById('currentWeatherResult').innerHTML = weather;
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
}

function getWeatherIcon(description) {
    switch (description.toLowerCase()) {
        case 'jasno':
            return 'images/sunny.png';
        case 'zataženo':
            return 'images/cloudy.png';
        case 'oblačno':
            return 'images/partly_cloudy.png';
        case 'déšť':
        case 'mrholení':
            return 'images/rainy.png';
        case 'bouřka':
            return 'images/storm.png';
        case 'sníh':
            return 'images/snow.png';
        case 'mlha':
            return 'images/fog.png';
        default:
            return 'images/default.png'; // Obrázek pro neznámé situace
    }
}

