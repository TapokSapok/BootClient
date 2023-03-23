process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

const { app, BrowserWindow, shell, globalShortcut, ipcMain } = require('electron');
const path = require('path');

const fs = require('fs')

let mainWindow;
const createWindow = () => {
   mainWindow = new BrowserWindow({
      title: `SapokClient v.${app.getVersion()}`,
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


// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function cAssets() {
   fs.mkdir(`${process.env.APPDATA}/SapokClient/assets`, () => {

      fs.mkdir(`${process.env.APPDATA}/SapokClient/assets/accounts`, () => {
         if (!fs.existsSync(`${process.env.APPDATA}/SapokClient/assets/accounts/accounts.json`)) {
            fs.writeFile(`${process.env.APPDATA}/SapokClient/assets/accounts/accounts.json`, '[]', 'utf8', () => { })
         };
      })

      if (!fs.existsSync(`${process.env.APPDATA}/SapokClient/assets/captcha`)) {
         fs.mkdir(`${process.env.APPDATA}/SapokClient/assets/captcha`, () => { })
      } else {
         fs.readdir(`${process.env.APPDATA}/SapokClient/assets/captcha`, (err, files) => {
            if (err) throw err

            for (const file of files) {
               console.log(file)
               fs.unlink(`${process.env.APPDATA}/SapokClient/assets/captcha/${file}`, (err) => {
                  if (err) throw err
               })
            }
         })
      }
   })
}

if (!fs.existsSync(`${process.env.APPDATA}/SapokClient`)) {
   fs.mkdir(`${process.env.APPDATA}/SapokClient`, () => {
      cAssets()
   })
} else cAssets()





