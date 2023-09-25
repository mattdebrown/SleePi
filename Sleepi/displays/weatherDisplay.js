let parentDiv = document.getElementById("weather-summary");
let cityElement;
let temperatureElement;
let iconElement;

window.electronAPI.onUpdateWeather((event, value) => {
    let currentWeather = value;
    updateWeatherDisplay(currentWeather);
})

function construct(){
    conditionImage = document.createElement('img');
    conditionImage.src = 'https://cdn.weatherapi.com/weather/128x128/day/116.png';
    conditionImage.id = 'condition-image';
    parentDiv.append(conditionImage);

    cityElement = document.createElement('div');
    cityElement.innerText = "Location";
    parentDiv.append(cityElement);

    conditionText = document.createElement('div');
    conditionText.innerText = "Clear";
    parentDiv.append(conditionText);

    temperatureElement = document.createElement('div');
    temperatureElement.innerText = "10°C";
    temperatureElement.style.cssText = "font-size: 40px; position: absolute; bottom: 2px;";
    parentDiv.append(temperatureElement);
}

function updateWeatherDisplay(currentWeather){
    temperatureElement.innerText = Math.trunc(currentWeather.current.temp_c) + '°C';
    let locationString = `${currentWeather.location.name},  ${currentWeather.location.region}`
    cityElement.innerText = locationString;
    conditionText.innerText = currentWeather.current.condition.text;
    conditionImage.src = 'http://' + currentWeather.current.condition.icon;
}

document.body.onload = construct;