# Login Automated Tests

Playwright end-to-end tests for a login page.

## Setup

```bash
npm install
npx playwright install chromium
```

## Run

```bash
npm test                    # headless
npm run test:headed         # visible browser
npx playwright test --ui    # interactive UI
npm run report              # open HTML report
```

## Test your own app

```bash
# Command Prompt
set BASE_URL=http://localhost:5173
npm test
```

Update selectors, credentials, and messages in `tests/login.spec.js`.

## Tests

- Valid login
- Wrong password
- Unknown user
- Empty fields
- Logout