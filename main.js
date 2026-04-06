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
function createWindow() {
  win = new BrowserWindow({
    width: 1100,
    height: 800, // I shoud set a min height to prevent the app from breaking, but I don't want to cause issues for people with small screens, so I'll just leave it like this and hope for the best
    icon: path.join(__dirname, "assets", "icon.png"),
    autoHideMenuBar: true, // yeah we hide it cause the hyprland idiot doesnt't like how it looks, and it doesn't have any useful features anyway tbh, hit alt to show it if you need it
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true // keep true, app won't work without it
    }
  });

  // I should probably implement a better user agent spoofing solution, but this is good enough for now, and it prevents whatsapp from breaking when they update their user agent check, which they do a lot for some fucking reason
  const userAgent = `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${chromeVersion} Safari/537.36`;

  win.loadURL("https://web.whatsapp.com", { userAgent });

  win.once("ready-to-show", () => win.show());

  // does this shit even work? I should really ask amr to test without it.
  
  // Ensure webContents gets focus when window gains focus
  // This works with Electron's natural focus handling instead of against it
  win.on("focus", () => {
    if (win && !win.isDestroyed()) {
      win.webContents.focus();
    }
  });

  // Open external links in default browser
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https://") || url.startsWith("http://")) {
      shell.openExternal(url);
    }
    return { action: "deny" };
  });

  // apparently this does nothing, will uncomment it when shit breaks.

  // Handle navigation to external URLs
  // win.webContents.on("will-navigate", (event, url) => {
  //   if (!url.startsWith("https://web.whatsapp.com")) {
  //     event.preventDefault();
  //     shell.openExternal(url);
  //   }
  // });

  setupDownloads(session.defaultSession, win);
  
  // Only setup tray if not using GNOME

  // does gnome really have no tray support? 
  // I should really check considering I am the gnome maintainer, but I only really maintain kde so I don't really care about gnome
  // and I don't have time to test it, so I'll just assume it doesn't work and hope for the best
  // TODO: check gnome tray support and if it works, add a warning about it in the readme and remove this dumb check
  if (!isGnome) {
    tray = setupTray(win, path.join(__dirname, "assets", "tray.png"));
  }
}

// set icon for de's
// TODO: change the name and logo so we don't get DMCA'd 
app.setName("WhatsApp");
app.setDesktopName("WhatsApp");

app.whenReady().then(() => {
  app.setAppUserModelId("whatsapp-electron");
  createWindow();
});

// this is probably one of the worst hacks I've ever done, but it is what it is. and javascript is a horrible language, so it fits.
app.on("before-quit", () => {
  if (tray && !tray.isDestroyed()) {
    tray.destroy();
    tray = null;
  }
});
app.on("window-all-closed", () => {
  process.exit(0); // this is probably not the way to do it, but it's the only way I got to completely exit in kde 
});
