const fs = require('fs');

const credentialPath = 'weather/credentials.json';

let credentials;

fs.readFile(credentialPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error:', err);
    return;
  }

  try {
    credentials = JSON.parse(data);
    console.log(credentials);
  } catch (error) {
    console.error('Error parsing JSON:', error);
  }
});

let currentWeather;

function refreshWeatherInfo()
{
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${credentials.apikey}&q=${credentials.location}&aqi=no`;

    // Make a GET request to the API
    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // console.log(data);
        currentWeather = data;
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
}

function getCurrentWeather()
{
  refreshWeatherInfo();
  return currentWeather;
}

console.log('credentials opened')

module.exports = 
{
    getCurrentWeather
}