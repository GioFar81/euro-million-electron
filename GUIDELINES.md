# Development Guidelines for Euromillion Project

## GitFlow Workflow

Always follow the GitFlow workflow for all development activities:

1. **Master Branch**: The `master` branch contains production-ready code.
    - Never commit directly to `master`.
    - `master` should only be updated through pull requests from `develop` or hotfix branches.

2. **Develop Branch**: The `develop` branch is the integration branch for all features.
    - All feature branches should be created from and merged back into `develop`.

3. **Feature Branches**: Create a new branch for each feature or task.
    - Branch naming convention: `feature/descriptive-feature-name`
    - Create feature branches from `develop`.
    - Merge back into `develop` when complete.
    - Then delete the feature branch.

4. **Release Branches**: When preparing a new release:
    - Branch naming convention: `release/version-number`
    - Create from `develop`.
    - Only bug fixes should be applied to release branches.
    - Merge into both `master` and `develop` when ready.

5. **Hotfix Branches**: For urgent fixes to production:
    - Branch naming convention: `hotfix/descriptive-fix-name`
    - Create from `master`.
    - Merge back into both `master` and `develop`.

## Implementation and Testing Process

Follow this process for all code changes:

1. **Implementation**:
    - Implement changes according to requirements.
    - Write appropriate unit tests for the new functionality.
    - Follow JavaScript/Electron coding conventions.

2. **Testing**:
    - **Build Verification**: Always verify that the app builds successfully after implementing changes.
        - Run `npm run build` to verify the build.
        - Fix any build errors immediately before proceeding.

    - **Functional Testing**: Verify that the app functions correctly.
        - Run unit tests with `npm test`.
        - Run integration tests if available.
        - Test the specific functionality you've implemented.

3. **Manual Testing**:
    - After automated tests pass, run the application so users can interact with it directly.
    - Use the appropriate command from the "Build and Run Instructions" section below to launch the app on your target platform.
    - Verify that all buttons and functions are working correctly through direct interaction.
    - Document any issues found during interactive testing.
    - Provide clear instructions on how to test the implemented changes.
    - Prompt the user for feedback with a clear yes/no question (e.g., "Is the application functioning correctly? (y/n)").
    - If the user responds with "n", identify and fix the issues before proceeding.
    - If the app encounters errors during manual testing, fix it before moving to the next step.

4. **README Updates**:
    - Update the README.md file to reflect any changes in:
        - Project setup instructions
        - Usage instructions
        - New features or functionality
        - Dependencies
        - Configuration requirements
    - Ensure the README remains clear, concise, and up to date.

5. **Commit Changes**:
    - **MANDATORY**: You MUST commit changes after:
        - All automated tests pass
        - Manual testing is complete and approved
        - README is updated appropriately
    - Committing after completing a task is NOT optional and MUST be done without exception.
    - Failure to commit changes after completing a task is a violation of these guidelines.
    - Use meaningful commit messages following the format:
      ```
      Short description (50 chars or less)
      
      More detailed explanation if necessary. Wrap at 72 characters.
      
      - Bullet points are acceptable
      - Explain what and why, not how (the code shows how)
      
      Relates to: #issue-number
      ```
    - Always commit your changes at the end of each task, no matter how small the change.
    - Ensure you're on the correct branch according to GitFlow workflow.
    - ⚠️ WARNING: Forgetting to commit changes can lead to lost work, confusion about project state, and difficulty tracking changes.

## Testing Framework

The project uses Jest as its testing framework. Follow these guidelines for testing:

1. **Test Structure**:
    - Place test files in a `__tests__` directory or name them with `.test.js` or `.spec.js` suffix.
    - Organize tests to mirror the structure of the source code.
    - Group related tests using `describe` blocks.
    - Use clear, descriptive test names that explain what is being tested.

2. **Test Coverage**:
    - Aim for high test coverage, especially for critical functionality.
    - Test both success and failure cases.
    - Include edge cases in your tests.

3. **Running Tests**:
    - Run all tests with `npm test`.
    - Run specific tests with `npm test -- -t "test name pattern"`.
    - Check test coverage with `npm run test:coverage`.

4. **Mocking**:
    - Use Jest's mocking capabilities to isolate the code being tested.
    - Mock external dependencies, especially API calls.
    - Use `jest.mock()` for module mocking.
    - Use `jest.spyOn()` for function spying.

## API Integration Guidelines

When working with the Euromillions API or any external APIs:

1. **API Usage**:
    - Always use the provided API module (euromillions-api.js) for interacting with the Euromillions API.
    - Handle API errors gracefully with appropriate error messages to the user.
    - Implement retry logic for transient failures when appropriate.

2. **API Testing**:
    - Test API connectivity before releasing new versions.
    - Use the test-api.js script or automated tests to verify API functionality.
    - Mock API responses in unit tests to avoid external dependencies.

3. **API Changes**:
    - Document any changes to API endpoints or response formats.
    - Update the API module to handle any changes in the API.
    - Ensure backward compatibility when possible.

4. **API Documentation**:
    - Document all API endpoints used by the application.
    - Include information about request parameters and response formats.
    - Document rate limits, authentication requirements, and other important details.
    - Keep API documentation up to date with any changes.

## Version Management

Follow these guidelines for version management:

1. **Semantic Versioning**:
    - Use semantic versioning (MAJOR.MINOR.PATCH) for the application.
    - Increment MAJOR version when making incompatible API changes.
    - Increment MINOR version when adding functionality in a backward-compatible manner.
    - Increment PATCH version when making backward-compatible bug fixes.

2. **Version Updates**:
    - Update the version number in package.json when preparing a release.
    - Document version changes in RELEASE_NOTES.md.
    - Include a summary of changes, new features, bug fixes, and any breaking changes.

3. **Release Process**:
    - Create a release branch from develop when preparing a new version.
    - After testing and finalizing the release, merge into both master and develop.
    - Tag the master branch with the new version number.

## Build and Run Instructions

### Building the Project

```
npm run build
```

### Running Tests

```
npm test
```

### Running the Application

```
npm start
```

### Building for Specific Platforms

#### Windows

```
npm run build:win
```

#### macOS

```
npm run build:mac
```

#### Linux

```
npm run build:linux
```

## Code Review Process

1. Create a pull request from your feature branch to the appropriate target branch.
2. Ensure all automated tests pass.
3. Request code review from at least one team member.
4. Address all review comments.
5. Once approved, merge the pull request.

## Troubleshooting

If you encounter build issues:

1. Check that all dependencies are correctly specified in package.json.
2. Ensure Node.js and npm are up to date.
3. Try cleaning the node_modules directory and reinstalling dependencies: `rm -rf node_modules && npm install`
4. Check for platform-specific issues in the appropriate configuration files.

---

These guidelines must be followed for all development work on the Euromillion project.
