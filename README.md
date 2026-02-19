# Garibook Web Test Automation (Playwright)

End-to-end web test automation project built with **Playwright** using **JavaScript** and **Page Object Model (POM)** design.

## 🧰 Tech Stack
- Playwright
- JavaScript (Node.js)
- Page Object Model (POM)

## 🧪 Test Coverage
- Login by OTP verification
- One-way booking
- Round-way booking
- Airport booking( Airport to Home/Home to Airport Both)
- Hourly booking
- Profile update
- Trip cancel
- Smoke tests
Every test case is designed to cover positive and negetive testing both for validation test purposes.

## ⚙️ Prerequisites
- Node.js (v16+)
- npm


## 📦 Installation

```bash
git clone https://github.com/your-username/Garibook-Web-Test-Automation.git
cd Garibook-Web-Test-Automation
npm install
```
Run all tests
```
npx playwright test
```
1. Pages (/pages)
Contains class definitions for each page or major component of the application.

Selectors: Defined in the constructor using Playwright locators ( getByRole, locator).

Methods: Encapsulate user actions (fillAirportTripFormHome(), confirmTrip()).

Dynamic Logic: Includes helper logic for dynamic date/time calculations (current time + 2 hours).

2. Tests (/tests)
Contains the actual test execution logic.

Uses test.describe.serial to manage execution order.

Imports Page Objects to perform actions, keeping the test files clean and readable.

Contains assertions using expect to verify success messages and application state.

3. Utils (/utils)
Contains reusable utility functions.

Data Driven Testing: Handles reading external data (like mobile numbers) to support multi-user testing.
