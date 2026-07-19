describe('Cropsly.com - Footer & Navigation Tests', () => {
  
  it('TC-042: Footer should be visible and properly formatted', () => {
    cy.visit('/');
    cy.scrollTo('bottom');
    
    cy.get('[data-testid="footer"]').should('be.visible');
    cy.get('[data-testid="footer-logo"]').should('be.visible');
    cy.get('[data-testid="footer-content"]').should('be.visible');
  });

  it('TC-043: All footer links should be functional', () => {
    cy.visit('/');
    cy.scrollTo('bottom');
    
    // Test main navigation links
    cy.get('[data-testid="footer-link-services"]')
      .should('be.visible')
      .should('have.attr', 'href');
    
    cy.get('[data-testid="footer-link-portfolio"]')
      .should('be.visible')
      .should('have.attr', 'href');
    
    cy.get('[data-testid="footer-link-about"]')
      .should('be.visible')
      .should('have.attr', 'href');
    
    cy.get('[data-testid="footer-link-contact"]')
      .should('be.visible')
      .should('have.attr', 'href');
  });

  it('TC-044: Social media links should open in new tabs', () => {
    cy.visit('/');
    cy.scrollTo('bottom');
    
    // Check for target="_blank"
    cy.get('[data-testid="social-linkedin"]')
      .should('have.attr', 'target', '_blank')
      .should('have.attr', 'href')
      .and('include', 'linkedin');
    
    cy.get('[data-testid="social-twitter"]')
      .should('have.attr', 'target', '_blank')
      .should('have.attr', 'href')
      .and('include', 'twitter');
    
    cy.get('[data-testid="social-github"]')
      .should('have.attr', 'target', '_blank')
      .should('have.attr', 'href')
      .and('include', 'github');
  });

  it('TC-045: Copyright and legal links should be present', () => {
    cy.visit('/');
    cy.scrollTo('bottom');
    
    cy.get('[data-testid="copyright"]')
      .should('be.visible')
      .should('contain', '©')
      .should('contain', 'Cropsly');
    
    cy.get('[data-testid="footer-link-privacy"]')
      .should('be.visible')
      .should('contain', 'Privacy');
    
    cy.get('[data-testid="footer-link-terms"]')
      .should('be.visible')
      .should('contain', 'Terms');
  });

  it('Should have proper footer sections', () => {
    cy.visit('/');
    cy.scrollTo('bottom');
    
    cy.get('[data-testid="footer-section-services"]').should('be.visible');
    cy.get('[data-testid="footer-section-company"]').should('be.visible');
    cy.get('[data-testid="footer-section-legal"]').should('be.visible');
  });

  it('Should have working back-to-top button', () => {
    cy.visit('/');
    cy.scrollTo('bottom');
    
    cy.get('[data-testid="back-to-top"]').should('be.visible').click();
    cy.window().its('scrollY').should('equal', 0);
  });
});
