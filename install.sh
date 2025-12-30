#!/usr/bin/env bash
set -e

PROJECT_PATH="$(cd "$(dirname "$0")" && pwd)"

# Install Node.js & npm if missing
if ! command -v node &>/dev/null; then
    echo "Installing Node.js..."
    if [ -f /etc/debian_version ]; then
        sudo apt update && sudo apt install -y nodejs npm
    elif [ -f /etc/fedora-release ]; then
        sudo dnf install -y nodejs npm
    elif [ -f /etc/arch-release ]; then
        sudo pacman -S --noconfirm nodejs npm
    fi
fi

# Install dependencies
cd "$PROJECT_PATH"
npm install

# Create .desktop
if [ -n "$XDG_DATA_HOME" ]; then
    DESKTOP_FILE="$XDG_DATA_HOME/applications/whatsapp-electron.desktop"
elif [ -d "$HOME/.local/share/applications" ]; then
    DESKTOP_FILE="$HOME/.local/share/applications/whatsapp-electron.desktop"
else
    echo "Warning: Could not find a user applications directory. Falling back to \$HOME/.local/share/applications."
    DESKTOP_FILE="$HOME/.local/share/applications/whatsapp-electron.desktop"
fi
mkdir -p "$(dirname "$DESKTOP_FILE")"

cat > "$DESKTOP_FILE" <<EOF
[Desktop Entry]
Name=WhatsApp
Comment=WhatsApp Electron Client
Exec=npm start --prefix $PROJECT_PATH
Icon=$PROJECT_PATH/icon.png
Terminal=false
Type=Application
Categories=Network;Chat;
StartupWMClass=WhatsApp
EOF

chmod +x "$DESKTOP_FILE"
echo "Installation complete. You can now search 'WhatsApp' in your app launcher."
