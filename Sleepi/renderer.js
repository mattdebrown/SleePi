let timeDisplay = document.getElementById('time-display');

window.electronAPI.onUpdateTime((event, value) => {
    timeDisplay.textContent = value;
})

window.electronAPI.onUpdateWeather((event, value) => {
    let currentWeather = value;
    console.log('fart = ' + currentWeather.location.country);

    updateWeatherDisplay(currentWeather);

})

const closeButton = document.getElementById('close-button');

closeButton.addEventListener('click', () => {
    window.electronAPI.closeButtonPressed();
})

const sleepButton = document.getElementById('sleep-button');

sleepButton.addEventListener('click', () => {
    console.log('renderer.js sleep button')
    window.electronAPI.sleepButtonPressed();
})