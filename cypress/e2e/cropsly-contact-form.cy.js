describe('Cropsly.com - Contact Form Tests', () => {
  beforeEach(() => {
    cy.visit('/contact');
  });

  it('TC-017: Contact form should be visible', () => {
    cy.get('[data-testid="contact-form"]').should('be.visible');
    cy.get('[data-testid="form-name"]').should('be.visible');
    cy.get('[data-testid="form-email"]').should('be.visible');
    cy.get('[data-testid="form-phone"]').should('be.visible');
    cy.get('[data-testid="form-message"]').should('be.visible');
    cy.get('[data-testid="form-submit"]').should('be.visible');
  });

  it('TC-018: Name field validation - should show error when empty', () => {
    cy.get('[data-testid="form-submit"]').click();
    cy.get('[data-testid="error-name"]')
      .should('be.visible')
      .should('contain', 'Name is required');
  });

  it('TC-019: Email field validation - should reject invalid emails', () => {
    cy.get('[data-testid="form-name"]').type('John Doe');
    cy.get('[data-testid="form-email"]').type('invalid.email');
    cy.get('[data-testid="form-message"]').type('Test message');
    cy.get('[data-testid="form-submit"]').click();
    
    cy.get('[data-testid="error-email"]')
      .should('be.visible')
      .should('contain', 'Please enter a valid email');
  });

  it('TC-020: Phone field validation', () => {
    cy.get('[data-testid="form-name"]').type('John Doe');
    cy.get('[data-testid="form-email"]').type('john@example.com');
    cy.get('[data-testid="form-phone"]').type('123'); // Invalid
    cy.get('[data-testid="form-submit"]').click();
    
    cy.get('[data-testid="error-phone"]')
      .should('be.visible')
      .should('contain', 'Phone must be at least 10 digits');
  });

  it('TC-021: Message field validation - should show error when empty', () => {
    cy.get('[data-testid="form-name"]').type('John Doe');
    cy.get('[data-testid="form-email"]').type('john@example.com');
    cy.get('[data-testid="form-phone"]').type('9876543210');
    cy.get('[data-testid="form-submit"]').click();
    
    cy.get('[data-testid="error-message"]')
      .should('be.visible')
      .should('contain', 'Message is required');
  });

  it('TC-022: Form submission with valid data', () => {
    cy.get('[data-testid="form-name"]').type('John Doe');
    cy.get('[data-testid="form-email"]').type('john@example.com');
    cy.get('[data-testid="form-phone"]').type('9876543210');
    cy.get('[data-testid="form-message"]').type('This is a test inquiry');
    
    cy.get('[data-testid="form-submit"]').click();
    
    // Wait for success message
    cy.get('[data-testid="success-message"]', { timeout: 10000 })
      .should('be.visible')
      .should('contain', 'Thank you for your inquiry');
  });

  it('TC-023: Success message should display after submission', () => {
    cy.get('[data-testid="form-name"]').type('Jane Smith');
    cy.get('[data-testid="form-email"]').type('jane@example.com');
    cy.get('[data-testid="form-phone"]').type('8765432109');
    cy.get('[data-testid="form-message"]').type('Test message for case study');
    
    cy.get('[data-testid="form-submit"]').click();
    
    cy.get('[data-testid="success-message"]', { timeout: 10000 })
      .should('be.visible')
      .should('contain', 'We will get back to you soon');
  });

  it('TC-024: Form error handling', () => {
    // Fill form
    cy.get('[data-testid="form-name"]').type('Test User');
    cy.get('[data-testid="form-email"]').type('test@example.com');
    cy.get('[data-testid="form-phone"]').type('9999999999');
    cy.get('[data-testid="form-message"]').type('Test message');
    
    // Simulate network error by intercepting
    cy.intercept('POST', '/api/contact', { statusCode: 500 });
    
    cy.get('[data-testid="form-submit"]').click();
    
    cy.get('[data-testid="error-message"]', { timeout: 10000 })
      .should('be.visible')
      .should('contain', 'Something went wrong');
    
    // Form data should still be in fields
    cy.get('[data-testid="form-name"]').should('have.value', 'Test User');
  });
});
