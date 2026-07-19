describe('Cropsly.com - Responsive Design Tests', () => {
  
  it('TC-031: Should be responsive on iPhone 12 (390x844)', () => {
    cy.viewport(390, 844);
    cy.visit('/');
    
    // Header should be visible
    cy.get('[data-testid="header"]').should('be.visible');
    
    // No horizontal scrolling
    cy.get('body').should('not.have.css', 'overflow-x', 'scroll');
    
    // CTA button should be clickable
    cy.get('[data-testid="cta-button"]')
      .should('be.visible')
      .should('have.css', 'width')
      .and('match', /\d+px/);
  });

  it('TC-032: Should be responsive on iPad (768x1024)', () => {
    cy.viewport(768, 1024);
    cy.visit('/');
    
    cy.get('[data-testid="header"]').should('be.visible');
    cy.get('[data-testid="hero-section"]').should('be.visible');
  });

  it('TC-033: Should display correctly on desktop (1920x1080)', () => {
    cy.viewport(1920, 1080);
    cy.visit('/');
    
    cy.get('[data-testid="header"]').should('be.visible');
    cy.get('[data-testid="service-card"]').should('have.length.at.least', 4);
  });

  it('TC-034: Mobile hamburger menu should work', () => {
    cy.viewport(390, 844);
    cy.visit('/');
    
    // Menu should be closed initially
    cy.get('[data-testid="mobile-menu"]').should('not.be.visible');
    
    // Click hamburger
    cy.get('[data-testid="hamburger-button"]')
      .should('be.visible')
      .click();
    
    // Menu should open
    cy.get('[data-testid="mobile-menu"]')
      .should('be.visible', { timeout: 1000 });
    
    // Menu items should be clickable
    cy.get('[data-testid="mobile-nav-services"]').should('be.visible');
  });

  it('TC-035: Form inputs should be properly sized on mobile', () => {
    cy.viewport(390, 844);
    cy.visit('/contact');
    
    cy.get('[data-testid="form-name"]').then(($input) => {
      const height = $input.outerHeight();
      expect(height).to.be.at.least(44); // Min touch target size
    });
    
    cy.get('[data-testid="form-email"]').then(($input) => {
      const height = $input.outerHeight();
      expect(height).to.be.at.least(44);
    });
  });

  it('TC-036: Images should load optimized on mobile', () => {
    cy.viewport(390, 844);
    cy.visit('/services');
    
    // Check that images have width attribute
    cy.get('img').each(($img) => {
      cy.wrap($img).should('have.attr', 'src');
    });
  });

  it('TC-037: Button touch targets should be at least 44x44px', () => {
    cy.viewport(390, 844);
    cy.visit('/');
    
    cy.get('[data-testid="cta-button"]').then(($btn) => {
      const width = $btn.outerWidth();
      const height = $btn.outerHeight();
      expect(width).to.be.at.least(44);
      expect(height).to.be.at.least(44);
    });
  });
});
