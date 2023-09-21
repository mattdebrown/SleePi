const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path'); 
const screen = require('./screen/screen.js');
const weather = require('./weather/weatherService.js');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    fullscreen: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), 
      nodeIntegration: true,
    },
  });

  // Load your HTML file
  mainWindow.loadFile('index.html');

  ipcMain.on('close-button', () => {
    mainWindow.close();
  });

  ipcMain.on('sleep-button', () => {
    console.log('main.js sleep button')
    screen.sleep();
  });

  // Create and update the clock
  function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString();
    mainWindow.webContents.send('update-time', time);
  }

  // Update the clock every second
  setInterval(updateClock, 1000);

  function updateWeather()
  {
    let currentWeather = weather.getCurrentWeather();
    mainWindow.webContents.send('update-weather', currentWeather);
  }

  setInterval(updateWeather, 2000);
  
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
