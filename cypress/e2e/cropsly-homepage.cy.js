describe('Cropsly.com - Homepage Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('TC-001: Homepage should load successfully', () => {
    // Verify page title
    cy.title().should('include', 'Cropsly');
    
    // Verify main hero section exists
    cy.get('[data-testid="hero-section"]').should('be.visible');
    
    // Verify hero text
    cy.get('[data-testid="hero-title"]')
      .should('be.visible')
      .should('not.be.empty');
  });

  it('TC-002: Navigation menu items should be clickable', () => {
    // Services menu
    cy.get('[data-testid="nav-services"]')
      .should('be.visible')
      .click();
    cy.url().should('include', '/services');
    
    // Back to home
    cy.get('[data-testid="nav-home"]').click();
    
    // Portfolio menu
    cy.get('[data-testid="nav-portfolio"]')
      .should('be.visible')
      .click();
    cy.url().should('include', '/portfolio' || '/case-studies');
    
    // Back to home
    cy.get('[data-testid="nav-home"]').click();
    
    // About menu
    cy.get('[data-testid="nav-about"]')
      .should('be.visible')
      .click();
    cy.url().should('include', '/about');
  });

  it('TC-003: Hero section CTA button should navigate correctly', () => {
    cy.get('[data-testid="cta-button"]')
      .should('be.visible')
      .should('contain', 'Get Started')
      .click();
    
    // Should navigate to contact form
    cy.get('[data-testid="contact-form"]').should('be.visible');
  });

  it('TC-004: Logo click should return to homepage', () => {
    // Navigate away from home
    cy.get('[data-testid="nav-services"]').click();
    cy.url().should('include', '/services');
    
    // Click logo to return home
    cy.get('[data-testid="logo"]').click();
    cy.url().should('equal', Cypress.config().baseUrl + '/');
  });

  it('TC-005: Search functionality should work', () => {
    cy.get('[data-testid="search-box"]')
      .should('be.visible')
      .type('mobile app development');
    
    cy.get('[data-testid="search-button"]').click();
    
    // Verify search results
    cy.get('[data-testid="search-results"]').should('be.visible');
  });

  it('Should display all service cards on homepage', () => {
    cy.get('[data-testid="service-card"]').should('have.length.at.least', 4);
  });

  it('Should have no console errors', () => {
    cy.visit('/');
    cy.window().then((win) => {
      cy.spy(win.console, 'error');
    });
    cy.get('body').then(() => {
      expect(win.console.error).not.to.have.been.called;
    });
  });
});
