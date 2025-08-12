const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let apiProcess;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
  });

  const isDev = !app.isPackaged;
  const webDist = isDev
    ? path.join(__dirname, '..', 'web', 'dist')
    : path.join(process.resourcesPath, 'web');

  win.loadFile(path.join(webDist, 'index.html'));
  if (isDev) win.webContents.openDevTools();
}

app.whenReady().then(() => {
  const isDev = !app.isPackaged;
  const apiPath = isDev
    ? path.join(__dirname, '..', 'api')
    : path.join(process.resourcesPath, 'api');

  apiProcess = spawn(
    'python',
    ['-m', 'uvicorn', 'app.main:app', '--host', '127.0.0.1', '--port', '8000'],
    {
      cwd: apiPath,
      stdio: 'inherit',
    }
  );

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (apiProcess) apiProcess.kill('SIGINT');
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
