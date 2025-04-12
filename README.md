# Euromillion Number Generator

An Electron application that generates random numbers for the Euromillion lottery game.

## Features

- Generate 1 to 5 lines of Euromillion numbers
- Each line contains 5 unique numbers (1-50) and 2 lucky stars (1-12)
- Numbers are displayed in ascending order
- Simple and intuitive user interface
- Theme switching:
  - Light mode
  - Dark mode
  - System preference (automatically matches your system's theme)

## Installation

1. Clone this repository
2. Install dependencies with `npm install`
3. Start the application with `npm start`

## Building for Distribution

This application can be built for Windows, macOS, and Linux platforms.

### Prerequisites

- Node.js and npm installed
- For macOS builds on non-macOS platforms: Not possible (Apple requires macOS for building macOS applications)
- For Windows builds on non-Windows platforms: Wine installed

### Build Commands

Build for all platforms (where possible):
```
npm run build
```

Build for specific platforms:
```
npm run build:win    # Build for Windows
npm run build:mac    # Build for macOS (requires macOS)
npm run build:linux  # Build for Linux
```

The built applications will be available in the `dist` directory.

### Build Outputs

- **Windows**: NSIS installer (.exe) and portable (.exe)
- **macOS**: DMG (.dmg) and ZIP (.zip)
- **Linux**: AppImage (.AppImage) and Debian package (.deb)

## Development

This project follows the gitflow workflow:
- `master` branch contains production-ready code
- `develop` branch is used for development
- Feature branches are created from `develop` for new features

### Code Structure
- `index.html`: Main HTML file
- `styles.css`: CSS styles for the application
- `index.js`: Electron application entry point

## License

This project is private and not licensed for public use.
