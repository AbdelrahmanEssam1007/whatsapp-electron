const { app, dialog } = require("electron");
const path = require("path");

let isDialogOpen = false;

module.exports = function setupDownloads(session, win) {
  session.on("will-download", async (event, item) => {
    // Prevent duplicate dialogs - check and set synchronously
    if (isDialogOpen) {
      item.cancel();
      return;
    }
    isDialogOpen = true;

    event.preventDefault();

    const defaultPath = path.join(app.getPath("downloads"), item.getFilename());
    const url = item.getURL();

    try {
      const { canceled, filePath } = await dialog.showSaveDialog(win, {
        defaultPath: defaultPath
      });

      if (!canceled && filePath) {
        // Start a fresh download with the chosen path
        win.webContents.downloadURL(url);
        session.once("will-download", (e, newItem) => {
          newItem.setSavePath(filePath);
        });
      }
    } finally {
      // Small delay to prevent race conditions
      setTimeout(() => {
        isDialogOpen = false;
      }, 500);
    }
  });
};
