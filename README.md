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

### Build Configuration

The build configuration is defined in `package.json` under the `build` section:

- **Windows**: Builds NSIS installer and portable executable
- **macOS**: Builds DMG and ZIP packages
- **Linux**: Builds AppImage and Debian package

Each platform has specific configuration options, including icon paths and target formats. The build output is stored in the `dist` directory.

#### Icon Requirements

Different platforms have different requirements for application icons:

- **Windows**: ICO format (`.ico`)
- **macOS**: ICNS format (`.icns`) or high-resolution PNG (at least 512x512 pixels)
- **Linux**: PNG or ICO format

For macOS builds, the icon must be at least 512x512 pixels in size. If no specific icon is provided for macOS, the default Electron icon will be used.

## GitHub Releases

This project uses GitHub Releases to publish new versions of the application:

- Releases are automatically created when a new tag starting with 'v' is pushed
- The release includes installers for Windows, macOS, and Linux
- Release notes can be added to provide information about changes

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

## Troubleshooting

### Build Issues

If you encounter issues with the build process:

1. **Missing Dependencies**
   - Ensure all dependencies are installed with `npm ci` instead of `npm install`
   - Check that you have the required system dependencies for electron-builder

2. **Platform-Specific Issues**
   - **Windows**: Ensure you have the correct Visual Studio build tools
   - **macOS**: Building macOS apps requires a macOS system
   - **Linux**: Ensure you have required dependencies like `fakeroot` and `dpkg`

3. **GitHub Actions Failures**
   - Check the workflow logs for specific error messages
   - Verify that the artifact paths in the workflow files match the output directories in `package.json`
   - Ensure all platform configurations are properly defined in `package.json`

4. **Icon-Related Issues**
   - For macOS: Ensure icons are at least 512x512 pixels and in ICNS or PNG format
   - For Windows: Use ICO format for icons
   - For Linux: PNG or ICO formats are supported
   - If you encounter icon-related errors, consider using platform-specific icons or removing the icon property for problematic platforms

## License

This project is private and not licensed for public use.
