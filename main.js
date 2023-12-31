import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import fs from 'fs'
import installExtension, { REDUX_DEVTOOLS } from 'electron-devtools-installer'

const IS_DEV = process.env.IS_IN_DEVELOPMENT || false

function createWindow() {
  // Create the main Electron window
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(app.getAppPath(), 'preload.js')
      // preload: path.join(app.getAppPath(), 'preload.js')
      // nodeIntegration: false,
      // enableRemoteModule: false,
      // contextIsolation: true
    }
  })

  ipcMain.handle('getOfficeId', () => {
    let fileName = ''
    if (process.platform === 'win32') {
      fileName = `${process.env.PROGRAMDATA}\\queue-system.json`
    } else if (process.platform === 'darwin' || process.platform === 'linux') {
      fileName = '/etc/queue-system.json'
    }
    if (fileName === '') {
      throw new Error()
    }
    const data = fs.readFileSync(fileName, 'utf8')
    const content = JSON.parse(data)
    if (Object.hasOwn(content, 'OFFICE_ID')) {
      return content.OFFICE_ID
    }
    throw new Error()
  })

  if (IS_DEV) {
    // If we are in development mode we load content from localhost server - vite
    // and open the developer tools
    win.loadURL('http://localhost:3001')
    win.webContents.openDevTools()
  } else {
    // In all other cases, load the index.html file from the dist folder
    win.loadURL(`file://${path.join(__dirname, '..', 'dist', 'index.html')}`)
  }
}

app.whenReady().then(() => {
  installExtension(REDUX_DEVTOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err))
  createWindow()
})

app.on('window-all-closed', () => {
  // On macOS, it's common for an app and its menu bar to remain
  // active until the user shuts down the application via the Cmd + Q shortcut
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS, if an application is in the dock, it is common for a window to be created after
  // clicking on the icon in the dock if there are no windows active
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
