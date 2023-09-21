console.log('weather display exec');

document.body.onload = construct;

let parentDiv = document.getElementById("weather-summary");
let cityElement;
let temperatureElement;
let iconElement;

function construct(){
conditionImage = document.createElement('img');
    conditionImage.src = 'https://random.imagecdn.app/64/64';
    conditionImage.id = 'condition-image';
    parentDiv.append(conditionImage);

    cityElement = document.createElement('div');
    cityElement.innerText = "Eocys";
    parentDiv.append(cityElement);

    temperatureElement = document.createElement('div');
    temperatureElement.innerText = "00c";
    parentDiv.append(temperatureElement);

    conditionText = document.createElement('div');
    conditionText.innerText = "clowdy";
    parentDiv.append(conditionText);
}

function updateWeatherDisplay(currentWeather){
    let locationString = `${currentWeather.location.name},  ${currentWeather.location.region}`
    cityElement.innerText = locationString;
    temperatureElement.innerText = currentWeather.current.temp_c + ' C';
    conditionText.innerText = currentWeather.current.condition.text;
    conditionImage.src = 'http://' + currentWeather.current.condition.icon;
}