const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('config', {
  getOfficeId: () => ipcRenderer.invoke('getOfficeId')
})
