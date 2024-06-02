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

        console.log(weatherData)
    } catch (e) { console.log(e) }
}
