const { app, dialog } = require("electron");
const path = require("path");

let pendingDownloadPath = null;

module.exports = function setupDownloads(session, win) {
  session.on("will-download", async (event, item) => {
    // If we have a pending path (from our restarted download), use it
    if (pendingDownloadPath) {
      item.setSavePath(pendingDownloadPath);
      pendingDownloadPath = null;
      return;
    }
    
    // Cancel the default download to prevent default dialog
    item.cancel();
    
    const defaultPath = path.join(app.getPath("downloads"), item.getFilename());
    const url = item.getURL();

    const { canceled, filePath } = await dialog.showSaveDialog(win, {
      defaultPath: defaultPath
    });

    if (!canceled && filePath) {
      // Store the path for the restarted download
      pendingDownloadPath = filePath;
      
      // Start a new download - it will trigger will-download again with our path
      win.webContents.downloadURL(url);
    }
  });
};
