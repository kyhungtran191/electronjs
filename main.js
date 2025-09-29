const { app, BrowserWindow, Menu, ipcMain } = require('electron/main')
const { shell } = require('electron')
const path = require('node:path')


const menuItems = [
    {
        label: "Menu",
        submenu: [
            {
                label: "About",
                click: async () => {
                    console.log("Hello")
                }
            },
        ],
    },
    {
        label: "File",
        submenu: [
            {
                label: "Open Camera",
                click: async () => {
                    const win2 = new BrowserWindow({
                        height: 500,
                        width: 800,
                        show: false,
                        webPreferences: {
                            preload: path.join(__dirname, "cameraPreload.js"),
                        },
                    });

                    ipcMain.on("close-window-2", () => win2.close());

                    win2.webContents.openDevTools();
                    win2.loadFile("camera.html");
                    win2.once("ready-to-show", () => win2.show());
                },
            },
            {
                label: "Learn More",
                click: async () => {
                    await shell.openExternal("https://bitfumes.com");
                },
            },
            {
                type: "separator",
            },
            {
                label: "Exit",
                click: () => app.quit(),
            },
        ],
    },
    {
        label: "Window",
        submenu: [
            {
                role: "Minimize",
            },
            {
                role: "close",
            },
        ],
    },
];
// Define menu
const menu = Menu.buildFromTemplate(menuItems);
Menu.setApplicationMenu(menu);

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,

        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.webContents.openDevTools()
    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()

    // If there are no window tab -> open new one.
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

// Check the MAC - Window behavior
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
