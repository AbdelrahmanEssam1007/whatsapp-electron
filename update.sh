#!/usr/bin/env bash
set -e

# Get the absolute path of the project (where this script lives)
PROJECT_PATH="$(cd "$(dirname "$0")" && pwd)"
cd "$PROJECT_PATH"

echo "Updating WhatsApp Electron wrapper at $PROJECT_PATH"

# Update Node dependencies
echo "Installing/updating npm dependencies..."
npm install

# Update Electron to the latest stable version
echo "Updating Electron to the latest version..."
npm install electron@latest --save-dev

echo "Electron updated. Current version:"
npx electron --version

echo "Update complete! You can now run the app with:"
echo "  npm start"
