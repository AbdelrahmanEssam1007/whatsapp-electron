const { app, dialog } = require("electron");
const path = require("path");

module.exports = function setupDownloads(session, win) {
  session.on("will-download", async (event, item) => {
    const defaultPath = path.join(app.getPath("downloads"), item.getFilename());

    const { canceled, filePath } = await dialog.showSaveDialog(win, {
      defaultPath: defaultPath
    });

    if (canceled) {
      item.cancel();
    } else {
      item.setSavePath(filePath);
    }
  });
};
