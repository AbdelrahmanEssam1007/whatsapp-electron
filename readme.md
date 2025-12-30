# WhatsApp Electron Wrapper

A minimal, cross-desktop Linux Electron wrapper for WhatsApp Web.  

Supports:

- KDE, GNOME, Hyprland (Fedora, Debian, Arch tested)
- Tray icon with toggle (close button hides to tray)
- Right-click tray menu (Show / Quit)
- Downloads via system file picker
- Dynamic app icon (WIP)
- Portable, modular, and Git-friendly

---

## Project Structure

```
whatsapp-electron/
├── main.js          # Entry point
├── tray.js          # Tray setup
├── downloads.js     # Download picker logic
├── package.json
├── icon.png         # App icon
├── tray.png         # Tray icon
├── install.sh       # Builder / installer
├── .gitignore
└── README.md
```

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/whatsapp-electron.git
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
  - `tray.js` → tray logic  
  - `downloads.js` → download handling  
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

## Contributing

Feel free to fork the repository, submit PRs, or open issues for bug reports and feature requests.

---

## License

MIT License

