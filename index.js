process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

const { app, BrowserWindow, shell, globalShortcut } = require('electron');
const path = require('path');
const fs = require('fs')

let mainWindow;
const createWindow = () => {
   mainWindow = new BrowserWindow({
      title: `SapokClient v.${app.getVersion()} | ${app.getAppPath()}`,
      width: 930,
      minWidth: 930,
      minHeight: 600,
      height: 600,
      webPreferences: {
         nodeIntegration: true,
         contextIsolation: false,
         backgroundThrottling: false
      }
   })
   mainWindow.removeMenu();

   mainWindow.webContents.on('new-window', function (e, url) {
      e.preventDefault();
      shell.openExternal(url);
   });

   mainWindow.loadFile('window/index.html');

   mainWindow.webContents.on('before-input-event', (event, input) => {
      if (input.control && input.shift && input.key.toLowerCase() === 'i') {
         event.preventDefault();
         mainWindow.webContents.openDevTools();
      }
   });
   mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
   createWindow();

   app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
   });

});

app.on('window-all-closed', () => {
   if (process.platform !== 'darwin') app.quit()
});

fs.mkdir('./bot/assets', () => {
   fs.mkdir('./bot/assets/captcha', () => { })
   fs.mkdir('./bot/assets/accounts', () => {
      fs.writeFile('./bot/assets/accounts/accounts.json', '', 'utf8', () => { })
   })
})

