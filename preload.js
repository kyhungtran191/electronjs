const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron
})

contextBridge.exposeInMainWorld("electronAPI", {
    getImage: (callback) => ipcRenderer.on("get-image", callback),
    closeWindow2: () => ipcRenderer.send("close-window-2"),
});