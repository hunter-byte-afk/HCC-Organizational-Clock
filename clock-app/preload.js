const { contextBridge, ipcRenderer } = require("electron");

// Login removed — keep the API surface consistent for other code
contextBridge.exposeInMainWorld("electronAPI", {});
