  # WhatsApp Electron Wrapper

A minimal, cross-desktop Linux Electron wrapper for WhatsApp Web.  

Supports:

- KDE, GNOME, Hyprland (Fedora, Debian, Arch tested)
- Right-click tray menu (Show / Quit)
- Downloads via system file picker
- Dynamic app icon (WIP)

---

## Project Structure

```
whatsapp-electron/
├── main.js              # Entry point
├── src/
│   ├── tray.js          # Tray setup
│   └── downloads.js     # Download picker logic
├── assets/
│   ├── icon.png         # App icon
│   └── tray.png         # Tray icon
├── package.json
├── install.sh           # Builder / installer
├── update.sh            # Update script
├── uninstall.sh         # Uninstaller
├── .gitignore
└── README.md
```

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/codujin/whatsapp-electron.git
cd whatsapp-electron
```

2. Make the installer executable and run it:

```bash
chmod +x install.sh
./install.sh
```

This will:

- Install Node.js (if missing)
- Install project dependencies
- Create a `.desktop` file for your system

If you are an Ubuntu user, or you see the Electron sandbox error below:

```text
The SUID sandbox helper binary was found, but is not configured correctly. Rather than run without sandboxing I'm aborting now. You need to make sure that /path/to/whatsapp-electron/node_modules/electron/dist/chrome-sandbox is owned by root and has mode 4755.
/path/to/whatsapp-electron/node_modules/electron/dist/electron exited with signal SIGTRAP
```

Run this first:

```bash
sudo chown root:root "$PWD/node_modules/electron/dist/chrome-sandbox"

sudo chmod 4755 "$PWD/node_modules/electron/dist/chrome-sandbox"
```

This disables Ubuntu's AppArmor restriction on unprivileged user namespaces, which can block Electron's sandbox from starting correctly.

3. Launch WhatsApp from your app menu or via terminal:

```bash
npm start
```

---

## Usage

- Close the window → app hides to tray  
- Click the tray icon → show/hide window  
- Right-click tray → menu (Show / Quit)  
- Downloads → system file picker dialog
- If you hit the sandbox/AppArmor error on Ubuntu, run the commands above before starting the app.

---

## Development

- Modular structure makes it easy to add features:  
  - `src/tray.js` → tray logic  
  - `src/downloads.js` → download handling  
  - `main.js` → entry point

- To run locally for development:

```bash
npm install
npm start
```

---

## Supported Environments

- KDE Plasma (Fedora, etc.)  
- GNOME (Debian, etc.)
- Hyprland (Arch, etc.)

---
## License

GPL v2

