describe('Cropsly.com - Lead Capture & Newsletter Tests', () => {
  
  it('TC-025: Newsletter signup form should be on homepage', () => {
    cy.visit('/');
    cy.get('[data-testid="newsletter-section"]').should('be.visible');
    cy.get('[data-testid="newsletter-email-input"]').should('be.visible');
    cy.get('[data-testid="newsletter-submit"]').should('be.visible');
  });

  it('TC-026: Newsletter email validation', () => {
    cy.visit('/');
    cy.get('[data-testid="newsletter-email-input"]').type('invalidemail');
    cy.get('[data-testid="newsletter-submit"]').click();
    
    cy.get('[data-testid="newsletter-error"]')
      .should('be.visible')
      .should('contain', 'Valid email required');
  });

  it('TC-027: Lead form should accept company name', () => {
    cy.visit('/contact');
    cy.get('[data-testid="lead-form-company"]')
      .should('be.visible')
      .type('Tech Company Inc');
    
    cy.get('[data-testid="lead-form-company"]')
      .should('have.value', 'Tech Company Inc');
  });

  it('TC-028: Lead form email field with validation', () => {
    cy.visit('/contact');
    
    // Test valid email
    cy.get('[data-testid="lead-form-email"]').type('valid@example.com');
    cy.get('[data-testid="lead-form-email"]').blur();
    cy.get('[data-testid="lead-form-email-error"]').should('not.exist');
    
    // Clear and test invalid
    cy.get('[data-testid="lead-form-email"]').clear();
    cy.get('[data-testid="lead-form-email"]').type('invalid@');
    cy.get('[data-testid="lead-form-email"]').blur();
  });

  it('TC-029: Business type dropdown should work', () => {
    cy.visit('/contact');
    cy.get('[data-testid="business-type-select"]').click();
    
    // Verify options
    cy.get('[data-testid="business-type-option"]').should('have.length.at.least', 3);
    cy.get('[data-testid="business-type-option"]').first().click();
    
    // Verify selection
    cy.get('[data-testid="business-type-select"]').should('have.value');
  });

  it('TC-030: Lead form should submit successfully', () => {
    cy.visit('/contact');
    
    cy.get('[data-testid="lead-form-company"]').type('New Tech Startup');
    cy.get('[data-testid="lead-form-email"]').type('contact@startup.com');
    cy.get('[data-testid="lead-form-name"]').type('John Founder');
    cy.get('[data-testid="business-type-select"]').click();
    cy.get('[data-testid="business-type-option"]').first().click();
    
    cy.get('[data-testid="lead-form-submit"]').click();
    
    cy.get('[data-testid="lead-success-message"]', { timeout: 10000 })
      .should('be.visible')
      .should('contain', 'Thank you');
  });

  it('Should handle duplicate newsletter subscriptions', () => {
    cy.visit('/');
    const email = 'test' + Date.now() + '@example.com';
    
    // First subscription
    cy.get('[data-testid="newsletter-email-input"]').type(email);
    cy.get('[data-testid="newsletter-submit"]').click();
    cy.get('[data-testid="newsletter-success"]', { timeout: 5000 }).should('be.visible');
    
    // Try duplicate
    cy.get('[data-testid="newsletter-email-input"]').clear().type(email);
    cy.get('[data-testid="newsletter-submit"]').click();
    cy.get('[data-testid="newsletter-warning"]')
      .should('be.visible')
      .should('contain', 'already subscribed');
  });
});
