# Cropsly.com E2E Testing - Installation & Setup Guide

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Git**
- **Chrome/Chromium** browser installed

## 🚀 Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/sharmashekhar13/cropsly-e2e-tests.git
cd cropsly-e2e-tests
```

### 2. Install Dependencies

```bash
npm install
```

This will install:
- Cypress 13.x
- Mochawesome (reporting)
- Cypress Mochawesome Reporter

### 3. Verify Installation

```bash
npx cypress --version
```

You should see version info printed.

## 🧪 Running Tests

### Run All Tests (Headless Mode)

```bash
npm run test:e2e
```

This runs all tests in headless mode and generates reports.

### Run Tests in Browser (Headed Mode)

```bash
npm run test:e2e:headed
```

This opens the Cypress Test Runner where you can:
- Watch tests run in real-time
- Debug individual tests
- See detailed logs

### Run Specific Test File

```bash
npm run test:e2e -- cypress/e2e/cropsly-homepage.cy.js
```

### Run Tests in Specific Browser

```bash
# Chrome
npm run test:e2e:chrome

# Firefox
npm run test:e2e:firefox

# Edge
npm run test:e2e:edge
```

### Run Tests with Recording

```bash
npm run test:e2e:record
```

*(Requires Cypress Cloud API key in .env)*

## 📊 Viewing Reports

### Generate HTML Report

```bash
npm run test:report
```

This generates an interactive HTML report in `mochawesome-report/`

### View Report in Browser

```bash
# After generating report
open mochawesome-report/mochawesome.html
```

## 🎯 Test Suite Structure

```
cropsly-e2e-tests/
├── cypress/
│   ├── e2e/
│   │   ├── cropsly-homepage.cy.js          # 5 tests
│   │   ├── cropsly-services.cy.js          # 6 tests
│   │   ├── cropsly-contact-form.cy.js      # 8 tests
│   │   ├── cropsly-responsive.cy.js        # 7 tests
│   │   ├── cropsly-performance.cy.js       # 4 tests
│   │   ├── cropsly-portfolio.cy.js         # 8 tests (NEW)
│   │   ├── cropsly-lead-forms.cy.js        # 6 tests (NEW)
│   │   ├── cropsly-footer.cy.js            # 6 tests (NEW)
│   │   ├── cropsly-accessibility.cy.js     # 7 tests (NEW)
│   │   ├── cropsly-seo.cy.js               # 7 tests (NEW)
│   │   └── cropsly-security.cy.js          # 5 tests (NEW)
│   ├── support/
│   │   ├── e2e.js                          # Basic commands
│   │   └── advanced-commands.js            # Advanced utilities
│   └── fixtures/                           # Test data
├── cypress.config.js
├── package.json
├── .gitignore
├── README.md
├── E2E_Test_Scenarios.csv
├── E2E_Test_Cases.csv
├── Test_Execution_Report.md
└── TEST_EXECUTION_REPORT.html
```

## 🔧 Configuration

### Update Base URL

Edit `cypress.config.js`:

```javascript
baseUrl: 'https://cropsly.com' // Change to staging/local if needed
```

### Update Timeouts

```javascript
pageLoadTimeout: 30000,        // Page load timeout (ms)
defaultCommandTimeout: 10000,  // Command timeout (ms)
requestTimeout: 15000,         // Request timeout (ms)
```

### Add Environment Variables

Create `.env` file:

```
PRODUCTION_URL=https://cropsly.com
STAGING_URL=https://staging.cropsly.com
CYPRESS_RECORD_KEY=your_key_here
```

## 📝 Writing New Tests

### Basic Test Structure

```javascript
describe('Feature Name', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should do something', () => {
    cy.get('[data-testid="element"]').should('be.visible');
    cy.get('[data-testid="button"]').click();
    cy.get('[data-testid="result"]').should('contain', 'success');
  });
});
```

### Using Custom Commands

```javascript
// In your test
cy.fillContactForm({
  name: 'John Doe',
  email: 'john@example.com',
  phone: '9876543210',
  message: 'Test message'
});

cy.testResponsive(390, 844); // iPhone 12

cy.measureLoadTime(); // Get load time
```

## 🐛 Debugging Tests

### Debug Mode

```bash
DEBUG=cypress:* npm run test:e2e
```

### Using Cypress Debug

```javascript
cy.debug(); // Pause execution
```

### Pause on Failure

```javascript
cy.pause(); // Manual pause
```

### View Network Requests

All network requests are logged in the Cypress console.

## 📊 CI/CD Integration

### GitHub Actions

Create `.github/workflows/e2e-tests.yml`:

```yaml
name: E2E Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm run test:e2e
```

## 🚨 Common Issues & Solutions

### Issue: Tests timeout

**Solution:** Increase timeout in cypress.config.js

```javascript
defaultCommandTimeout: 20000 // Increase from 10000
```

### Issue: Element not found

**Solution:** Use correct data-testid and increase wait

```javascript
cy.get('[data-testid="element"]', { timeout: 10000 }).should('exist');
```

### Issue: Form submission fails

**Solution:** Add cy.intercept to mock API

```javascript
cy.intercept('POST', '/api/contact', { statusCode: 200 });
```

### Issue: Mobile tests fail

**Solution:** Ensure viewport is set before visit

```javascript
cy.viewport(390, 844);
cy.visit('/');
```

## 📚 Resources

- [Cypress Documentation](https://docs.cypress.io)
- [Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [API Reference](https://docs.cypress.io/api/table-of-contents)

## 👥 Team

**QA Lead:** Sharma Shekhar  
**Repository:** https://github.com/sharmashekhar13/cropsly-e2e-tests  
**Website:** https://cropsly.com  

## 📄 License

MIT License - See LICENSE file for details

---

**Last Updated:** July 19, 2026  
**Status:** Active ✅
