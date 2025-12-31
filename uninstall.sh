#!/usr/bin/env bash
set -e

PROJECT_PATH="$(cd "$(dirname "$0")" && pwd)"

# Remove .desktop file
if [ -n "$XDG_DATA_HOME" ]; then
    DESKTOP_FILE="$XDG_DATA_HOME/applications/whatsapp-electron.desktop"
elif [ -d "$HOME/.local/share/applications" ]; then
    DESKTOP_FILE="$HOME/.local/share/applications/whatsapp-electron.desktop"
else
    DESKTOP_FILE="$HOME/.local/share/applications/whatsapp-electron.desktop"
fi

if [ -f "$DESKTOP_FILE" ]; then
    rm "$DESKTOP_FILE"
    echo "Removed desktop entry: $DESKTOP_FILE"
else
    echo "Desktop entry not found at: $DESKTOP_FILE"
fi

# Remove node_modules
cd "$PROJECT_PATH"
if [ -d "node_modules" ]; then
    rm -rf node_modules
    echo "Removed node_modules"
fi

# Remove package-lock.json if it exists
if [ -f "package-lock.json" ]; then
    rm package-lock.json
    echo "Removed package-lock.json"
fi

echo "Uninstallation complete."
