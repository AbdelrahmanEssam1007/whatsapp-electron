const { app, BrowserWindow, session, Menu, shell } = require("electron");
const path = require("path");
const setupTray = require("./src/tray");
const setupDownloads = require("./src/downloads");

// Get Electron’s Chromium version
const electronVersion = process.versions.electron;
const chromeVersion = process.versions.chrome; // Electron bundled Chromium
console.log(`Electron ${electronVersion}, Chromium ${chromeVersion}`);
// Detect GNOME desktop environment
const isGnome = process.env.XDG_CURRENT_DESKTOP?.includes('GNOME') || 
                process.env.GDMSESSION?.includes('gnome') ||
                process.env.DESKTOP_SESSION?.includes('gnome');

if (isGnome) {
  console.log('GNOME desktop detected - tray functionality disabled to prevent issues');
}
let win;
let tray;
let isQuitting = false;

function createWindow() {
  win = new BrowserWindow({
    width: 1100,
    height: 800,
    icon: path.join(__dirname, "assets", "icon.png"),
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  // Use dynamic UA based on Chromium version
  const userAgent = `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${chromeVersion} Safari/537.36`;

  win.loadURL("https://web.whatsapp.com", { userAgent });

  win.once("ready-to-show", () => win.show());

  // Open external links in default browser
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https://") || url.startsWith("http://")) {
      shell.openExternal(url);
    }
    return { action: "deny" };
  });

  // Handle navigation to external URLs
  win.webContents.on("will-navigate", (event, url) => {
    if (!url.startsWith("https://web.whatsapp.com")) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });

  // Enable right-click context menu
  win.webContents.on("context-menu", (event, params) => {
    const menu = Menu.buildFromTemplate([
      { label: "Cut", role: "cut", enabled: params.editFlags.canCut },
      { label: "Copy", role: "copy", enabled: params.editFlags.canCopy },
      { label: "Paste", role: "paste", enabled: params.editFlags.canPaste },
      { type: "separator" },
      { label: "Select All", role: "selectAll" }
    ]);
    menu.popup();
  });

  win.on("close", (event) => {
    if (!isQuitting && tray) {
      event.preventDefault();
      win.close();
    }
  });

  setupDownloads(session.defaultSession, win);
  
  // Only setup tray if not using GNOME
  if (!isGnome) {
    tray = setupTray(win, path.join(__dirname, "assets", "tray.png"));
  }
}

// KDE / GNOME icon support
app.setName("WhatsApp");
app.setDesktopName("WhatsApp");

app.whenReady().then(() => {
  app.setAppUserModelId("whatsapp-electron");
  createWindow();
});

app.on("before-quit", () => isQuitting = true);
app.on("window-all-closed", () => {
  // On GNOME (without tray), quit the app when window closes
  // On other DEs (with tray), keep app running in tray
  if (isGnome) {
    app.quit();
  }
});
