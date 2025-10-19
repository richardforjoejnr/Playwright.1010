# Ten10 Interview Test - Interest Calculator Automation

This repository contains automated end-to-end tests for the Ten10 Interest Calculator application, built using Playwright and TypeScript following the Page Object Model design pattern.

## Overview

This test suite validates the functionality of an interest calculator application that calculates simple interest based on:
- **Principal Amount**: 0-15,000 (slider input)
- **Interest Rate**: 1%-15% (dropdown selection)
- **Duration**: Daily, Monthly, or Yearly (radio button options)
- **Consent**: Mandatory checkbox validation

### Interest Calculation Formulas

- **Yearly**: `Interest = (Principal × Rate) / 100`
- **Monthly**: `Interest = (Principal × Rate) / (100 × 12)`
- **Daily**: `Interest = (Principal × Rate) / (100 × 365)`

## Project Structure

```
├── .auth/                          # Stored authentication state
├── .github/                        # GitHub workflows and CI/CD
├── config/
│   ├── demo.ts                     # Demo environment configuration
│   └── index.ts                    # Configuration loader
├── support/
│   ├── fixtures/
│   │   └── index.ts                # Playwright fixtures for page objects
│   └── pages/
│       ├── Base.page.ts            # Base page class with common methods
│       ├── InterestCalculator.page.ts  # Interest Calculator page object
│       └── Login.page.ts           # Login page object
├── tests/
│   ├── InterestCalculator/
│   │   └── InterestCalculator.spec.ts  # Interest calculator test suite
│   ├── Login/
│   │   └── Login.spec.ts           # Login functionality tests
│   └── login.setup.ts              # Authentication setup project
├── .env.example                    # Environment variables template
├── .nvmrc                          # Node version specification
├── .prettierrc                     # Code formatting configuration
├── eslint.config.js                # ESLint configuration
├── playwright.config.ts            # Playwright test configuration
├── package.json                    # Project dependencies and scripts
└── tsconfig.json                   # TypeScript configuration
```

## Setup Instructions

### Prerequisites
- Node.js v22.11.0 (specified in .nvmrc)
- npm

### Installation

1. Clone the repository and navigate to the directory:
   ```bash
   git clone https://github.com/richardforjoesky/playwright.1010.git
   cd playwright.1010
   ```

2. Use the correct Node version:
   ```bash
   nvm use
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

5. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

6. Update `.env` with your Ten10 test account credentials:
   ```
   ENVIRONMENT=demo
   EMAIL=your-email@example.com
   PASSWORD=your-password
   ```

## Running the Tests

### Available npm Scripts

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests |
| `npm run test:ui` | Run tests in interactive UI mode |
| `npm run test:debug` | Run tests in debug mode |
| `npm run test:smoke` | Run smoke tests only (tagged with @smoke) |
| `npm run test:headed` | Run tests in headed mode (visible browser) |
| `npm run test:tag` | Run tests by tag (usage: `TAG=smoke npm run test:tag`) |
| `npm run codegen` | Launch Playwright codegen tool |
| `npm run report` | Show HTML test report |
| `npm run lint` | Run ESLint to check code quality |
| `npm run lint:fix` | Run ESLint and auto-fix issues |

### Examples

Run all tests:
```bash
npm test
```

Run smoke tests only:
```bash
npm run test:smoke
```

Run tests with specific tag:
```bash
TAG=regression npm run test:tag
```

Run tests in UI mode (recommended for development):
```bash
npm run test:ui
```

View the latest test report:
```bash
npm run report
```

## Test Coverage

### Login Tests (`tests/Login/Login.spec.ts`)
- ✅ Successful login with valid credentials
- ✅ Failed login with invalid credentials
- ✅ Validation errors when submitting empty login form

### Interest Calculator Tests (`tests/InterestCalculator/InterestCalculator.spec.ts`)

#### Basic Calculation Tests
- ✅ Calculate interest with Yearly duration
- ✅ Calculate interest with Monthly duration
- ✅ Calculate interest with Daily duration

#### Different Interest Rates
- ✅ Calculate with 1% interest rate (minimum)
- ✅ Calculate with 7% interest rate
- ✅ Calculate with 15% interest rate (maximum)

#### Validation Tests
- ✅ Consent checkbox has required attribute
- ✅ Results remain empty when consent is not checked
- ✅ Empty results displayed before calculation
- ✅ Daily option selected by default

#### Error Message Tests
- ✅ Alert dialog when Calculate clicked without selecting interest rate
- ✅ Alert dialog when mandatory fields are not selected

#### Boundary Value Tests
- ✅ Calculate with minimum principal amount (0)
- ✅ Calculate with maximum principal amount (15,000)
- ✅ Calculate with minimum interest rate (1%)


## Page Object Model

The project follows the Page Object Model pattern with clear separation of concerns:

### Page Object Structure
Each page object is organized into sections:

1. **Locators**: Element selectors (getters and methods)
2. **Actions**: User interaction methods
3. **Helper Methods**: Calculation and utility functions
4. **Assertions**: Verification methods

## Known Issues (Application Bugs)

The test suite has identified the following bugs in the application:

1. **Monthly Interest Calculation Bug**
   - Expected: 41.67
   - Actual: 50.00
   - Test: "Calculate interest with Monthly duration"

2. **Zero Principal Amount Bug**
   - Calculation with principal amount 0 doesn't display results
   - Test: "Calculate with minimum principal amount (0)"

3. **Consent Validation Bug**
   - Consent checkbox has `required` attribute but validation doesn't prevent form submission
   - Calculation proceeds even when consent is not checked

## Code Quality

### Linting
Run ESLint to check code quality:
```bash
npm run lint
```

Auto-fix linting issues:
```bash
npm run lint:fix
```

## CI/CD

GitHub Actions workflows are configured in `.github/` directory for automated testing on pull requests and pushes.

## Notes

- Access to the Ten10 test application is limited to 2 hours total
- Tests include @smoke and @regression tags for selective execution
- All passwords and sensitive data should be stored in `.env` file (not committed to repo)

## Troubleshooting

### Browser not installed
Run `npx playwright install` to install required browsers.

### Environment variables not loaded
Ensure `.env` file exists and contains required variables (EMAIL, PASSWORD).
