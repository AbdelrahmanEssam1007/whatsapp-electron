const { Tray, Menu } = require("electron");

module.exports = function setupTray(win, trayIconPath) {
  const tray = new Tray(trayIconPath);

  const menu = Menu.buildFromTemplate([
    { label: "Show WhatsApp", click: () => { win.show(); win.focus(); } },
    { label: "Quit", click: () => { process.exit(0); } }
  ]);

  tray.setToolTip("WhatsApp");
  tray.setContextMenu(menu);

  tray.on("click", () => win.isVisible() ? win.hide() : win.show());

  return tray;
};
