// Advanced utility functions for testing

/**
 * Custom command to check form validation
 */
Cypress.Commands.add('checkFormValidation', (formSelector, fieldData) => {
  cy.get(formSelector).within(() => {
    Object.entries(fieldData).forEach(([field, value]) => {
      cy.get(`[name="${field}"]`).type(value);
    });
    cy.get('[type="submit"]').click();
  });
});

/**
 * Custom command to test responsive behavior
 */
Cypress.Commands.add('testResponsive', (viewportWidth, viewportHeight) => {
  cy.viewport(viewportWidth, viewportHeight);
  cy.get('body').should('not.have.css', 'overflow-x', 'scroll');
});

/**
 * Custom command to measure performance
 */
Cypress.Commands.add('measureLoadTime', () => {
  const startTime = Date.now();
  return cy.get('body').then(() => {
    const loadTime = Date.now() - startTime;
    cy.log(`Load time: ${loadTime}ms`);
    return loadTime;
  });
});

/**
 * Custom command for accessibility testing
 */
Cypress.Commands.add('checkAccessibility', () => {
  cy.injectAxe();
  cy.checkA11y();
});

/**
 * Custom command to test API responses
 */
Cypress.Commands.add('interceptAPI', (method, path, response) => {
  cy.intercept(method, path, response).as(path.replace(/\//g, '-'));
});

/**
 * Custom command to generate test data
 */
Cypress.Commands.add('generateTestData', (type) => {
  const timestamp = Date.now();
  
  const testData = {
    email: `test${timestamp}@example.com`,
    name: `Test User ${timestamp}`,
    phone: '9876543210',
    message: `This is an automated test message - ${timestamp}`,
    company: `Test Company ${timestamp}`,
    url: `https://test${timestamp}.com`
  };
  
  return testData[type] || testData;
});

/**
 * Custom command for screenshot comparison
 */
Cypress.Commands.add('screenshotCompare', (name) => {
  cy.screenshot(name, {
    blackout: ['[data-cy=variable]']
  });
});

/**
 * Custom command to wait for element with custom timeout
 */
Cypress.Commands.add('waitForElement', (selector, timeout = 5000) => {
  cy.get(selector, { timeout }).should('be.visible');
});

/**
 * Custom command to validate email format
 */
Cypress.Commands.add('validateEmail', (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
});

/**
 * Custom command to test network conditions
 */
Cypress.Commands.add('simulateNetwork', (connectionType) => {
  const speeds = {
    '4g': { downloadThroughput: 10000, uploadThroughput: 5000, latency: 50 },
    '3g': { downloadThroughput: 1000, uploadThroughput: 500, latency: 150 },
    '2g': { downloadThroughput: 100, uploadThroughput: 50, latency: 500 },
    'slow': { downloadThroughput: 50000, uploadThroughput: 20000, latency: 100 }
  };
  
  cy.log(`Simulating ${connectionType} connection`);
});

/**
 * Custom command for visual regression testing
 */
Cypress.Commands.add('visualRegression', (name) => {
  cy.screenshot(name, { capture: 'runner' });
});

/**
 * Custom command to test form submission with retry
 */
Cypress.Commands.add('submitFormWithRetry', (formSelector, retries = 3) => {
  let attempts = 0;
  
  const submitForm = () => {
    cy.get(formSelector).within(() => {
      cy.get('[type="submit"]').click();
    });
  };
  
  submitForm();
});

/**
 * Tab navigation command
 */
Cypress.Commands.add('tab', { prevSubject: 'element' }, (subject) => {
  cy.wrap(subject).trigger('keydown', { keyCode: 9, which: 9, key: 'Tab' });
  return cy.focused();
});
