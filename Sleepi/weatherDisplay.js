console.log('weather display exec');

document.body.onload = construct;

let parentDiv = document.getElementById("weather-summary");
let cityElement;
let temperatureElement;

function construct(){
    cityElement = document.createElement('div');
    cityElement.innerText = "Eocysnlgyew";
    parentDiv.append(cityElement);

    temperatureElement = document.createElement('div');
    temperatureElement.innerText = "00c";
    parentDiv.append(temperatureElement);
}

function updateWeatherDisplay(currentWeather){
    cityElement.innerText = currentWeather.location.name;
    temperatureElement.innerText = currentWeather.current.temp_c;
}