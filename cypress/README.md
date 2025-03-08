# End-to-End Testing for Talky Application

This directory contains end-to-end tests for the Talky application using Cypress.

## Test Structure

- `e2e/talky.cy.ts`: Contains the main test suite that tests core functionality of the application
- `fixtures/user.json`: Contains test user data
- `fixtures/test-image.jpg`: Test image for post creation

## Running the Tests

### Prerequisites

Make sure you have installed all the dependencies:

```bash
npm install
# or
pnpm install
```

### Opening Cypress Test Runner

To open the Cypress Test Runner:

```bash
npm run cypress:open
# or
pnpm run cypress:open
```

### Running Tests Headlessly

To run the tests in headless mode:

```bash
npm run cypress:run
# or
pnpm run cypress:run
```

### Running Tests with Application Server

To start the application server and run the tests:

```bash
npm run test:e2e
# or
pnpm run test:e2e
```

## Test Coverage

The e2e tests cover the following user flows:

1. **User Registration**: Tests the signup process
2. **User Login**: Tests the login process
3. **Viewing Posts**: Tests that posts are displayed on the home page
4. **Creating Posts**: Tests the post creation functionality

## Notes

- The tests assume that the API endpoints are properly mocked or available
- For the user registration and login tests to pass, the API should return the expected responses
- The test image is a placeholder and should be replaced with a real image for more accurate testing
