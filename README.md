# Euromillion Number Generator

An Electron application that generates random numbers for the Euromillion lottery game.

## Features

- Generate one to seven lines of Euromillion numbers
- Each line contains five unique numbers (1–50) and two lucky stars (1–12)
- Numbers are displayed in ascending order
- Simple and intuitive user interface
- Theme switching:
    - Light mode
    - Dark mode
    - System preference (automatically matches your system's theme)
- Probability-based number generation:
    - Generate numbers based on historical data
    - Choose between hot numbers (most frequent) and cold numbers (least frequent)
    - Increase your chances by using statistical analysis
- Statistics dashboard:
    - View the most and least frequently drawn numbers
    - See frequency and percentage statistics for each number
    - Based on real historical Euromillion draw data

## Installation

1. Clone this repository
2. Install dependencies with `npm install`
3. Start the application with `npm start`

## Dependencies

This application relies on the following dependencies:

- **Electron**: Framework for building cross-platform desktop applications
- **Electron Builder**: Tool for packaging and distributing Electron applications
- **Axios**: Promise-based HTTP client for making API requests
- **Electron Squirrel Startup**: Handles Squirrel events for Windows app startup

The application also uses the [Euromillions API](https://github.com/pedro-mealha/euromillions-api) to retrieve historical draw data for probability-based number generation.

## Usage

### Random Number Generation

1. Select the "Random Generation" tab (default)
2. Choose how many lines you want to play (1-7)
3. Click "Generate Random Numbers"
4. Your randomly generated Euromillion numbers will be displayed

### Probability-Based Number Generation

1. Select the "Probability-Based" tab
2. Choose your number selection strategy:
   - **Hot Numbers**: Uses the most frequently drawn numbers from historical data
   - **Cold Numbers**: Uses the least frequently drawn numbers from historical data
3. Choose how many lines you want to play (1-7)
4. Click "Generate Based on Probability"
5. Your probability-based Euromillion numbers will be displayed

> **Note:** The first time you use this feature, the application will download historical data from the Euromillion API. This may take a few moments.

### Statistics Dashboard

1. Select the "Statistics" tab
2. View the most frequently drawn numbers (Hot Numbers) and their statistics
3. View the least frequently drawn numbers (Cold Numbers) and their statistics
4. Statistics include:
   - The number itself
   - How many times it has been drawn
   - The percentage of draws it has appeared in

The statistics are based on real historical Euromillion draw data and are updated each time you start the application.

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
- `euromillions-api.js`: API integration and probability calculation logic

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
   - Only files with version numbers (e.g., *1.0.0*.exe) will be included in the release to ensure compatibility
5. Once completed, the release will be available in the "Releases" section of the GitHub repository

> **Note:** If you've created a tag before updating the workflow file or if the workflow doesn't run, you may need to recreate and push the tag:
> ```bash
> git tag -d v1.0.0  # Delete the local tag
> git push --delete origin v1.0.0  # Delete the remote tag
> git tag v1.0.0  # Recreate the tag
> git push origin v1.0.0  # Push the tag again
> ```

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
