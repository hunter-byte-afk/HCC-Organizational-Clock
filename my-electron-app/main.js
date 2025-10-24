// importing two electron modules with CommonJS module syntax
    // app, which controls the application's event lifecycle
    // BroswerWindow, which creates and manages app windows
const { app, BrowserWindow, ipcMain } = require('electron/main')

const path = require('node:path')
const { contextIsolated } = require('node:process')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
  });
  win.loadFile('index.html')
}
app.whenReady().then(() => {
  ipcMain.handle('ping', () => 'pong')
  createWindow()
})