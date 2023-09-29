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
  
  mainWindow.loadFile('index.html');
  
  // Debug setup on for dev, on Windows
  if (process.platform === 'win32') {
    mainWindow.fullScreen = false;
    mainWindow.width = 800;
    mainWindow.height = 480;
    mainWindow.webContents.openDevTools();
  } 

  ipcMain.on('close-button', () => {
    mainWindow.close();
  });

  ipcMain.on('sleep-button', () => {
    screen.sleep();
  });

  function updateClock() {
    const now = new Date();
    mainWindow.webContents.send('update-time', now);
  }
  setInterval(updateClock, 1000);

  function updateWeather()
  {
    let currentWeather = weather.getCurrentWeather();
    mainWindow.webContents.send('update-weather', currentWeather);
  }
  setInterval(updateWeather, 600000);
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
