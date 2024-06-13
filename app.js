const input = document.querySelector('input')
const button = document.querySelector('button')

window.onload = function () {
    if (input.value === '') {
        button.disabled = true;
    }

    input.addEventListener('input', function () {
        button.disabled = input.value === '';
    });
};

button.addEventListener('click', getData)
async function getTimezone(lat, lon) {
    const API = 'AIzaSyA6MldL7oCao35AJBI4NcXERkYKaLVz14Q'
    try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lon}&timestamp=${Date.now() / 1000}&key=${API}`);
        const data = await response.json();
        const timezoneId = data.timeZoneId;
        return timezoneId;
    } catch (error) {

        return null;
    }
}
async function getData() {
    if (input.value === '') {
        button.disabled = true;
    }
    let id = input.value
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${id}&APPID=7f12b9f7637879bc79cddc5739293ac2`
        );
        if (!response.ok) {
            alert(`${response.status} page not found`)
        }
        let weatherData = await response.json()
        const cityWeather = weatherData.main
        let speed = weatherData.wind.speed
        const [sunrise, sunset, countryCode] = [weatherData.sys.sunrise, weatherData.sys.sunset, weatherData.sys.country]
        const visibility = weatherData.visibility
        const firstWeatherObject = weatherData.weather[0];
        const [description] = [firstWeatherObject.description]

        let [lat, lon] = [weatherData.coord.lat, weatherData.coord.lon]
        const [feels_like, humidity, pressure, temp, temp_max, temp_min] = [cityWeather.feels_like, cityWeather.humidity, cityWeather.pressure, cityWeather.temp, cityWeather.temp_max, cityWeather.temp_min]
        let existingResults = document.querySelector('.results');
        let existingCoordinates = document.querySelector('.coordinates');

        if (existingResults && existingCoordinates) {
            existingResults.remove();
            existingCoordinates.remove();
        }

        let results = document.createElement('div')
        results.classList.add('results')
        document.body.appendChild(results)
        let city = document.createElement('h3')
        city.innerText = `${weatherData.name} , ${countryCode} `
        results.appendChild(city)
        let overview = document.createElement('h5')
        const iconMap = {
            'clear sky': 'fas fa-sun',
            'few clouds': 'fas fa-cloud-sun',
            'overcast clouds': 'fas fa-cloud',
            'broken clouds': 'fas fa-cloud',
            'rain': 'fas fa-cloud-showers-heavy',
            'light rain': 'fas fa-cloud-rain',
            'thunderstorm': 'fas fa-bolt',
            'snow': 'fas fa-snowflake',
            'haze': 'fas fa-smog'
        };
        let tempIcon = 'fas fa-thermometer-half';
        if ((temp - 273.15) <= 20) {
            tempIcon = 'fas fa-thermometer-quarter';
        } else if ((temp - 273.15) > 20) {
            tempIcon = 'fas fa-thermometer-full';
        }
        let weatherIcon = iconMap[description] || 'fas fa-sun';
        overview.innerHTML = `<i class="${weatherIcon}"></i> ${description.toUpperCase()}`;
        results.appendChild(overview)
        let weatherFL = document.createElement('span')
        weatherFL.innerHTML = `<i class="${tempIcon}" style="color: #FFD43B;"></i>Feels Like : ${(feels_like - 273.15).toFixed(2)} °C`
        results.appendChild(weatherFL)
        let weatherTemp = document.createElement('span')
        weatherTemp.innerHTML = `<i class="${tempIcon}"></i>Current Temp : ${(temp - 273.15).toFixed(2)} °C `
        results.appendChild(weatherTemp)
        let weatherTempMax = document.createElement('span')
        weatherTempMax.innerHTML = `<i class="${tempIcon}" style="color:#c40808;></i>Max Temp : ${(temp_max - 273.15).toFixed(2)} °C `
        results.appendChild(weatherTempMax)
        let weatherTempMin = document.createElement('span')
        weatherTempMin.innerHTML = `<i class="${tempIcon}"></i>Max Temp : ${(temp_min - 273.15).toFixed(2)} °C `
        results.appendChild(weatherTempMin)
        let weatherHumidity = document.createElement('span')
        weatherHumidity.innerText = `Humidity : ${humidity}% `
        results.appendChild(weatherHumidity)
        let weatherPressue = document.createElement('span')
        weatherPressue.innerText = `Pressue : ${pressure} hPa `
        results.appendChild(weatherPressue)
        let weatherVisibility = document.createElement('span')
        weatherVisibility.innerText = `Visibility ${visibility} m`
        results.appendChild(weatherVisibility)
        let sunriseTime = document.createElement('span')
        sunriseTime.innerHTML = `<i class="fa-solid fa-sun" style="color: #FFD43B;"></i> Sunrise: ${new Date(sunrise * 1000).toLocaleTimeString()} am`
        results.appendChild(sunriseTime)
        let sunsetTime = document.createElement('p')
        sunsetTime.innerHTML = `<i class="fa-regular fa-sun" style="color: #FFD43B;"></i>Sunset: ${new Date(sunset * 1000).toLocaleTimeString()} pm`
        results.appendChild(sunsetTime)

        let wind = document.createElement('span')
        wind.innerHTML = `<i class="fa-solid fa-wind"></i> Speed: ${speed}ms`
        results.appendChild(wind)
        let coord = document.createElement('div')
        coord.classList.add('coordinates')
        coord.innerText = `Latitude: ${lat} Longitude: ${lon}`;
        document.body.appendChild(coord);
        input.value = '';
        getTimezone(lat, lon).then(timezoneId => {
            const currentTime = new Date().toLocaleTimeString("en-US", { timeZone: timezoneId });
            let timeNow = document.createElement('span')
            timeNow.innerHTML = `<i class="fa-regular fa-clock"></i> ${currentTime}`;
            results.appendChild(timeNow)
        });
    } catch (e) { return null }
}

let cities = ['Berlin', 'Delhi', 'Amsterdam']
cities.forEach((city) => { let button = document.createElement('button'); button.innerText = city; button.classList.add('topSearch'); document.getElementById('buttonContainer').appendChild(button);; button.addEventListener('click', () => topSearch(city)); })

function topSearch(cityName) {
    input.value = cityName
    getData()
    input.value = ''

}



