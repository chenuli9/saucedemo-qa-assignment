# SauceDemo QA Automation Assignment

Automated test suite for [SauceDemo](https://www.saucedemo.com), built with Playwright and JavaScript using the Page Object Model pattern.

## Why Playwright

I went with Playwright over Cypress and Selenium mainly because I'd already used it for a previous portfolio project, and I like that it runs tests across Chromium, Firefox, and WebKit out of the box without extra config. The built-in `request` fixture also made the API bonus task straightforward without needing a separate tool.

## Project Structure
saucedemo-qa-assignment/
├── pages/              # Page Object classes (Login, Inventory, Cart, Checkout)
├── tests/              # Test specs
│   └── api/            # API tests (bonus)
├── test-data/          # Test data kept separate from test logic
├── .github/workflows/  # CI pipeline (bonus)
└── BUG_REPORT.md        # Findings from problem_user exploration

## Setup

```bash
git clone https://github.com/chenuli9/saucedemo-qa-assignment.git
cd saucedemo-qa-assignment
npm install
npx playwright install
```

## Running Tests

Run the full suite:
```bash
npx playwright test
```

Run a specific file:
```bash
npx playwright test tests/login.spec.js
npx playwright test tests/checkout-flow.spec.js
npx playwright test tests/api/reqres.spec.js
```

View the HTML report after a run:
```bash
npx playwright show-report
```

## What's Covered

- **Login** — happy path, invalid credentials, empty fields, logout
- **E2E Purchase Flow** — add multiple items, cart badge check, full checkout, order confirmation
- **Bug Hunt** — findings from exploring as `problem_user` are in `BUG_REPORT.md`

## Bonus Work

- **API Testing** — `tests/api/reqres.spec.js` covers GET, POST, and a 404 case. Originally planned against reqres.in, but reqres.in now requires a signed-up API key for every request, which didn't make sense to hardcode into a public repo for this assignment — so I switched to JSONPlaceholder instead, which is fully open and needs no auth.
- **CI Pipeline** — `.github/workflows/tests.yml` runs the full suite on every push to `main`, with the HTML report uploaded as an artifact on failure.

## Design Decisions

- Test data (checkout name/postal code) is kept in `test-data/` rather than hardcoded in the tests.
- Screenshots and traces are captured automatically on failure (configured in `playwright.config.js`).
- I used `data-test` attributes for selectors wherever available rather than IDs or classes, since they're explicitly meant for testing and less likely to break with UI changes.

## What I'd Do Differently With More Time

I'd add a few more edge cases to the checkout flow — like submitting with an invalid postal code format, or attempting checkout with an empty cart. I'd also spend more time on the `problem_user` bug hunt, since I found four issues in the time I had but suspect there are more, especially around cart quantity edge cases and the sort dropdown.