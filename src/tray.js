const { Tray, Menu, app } = require("electron");

module.exports = function setupTray(win, trayIconPath) {
  const tray = new Tray(trayIconPath);

  const menu = Menu.buildFromTemplate([
    { label: "Show WhatsApp", click: () => { win.show(); win.focus(); } },
    { label: "Quit", click: () => { app.quit(); } }
  ]);

  tray.setToolTip("WhatsApp");
  tray.setContextMenu(menu);

  tray.on("click", () => {
    if (win && !win.isDestroyed()) {
      win.isVisible() ? win.hide() : win.show();
    }
  });

  return tray;
};
