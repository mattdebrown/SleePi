const { app, BrowserWindow } = require('electron');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 200,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // Load your HTML file
  mainWindow.loadFile('index.html');

  // Create and update the clock
  function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString();
    mainWindow.webContents.send('update-time', time);
  }

  // Update the clock every second
  setInterval(updateClock, 1000);

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
