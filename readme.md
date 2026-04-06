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

