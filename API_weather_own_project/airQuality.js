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

function displayAirQuality(data) {
    const aqi = data.list[0].main.aqi;

    let aqiDescription;
    switch (aqi) {
        case 1:
            aqiDescription = 'Velmi dobrá';
            break;
        case 2:
            aqiDescription = 'Dobrá';
            break;
        case 3:
            aqiDescription = 'Střední';
            break;
        case 4:
            aqiDescription = 'Špatná';
            break;
        case 5:
            aqiDescription = 'Velmi špatná';
            break;
        default:
            aqiDescription = 'Nedostupné';
    }

    const airQualityHtml = `
        <div class="airQuality">
            <h3>Kvalita ovzduší</h3>
            <p>Index kvality ovzduší (AQI): ${aqi} - ${aqiDescription}</p>
        </div>
    `;
    document.getElementById('currentWeatherResult').innerHTML += airQualityHtml;
}
