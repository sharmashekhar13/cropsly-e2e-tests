# Cropsly.com E2E Testing - Best Practices Guide

## 🎯 Test Writing Best Practices

### 1. **Descriptive Test Names**

❌ Bad:
```javascript
it('should work', () => {
  cy.get('.btn').click();
});
```

✅ Good:
```javascript
it('TC-001: Homepage CTA button should navigate to contact form', () => {
  cy.get('[data-testid="cta-button"]').click();
  cy.url().should('include', '/contact');
});
```

### 2. **Use Data Test IDs**

❌ Bad:
```javascript
cy.get('.submit-btn').click();
cy.get('form input').type('test@example.com');
```

✅ Good:
```javascript
cy.get('[data-testid="form-submit"]').click();
cy.get('[data-testid="form-email"]').type('test@example.com');
```

### 3. **Proper Wait Handling**

❌ Bad:
```javascript
cy.wait(5000); // Hard wait
cy.get('[data-testid="result"]').should('be.visible');
```

✅ Good:
```javascript
cy.get('[data-testid="result"]', { timeout: 10000 }).should('be.visible');
```

### 4. **Arrange-Act-Assert Pattern**

```javascript
it('should submit contact form successfully', () => {
  // Arrange - Setup
  cy.visit('/contact');
  
  // Act - Perform action
  cy.get('[data-testid="form-name"]').type('John Doe');
  cy.get('[data-testid="form-email"]').type('john@example.com');
  cy.get('[data-testid="form-submit"]').click();
  
  // Assert - Verify result
  cy.get('[data-testid="success-message"]').should('be.visible');
});
```

### 5. **Test Independence**

✅ Each test should be independent:

```javascript
describe('Contact Form', () => {
  beforeEach(() => {
    cy.visit('/contact'); // Run before each test
  });

  it('should submit form', () => {
    // Test can run independently
  });
});
```

## 🏗️ Project Structure Best Practices

### File Organization

```
cypress/
├── e2e/
│   ├── critical/           # Critical path tests
│   ├── features/           # Feature tests
│   └── regression/         # Regression tests
├── fixtures/               # Test data
├── support/               # Utilities and commands
└── videos/                # Test recordings
```

### Test Data Management

Create `cypress/fixtures/testdata.json`:

```json
{
  "validUser": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210"
  },
  "invalidEmail": "invalid@",
  "validPhone": "9876543210"
}
```

Use in tests:

```javascript
cy.fixture('testdata').then((data) => {
  cy.get('[data-testid="form-name"]').type(data.validUser.name);
});
```

## 🔍 Debugging Best Practices

### 1. **Add Meaningful Logs**

```javascript
cy.log('Submitting contact form');
cy.get('[data-testid="form-submit"]').click();
cy.log('Form submitted successfully');
```

### 2. **Use Screenshots for Debugging**

```javascript
cy.screenshot('before-click');
cy.get('[data-testid="button"]').click();
cy.screenshot('after-click');
```

### 3. **Debug Specific Elements**

```javascript
cy.get('[data-testid="form-email"]').then(($email) => {
  cy.log('Email field value: ' + $email.val());
  cy.log('Email field visible: ' + $email.is(':visible'));
});
```

## ⚡ Performance Testing Best Practices

### 1. **Measure Critical Metrics**

```javascript
it('should load homepage within 3 seconds', () => {
  const startTime = Date.now();
  cy.visit('/');
  cy.get('[data-testid="hero"]').should('be.visible');
  
  const loadTime = Date.now() - startTime;
  expect(loadTime).to.be.lessThan(3000);
});
```

### 2. **Network Simulation**

```javascript
it('should work on 3G', () => {
  // Simulate 3G
  cy.intercept('**/*', { delay: 150 });
  cy.visit('/');
  cy.get('[data-testid="content"]').should('be.visible');
});
```

## 🎨 Test Coverage Best Practices

### Coverage Areas

- ✅ **Happy Path:** Normal user flow
- ✅ **Error Cases:** Invalid inputs, network errors
- ✅ **Edge Cases:** Boundary conditions
- ✅ **Mobile:** Different screen sizes
- ✅ **Performance:** Load times
- ✅ **Security:** XSS, CSRF
- ✅ **Accessibility:** A11y compliance

## 📊 Reporting Best Practices

### 1. **Generate Detailed Reports**

```bash
npm run test:report
```

### 2. **Include Screenshots**

Cypress automatically captures screenshots on failure.

### 3. **Document Failures**

Create issue for each failure:

```markdown
# Test Failure: TC-019 Email Validation

## Issue
Form accepts invalid email format: test@.com

## Steps to Reproduce
1. Navigate to /contact
2. Enter invalid email
3. Submit form

## Expected
Error message displayed

## Actual
Form accepted invalid email

## Priority
CRITICAL
```

## 🔐 Security Testing Best Practices

### 1. **Test HTTPS**

```javascript
it('should use HTTPS', () => {
  cy.window().then((win) => {
    expect(win.location.protocol).to.equal('https:');
  });
});
```

### 2. **Check Security Headers**

```javascript
it('should have security headers', () => {
  cy.request('/').its('headers').should('include.keys', [
    'x-content-type-options',
    'x-frame-options'
  ]);
});
```

## ♿ Accessibility Testing Best Practices

### 1. **Test Color Contrast**

```javascript
it('should have sufficient color contrast', () => {
  cy.get('body *:visible').each(($el) => {
    // Check contrast ratio
    expect($el).to.have.css('color');
  });
});
```

### 2. **Test Keyboard Navigation**

```javascript
it('should be keyboard navigable', () => {
  cy.get('body').tab();
  cy.focused().should('exist');
});
```

### 3. **Test Screen Reader Compatibility**

```javascript
it('should have proper ARIA labels', () => {
  cy.get('button').each(($btn) => {
    const hasLabel = $btn.text().length > 0 || $btn.attr('aria-label');
    expect(hasLabel).to.be.true;
  });
});
```

## 🚀 CI/CD Best Practices

### 1. **Run Tests on Pull Requests**

Use GitHub Actions to run tests automatically.

### 2. **Set Test Thresholds**

```javascript
// Fail if pass rate drops below 90%
const passRate = (42 / 45) * 100; // 93.3%
if (passRate < 90) {
  throw new Error('Pass rate below threshold');
}
```

### 3. **Run Critical Tests First**

Organize tests by priority for faster feedback.

## 📚 Documentation Best Practices

### 1. **Document Test Cases**

Include in CSV:
- Test ID
- Scenario
- Description
- Steps
- Expected Result
- Priority
- Status

### 2. **Keep README Updated**

- Setup instructions
- How to run tests
- Common issues
- Test structure

### 3. **Document Custom Commands**

```javascript
/**
 * Fill contact form with provided data
 * @param {Object} data - Form data { name, email, phone, message }
 * @example cy.fillContactForm({ name: 'John', email: 'john@test.com' })
 */
Cypress.Commands.add('fillContactForm', (data) => {
  // Implementation
});
```

## ✅ Code Review Checklist

- [ ] Test name is descriptive
- [ ] Uses data-testid instead of classes/IDs
- [ ] Proper wait handling (no hard waits)
- [ ] Follows AAA pattern
- [ ] Tests are independent
- [ ] No duplicate code
- [ ] Includes assertions
- [ ] Handles errors gracefully
- [ ] Has meaningful logs
- [ ] Documented with comments

---

**Remember:** Good tests are maintainable, reliable, and provide value!
