# Euromillion Number Generator

An Electron application that generates random numbers for the Euromillion lottery game.

## Features

- Generate one to five lines of Euromillion numbers
- Each line contains five unique numbers (1–50) and two lucky stars (1–12)
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

`npm run build`

Build for specific platforms:

`npm run build:win`     Build for Windows

`npm run build:mac`     Build for macOS (requires macOS)

`npm run build:linux`   Build for Linux

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

## Continuous Integration

This project uses GitHub Actions for continuous integration and automated builds:

- Automated builds for Windows, macOS, and Linux
- Builds are triggered on pushes to `master` and `develop` branches
- Builds are also triggered on pull requests to these branches
- Build artifacts are available for download from the GitHub Actions workflow
- The `package-lock.json` file must be committed to the repository for GitHub Actions to work correctly

To manually trigger a build, go to the Actions tab in the GitHub repository and select the "Build Application" workflow.

## GitHub Releases

This project uses GitHub Releases to publish new versions of the application:

- Releases are automatically created when a new tag starting with 'v' is pushed
- The release includes installers for Windows, macOS, and Linux
- Release notes can be added to provide information about changes
- The workflow requires `contents: write` permission to create releases

### Creating a New Release

To create a new release:

1. Update the version number in `package.json`
2. Commit your changes to the repository
3. Create and push a tag with the version number:

```bash
git tag v1.0.0  # Replace with your version number
git push origin v1.0.0
```

4. The GitHub Actions workflow will automatically build the application and create a release
   - The workflow is triggered by the tag push event
   - The workflow extracts the version number from the tag (removing the 'v' prefix)
   - This version is used to name the release (e.g., "Release 1.0.0")
5. Once completed, the release will be available in the "Releases" section of the GitHub repository

### Adding Release Notes

You can add release notes to document changes in each release:

1. **Method 1: During Release Creation**
   - After pushing a tag, go to the "Releases" section in your GitHub repository
   - Edit the automatically created release
   - Add release notes in the description field
   - Click "Update release"

2. **Method 2: Using a Release Notes File**
   - Create a file named `RELEASE_NOTES.md` in your repository
   - Add your release notes to this file before pushing the tag
   - Update the release workflow to include these notes in the release

Release notes should include:
- New features
- Bug fixes
- Breaking changes
- Upgrade instructions (if applicable)

## License

This project is private and not licensed for public use.
