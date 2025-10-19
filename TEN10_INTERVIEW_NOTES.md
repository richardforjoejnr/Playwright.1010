# Ten10 Interview Task - Interest Calculator Automation

## Task Overview
**Deadline:** 7 days
**Time Limit:** 2 hours total access to the application
**Submission:** Public GitHub repository (preferred) or attachment

---

## Application Details

### Portal Information
- **URL:** http://3.8.242.61/
- **Registration:** Use the email address provided during job application
- **Requirements:** Available after login

Requirements
Objective: As a product owner, I want to build a responsive interest calculator web application.

Features:

- The application should provide options to choose the duration for interest calculation: Daily, Monthly, and Yearly.
[Tests - Daily, Monthly , Yearly duration]
- Users should be able to input the principal amount.
[Tests - Min, Max, inbetween, out of bounds]
Users should be able to select the interest rate from a predefined list of rates up to 15%.
[Tests - List of interest rates]
- The application should calculate the correct interest based on the selected duration, principal amount, and interest rate.
- The application should display the calculated interest and the total amount including interest.
[Tests - Variations of Principle, Interest rate, duration]
- All input fields (principal amount, interest rate, duration and consent) are mandatory.
- The application should inform the user if any field is left empty or not selected.
- For simplicity, the calculated interest and total amount should be rounded to two decimal places.
- Clear error messages should be displayed to guide users in case of missing or incorrect inputs.
[Tests - Mandatory fields + error message]
- The application should be responsive and user-friendly.
[N/A]


### Application Under Test
- **Type:** Basic Interest Calculator
- **Purpose:** Calculate interest amount and total balance based on user inputs
-- Login page
-- Calculator page

---

## Actual Requirements (From Ten10)

### Features to Test

#### 1. Duration Options
- Daily
- Monthly
- Yearly
- Field is **mandatory**
Users must be able to select one of these duration options

#### 2. Principal Amount Input
- Users can input the principal amount
- Field is **mandatory**

#### 3. Interest Rate Selection
- Predefined list of rates **up to 15%**
- Users select from dropdown/list
- Field is **mandatory**

#### 4. Calculation Requirements
- Calculate **correct interest** based on:
  - Selected duration (Daily/Monthly/Yearly)
  - Principal amount
  - Interest rate
- Display **calculated interest**
- Display **total amount** (Principal + Interest)
- Results rounded to **2 decimal places**

#### 5. Validation Requirements
- All fields are **mandatory**:
  - Principal amount
  - Interest rate
  - Duration
  - Consent (checkbox/agreement)
- Application must inform user if any field is empty or not selected
- Clear error messages for missing or incorrect inputs

---

## Test Requirements Summary

### What to Verify
1. ✅ Interest calculator functions as intended
2. ✅ Correct interest amount calculation for **Daily** duration
3. ✅ Correct interest amount calculation for **Monthly** duration
4. ✅ Correct interest amount calculation for **Yearly** duration
5. ✅ Total balance = Principal + Interest
6. ✅ Results rounded to 2 decimal places
7. ✅ All mandatory fields validated (Principal, Rate, Duration, Consent)
8. ✅ Clear error messages displayed for empty/missing fields
9. ✅ Interest rate options available up to 15%

---

## Pre-Task Preparation Checklist

### BEFORE Starting the 2-Hour Timer

- [ ] Register on http://3.8.242.61/ with Ten10 application email
- [ ] Login and locate the requirements document
- [ ] Read and document all requirements

### Environment Setup (Done before starting task)
- [x] Playwright framework already configured
- [x] Page Object Model structure in place
- [x] Config files ready (demo.ts to be created)
- [x] Test templates created in `tests/`


---

## Framework Setup

### Configuration Files

#### Update `.env` file
```
ENVIRONMENT=demo
EMAIL=your-ten10-email@example.com
PASSWORD=your-secure-password
```

---

## Test Strategy (2-Hour Plan)

### Priority Test Cases

#### MUST HAVE (Priority 1) - Core Functionality
1. **Yearly calculation** - P=1000, R=5%, Duration=Yearly, with consent
2. **Monthly calculation** - P=1000, R=10%, Duration=Monthly, with consent
3. **Daily calculation** - P=1000, R=15%, Duration=Daily, with consent
4. **Verify total = principal + interest** (all durations)
5. **Verify 2 decimal place rounding** (e.g., 1000.567 → 1000.57)

#### SHOULD HAVE (Priority 2) - Validation
6. **Empty principal field** - verify error message displayed
7. **No interest rate selected** - verify error message displayed
8. **No duration selected** - verify error message displayed
9. **Consent not checked** - verify error message displayed
10. **All fields empty** - verify appropriate error messages

#### Core areas
- Basic Calculation Tests
- Different Interest Rates
- Decimal Rounding Tests
- Field Validation Tests
- Error Message Tests
- Boundary Value Tests

---

## Playwright Locator Quick Reference

### Finding Elements
```typescript
// By role (BEST)
page.getByRole('button', { name: 'Calculate' })
page.getByRole('textbox', { name: 'Principal' })

// By label
page.getByLabel('Principal Amount')
page.getByLabel('Interest Rate')

// By test ID (if available)
page.getByTestId('calculate-btn')

// By CSS selector
page.locator('#principal')
page.locator('.interest-result')
page.locator('input[name="principal"]')

// By text
page.getByText('Balance')
page.getByText(/interest/i)  // Case insensitive
```


---

## Interest Calculation Formulas

Use chatGPT for function to calculate and check these
---

### Test Approach

#### Formulas Validated
- **Yearly:** Interest = (Principal × Rate) / 100
- **Monthly:** Interest = (Principal × Rate) / (100 × 12)
- **Daily:** Interest = (Principal × Rate) / (100 × 365)
- **Total:** Principal + Interest (rounded to 2 decimals)

### Key Features Tested
1. All three duration types (Daily, Monthly, Yearly)
2. Interest rate dropdown (predefined rates up to 15%)
3. Mandatory field validations
4. Consent checkbox requirement
5. Error message display for missing fields
6. 2 decimal place rounding


## Notes
During manual and automated testing, I encountered the following:

- Using getByLabel for input and dropdown fields proved more reliable for some fields.

- Using getByRole for the buttons provided stable selectors without adding extra attributes.

- The login page had its own route, but the calculator page loaded on the same root (/) after login. Thought it would have its own route

## BUGS

1. Monthly Interest Calculation Bug

Test: “Calculate interest with Monthly duration”

Inputs: Principal = 5000, Rate = 10%

Expected: (5000 × 10) / (100 × 12) = 41.67

Actual: 50.00

The calculator seems to apply the yearly formula to monthly duration instead of dividing by 12.

2. Consent Validation Bug

I was able to click “Calculate” without checking the consent box, even though it’s marked mandatory.

3. Invalid principle input allowed - 0

When the principal amount is 0, all other fields selected, and consent checked:

The message shown was “Please fill in all fields”, seems a principle value of 0 is not valid but is selectable.


