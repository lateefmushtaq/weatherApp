let input = document.querySelector('input')
let button = document.querySelector('button')
let results = document.querySelector('.results')
function test() {
    console.log(input.value)
}
button.addEventListener('click', getData)

async function getData() {
    let id = input.value
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${id}&APPID=7f12b9f7637879bc79cddc5739293ac2`
        );
        if (!response.ok) {
            alert(response.status)
        }
        let weatherData = await response.json()
        const cityWeather = weatherData.main
        let [deg, speed] = [weatherData.wind.deg, weatherData.wind.speed]
        const [sunrise, sunset, countryCode] = [weatherData.sys.sunrise, weatherData.sys.sunset, weatherData.sys.country]
        const visibility = weatherData.visibility
        const firstWeatherObject = weatherData.weather[0];
        const [main, description] = [firstWeatherObject.main, firstWeatherObject.description]
        let kelvinTemp = cityWeather.temp
        let celsiusTemp = kelvinTemp - 273.15;
        let [lat, lon] = [weatherData.coord.lat, weatherData.coord.lon]
        const [feels_like, humidity, pressure, temp, temp_max, temp_min] = [cityWeather.feels_like, cityWeather.humidity, cityWeather.pressure, cityWeather.temp, cityWeather.temp_max, cityWeather.temp_min]
        let city = document.createElement('h3')
        city.innerText = `${weatherData.name} , ${countryCode} `
        results.appendChild(city)
        let overview = document.createElement('h5')
        overview.innerText = `${main}, ${description}`
        results.appendChild(overview)
        let weather = document.createElement('p')
        weather.innerText = `Feels Like : ${feels_like - 273.15} °C ,Current Temp : ${temp - 273.15} °C , Max: ${temp_max - 273.15} °C , Min ${temp_min - 273.15} °C`
        results.appendChild(weather)
        let otherData = document.createElement('p')
        otherData.innerText = `Humidity : ${humidity}% , Pressue : ${pressure} hPa , Visibility ${visibility} meters`
        results.appendChild(otherData)
        let dayLight = document.createElement('p')
        dayLight.innerText = `Sunrise: ${new Date(sunrise * 1000).toLocaleTimeString()} am, Sunset : ${new Date(sunset * 1000).toLocaleTimeString()} pm,`
        results.appendChild(dayLight)
        let wind = document.createElement('p')
        wind.innerText = `${deg}° , ${speed}ms`
        results.appendChild(wind)
        let coord = document.createElement('p')
        coord.innerText = `Latitude: ${lat}, Longitude: ${lon}`;
        coord.appendChild(coord)
        results.innerText = ''
    } catch (e) { console.log(e) }
}
