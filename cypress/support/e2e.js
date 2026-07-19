// Support file for E2E tests

// Disable uncaught exception handling for non-critical errors
Cypress.on('uncaught:exception', (err, runnable) => {
  // Return false to prevent Cypress from failing the test
  if (err.message.includes('ResizeObserver')) {
    return false;
  }
});

// Custom command for logging in (if needed)
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');
  cy.get('[data-testid="login-email"]').type(email);
  cy.get('[data-testid="login-password"]').type(password);
  cy.get('[data-testid="login-button"]').click();
  cy.url().should('not.include', '/login');
});

// Custom command for filling forms
Cypress.Commands.add('fillContactForm', (data) => {
  cy.get('[data-testid="form-name"]').type(data.name);
  cy.get('[data-testid="form-email"]').type(data.email);
  cy.get('[data-testid="form-phone"]').type(data.phone);
  cy.get('[data-testid="form-message"]').type(data.message);
});

// Custom command for checking page load time
Cypress.Commands.add('checkLoadTime', (maxTime = 3000) => {
  const startTime = Date.now();
  cy.get('body').then(() => {
    const loadTime = Date.now() - startTime;
    expect(loadTime).to.be.lessThan(maxTime);
    cy.log(`Page loaded in ${loadTime}ms`);
  });
});
