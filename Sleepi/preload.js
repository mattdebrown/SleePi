const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  closeButtonPressed: () => ipcRenderer.send('close-button'),
  onUpdateTime: (callback) => ipcRenderer.on('update-time', callback)
})