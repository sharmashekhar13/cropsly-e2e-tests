# Cropsly.com E2E Testing - Troubleshooting Guide

## 🔴 Common Errors & Solutions

### 1. **Element Not Found**

**Error Message:**
```
CypressError: Timed out retrying after 5000ms: expected to find content: 'button'
```

**Causes & Solutions:**

```javascript
// ❌ Problem: Using wrong selector
cy.get('.btn').click(); // Generic class

// ✅ Solution: Use data-testid
cy.get('[data-testid="submit-btn"]').click();

// ❌ Problem: Element not loaded yet
cy.get('[data-testid="result"]').should('be.visible');

// ✅ Solution: Increase timeout
cy.get('[data-testid="result"]', { timeout: 10000 }).should('be.visible');

// ❌ Problem: Element hidden by CSS
cy.get('[data-testid="modal"]').should('be.visible'); // Hidden by display: none

// ✅ Solution: Check visibility separately
cy.get('[data-testid="modal"]').should('not.have.css', 'display', 'none');
```

### 2. **Form Input Not Working**

**Error Message:**
```
CypressError: Failed to execute 'setSelectionRange' on 'HTMLInputElement'
```

**Causes & Solutions:**

```javascript
// ❌ Problem: Element not focused
cy.get('[data-testid="email"]').type('test@example.com');

// ✅ Solution: Clear first, then type
cy.get('[data-testid="email"]').clear().type('test@example.com');

// ❌ Problem: Input disabled
cy.get('[data-testid="email"]').type('test@example.com');

// ✅ Solution: Check if enabled
cy.get('[data-testid="email"]').should('not.be.disabled').type('test@example.com');

// ❌ Problem: Input inside shadow DOM
cy.get('[data-testid="email"]').type('test@example.com'); // Fails

// ✅ Solution: Use pierce
cy.get('[data-testid="email"] >>>', { pierceHandler: true }).type('test@example.com');
```

### 3. **Button Click Not Working**

**Error Message:**
```
CypressError: cy.click() failed because the element is hidden
```

**Causes & Solutions:**

```javascript
// ❌ Problem: Element covered by another element
cy.get('[data-testid="button"]').click(); // Fails - modal overlay

// ✅ Solution: Wait for overlay to disappear
cy.get('[data-testid="modal-overlay"]').should('not.be.visible');
cy.get('[data-testid="button"]').click();

// ❌ Problem: Button is off-screen
cy.get('[data-testid="button"]').click();

// ✅ Solution: Scroll to element
cy.get('[data-testid="button"]').scrollIntoView().click();

// ❌ Problem: Lazy-loaded button
cy.get('[data-testid="button"]').click(); // Element not yet in DOM

// ✅ Solution: Wait for element
cy.get('[data-testid="button"]', { timeout: 10000 }).should('exist').click();
```

### 4. **Navigation Not Working**

**Error Message:**
```
CypressError: Timed out retrying after 5000ms: expected <http://localhost:3000/contact> to satisfy a request to the url: <http://localhost:3000/services>
```

**Causes & Solutions:**

```javascript
// ❌ Problem: URL assertion too strict
cy.url().should('equal', 'http://localhost:3000/services');

// ✅ Solution: Use include
cy.url().should('include', '/services');

// ❌ Problem: Navigation not complete
cy.get('[data-testid="nav-link"]').click();
cy.url().should('include', '/services'); // Might fail

// ✅ Solution: Wait for navigation
cy.get('[data-testid="nav-link"]').click();
cy.get('[data-testid="page-content"]', { timeout: 10000 }).should('be.visible');
cy.url().should('include', '/services');
```

### 5. **API Request Intercepting Issues**

**Error Message:**
```
CypressError: cy.intercept() failed because the route matcher did not match the request
```

**Causes & Solutions:**

```javascript
// ❌ Problem: Route pattern mismatch
cy.intercept('POST', '/contact', { statusCode: 200 });
cy.get('[data-testid="form-submit"]').click(); // Request to /api/contact

// ✅ Solution: Match full path
cy.intercept('POST', '/api/contact', { statusCode: 200 });
cy.get('[data-testid="form-submit"]').click();

// ❌ Problem: Intercept defined after visit
cy.visit('/contact');
cy.intercept('POST', '/api/contact', { statusCode: 200 }); // Too late

// ✅ Solution: Define intercept before visit
cy.intercept('POST', '/api/contact', { statusCode: 200 });
cy.visit('/contact');
cy.get('[data-testid="form-submit"]').click();
```

### 6. **Mobile Viewport Issues**

**Error Message:**
```
CypressError: This element <button> is not visible because it has CSS property: "display: none"
```

**Causes & Solutions:**

```javascript
// ❌ Problem: Wrong viewport size
cy.viewport(1920, 1080);
cy.get('[data-testid="mobile-menu"]').should('be.visible'); // Hidden on desktop

// ✅ Solution: Use correct mobile size
cy.viewport(390, 844); // iPhone 12
cy.get('[data-testid="mobile-menu"]').should('be.visible');

// ❌ Problem: Viewport changed mid-test
cy.visit('/');
cy.get('[data-testid="desktop-element"]').should('be.visible');
cy.viewport(390, 844);
cy.get('[data-testid="desktop-element"]').should('be.visible'); // Fails

// ✅ Solution: Set viewport before visit
cy.viewport(390, 844);
cy.visit('/');
cy.get('[data-testid="mobile-element"]').should('be.visible');
```

