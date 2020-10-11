const {app, BrowserWindow} = require('electron'); //create native browser window
const path = require('path');
const url = require('url');


//hold. so it is not garbage collected
let window = null;

function createWindow(){
    window = new BrowserWindow({
        width: 800,
        height: 600,

        backgroundColor: "#D6D8DC",

        show: false,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false,
            enableRemoteModule: true,
          }
    });
}

app.once('ready', () => {

    createWindow();

    window.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes:true
    }))

    //to open dev tools
    // window.webContents.openDevTools();

    window.once('ready-to-show', () => {
        window.show();
    })

    window.on('closed', () => {
        console.log("Shutting down gracefully");
    })
});

app.on('window-all-closed', () =>{
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () =>{
    if (mainWindow === null) createWindow();
})