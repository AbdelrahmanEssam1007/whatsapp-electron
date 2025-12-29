const { app, dialog } = require("electron");
const path = require("path");

module.exports = function setupDownloads(session, win) {
  session.on("will-download", async (event, item) => {
    event.preventDefault();

    const { canceled, filePath } = await dialog.showSaveDialog(win, {
      defaultPath: path.join(app.getPath("downloads"), item.getFilename())
    });

    if (!canceled && filePath) {
      item.setSavePath(filePath);
      item.resume();
    }
  });
};