### 7. **Timeout Issues**

**Error Message:**
```
CypressError: Timed out retrying after 5000ms: expected to find element
```

**Causes & Solutions:**

```javascript
// ❌ Problem: Element loading slowly
cy.get('[data-testid="result"]').should('be.visible'); // Default 5s timeout

// ✅ Solution: Increase timeout
cy.get('[data-testid="result"]', { timeout: 15000 }).should('be.visible');

// ❌ Problem: Page loading slowly
cy.visit('/services'); // Default 30s timeout

// ✅ Solution: Increase in config
// cypress.config.js
pageLoadTimeout: 60000 // 60 seconds

// ❌ Problem: Network request slow
cy.get('[data-testid="data"]').should('be.visible'); // API call slow

// ✅ Solution: Wait for API
cy.wait('@getServices', { timeout: 15000 });
cy.get('[data-testid="data"]').should('be.visible');
```

### 8. **Screenshot & Video Issues**

**Error Message:**
```
CypressError: Can only take screenshots of visible windows
```

**Causes & Solutions:**

```javascript
// ❌ Problem: Taking screenshot of hidden element
cy.get('[data-testid="hidden"]').screenshot(); // Hidden element

// ✅ Solution: Make visible first
cy.get('[data-testid="hidden"]').should('be.visible').screenshot();

// ❌ Problem: Videos consuming disk space
// cypress.config.js
video: true; // Enables all videos

// ✅ Solution: Only on failure
videoOnFailure: true,
video: false,
```

## 🟡 Flaky Tests

### Identifying Flaky Tests

```bash
# Run test multiple times
for i in {1..10}; do
  npm run test:e2e -- cypress/e2e/cropsly-homepage.cy.js
done
```

### Common Causes & Fixes

**1. Race Conditions**

```javascript
// ❌ Problem: Timing dependent
cy.get('[data-testid="button"]').click();
cy.get('[data-testid="result"]').should('be.visible'); // Might fail

// ✅ Solution: Wait for action to complete
cy.get('[data-testid="button"]').click();
cy.intercept('POST', '/api/action').as('action');
cy.wait('@action');
cy.get('[data-testid="result"]').should('be.visible');
```

**2. Animations**

```javascript
// ❌ Problem: Clicking during animation
cy.get('[data-testid="menu-button"]').click();
cy.get('[data-testid="menu-item"]').click(); // Animation not complete

// ✅ Solution: Wait for animation
cy.get('[data-testid="menu"]').should('not.have.class', 'animating');
cy.get('[data-testid="menu-item"]').click();
```

**3. External Dependencies**

```javascript
// ❌ Problem: Depending on external API
cy.visit('/'); // External API might be slow

// ✅ Solution: Mock external calls
cy.intercept('GET', 'https://external-api.com/**', { statusCode: 200 });
cy.visit('/');
```

## 🔵 Environment-Specific Issues

### Local Environment

```bash
# Install and run local server
npm install
npm run dev # Start local server

# Update cypress.config.js
baseUrl: 'http://localhost:3000'

# Run tests
npm run test:e2e
```

### Staging Environment

```bash
# Update .env
STAGING_URL=https://staging.cropsly.com

# Update cypress.config.js
baseUrl: process.env.STAGING_URL

# Run tests
npm run test:e2e
```

### Production Environment

```bash
# Use production URL (read-only tests only)
baseUrl: 'https://cropsly.com'

# Run only non-destructive tests
npm run test:e2e -- cypress/e2e/cropsly-homepage.cy.js
```

## 🟠 Performance Issues

### Test Execution Too Slow

```bash
# Run tests in parallel
npm run test:e2e -- --parallel --record

# Run specific test suite only
npm run test:e2e -- cypress/e2e/cropsly-homepage.cy.js

# Disable videos for faster execution
# cypress.config.js
video: false,
```

### Memory Leaks

```javascript
// Clear data between tests
afterEach(() => {
  cy.window().then((win) => {
    win.localStorage.clear();
    win.sessionStorage.clear();
  });
});
```

## 📋 Debugging Checklist

- [ ] Check test selector (use DevTools to verify)
- [ ] Verify element is visible on page
- [ ] Check for JavaScript errors in console
- [ ] Review Cypress logs for more details
- [ ] Take screenshots before/after failure
- [ ] Try running test in headed mode
- [ ] Check network requests (DevTools)
- [ ] Verify test data is correct
- [ ] Check for timing/race conditions
- [ ] Run test multiple times for flakiness

## 🆘 Getting Help

1. **Cypress Documentation:** https://docs.cypress.io
2. **GitHub Issues:** https://github.com/sharmashekhar13/cropsly-e2e-tests/issues
3. **Stack Overflow:** Tag questions with `cypress`
4. **Cypress Gitter:** https://gitter.im/cypress-io/cypress

---

**Remember:** Most test failures are due to timing or selector issues. Use logs, screenshots, and headed mode to debug!
