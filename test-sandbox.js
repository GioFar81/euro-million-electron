// Test script to verify sandbox configuration
const { app, BrowserWindow } = require('electron');
const path = require('path');

// Log sandbox status
console.log('Sandbox enabled at app level:', app.isDefaultSandboxEnabled ? 'Yes' : 'No');

app.whenReady().then(() => {
  // Create a test window
  const testWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      sandbox: true,
    }
  });

  // Load a simple HTML file
  testWindow.loadFile('index.html').then(() => {
    console.log('Window loaded successfully');
    
    // Execute JavaScript in the renderer to check sandbox status
    testWindow.webContents.executeJavaScript(`
      console.log('Running in sandbox:', process.sandboxed ? 'Yes' : 'No');
      'Sandbox test complete';
    `).then((result) => {
      console.log(result);
      app.quit();
    }).catch(err => {
      console.error('Error executing JavaScript:', err);
      app.quit();
    });
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
