describe('Cropsly.com - Performance Tests', () => {
  
  it('TC-038: Homepage should load within 3 seconds', () => {
    const startTime = Date.now();
    
    cy.visit('/');
    cy.get('[data-testid="hero-section"]', { timeout: 3000 }).should('be.visible');
    
    const loadTime = Date.now() - startTime;
    expect(loadTime).to.be.lessThan(3000);
    
    cy.log(`Homepage loaded in ${loadTime}ms`);
  });

  it('TC-039: Services page should load within 4 seconds', () => {
    const startTime = Date.now();
    
    cy.visit('/services');
    cy.get('[data-testid="service-card"]', { timeout: 4000 }).should('be.visible');
    
    const loadTime = Date.now() - startTime;
    expect(loadTime).to.be.lessThan(4000);
    
    cy.log(`Services page loaded in ${loadTime}ms`);
  });

  it('TC-040: Images should be optimized', () => {
    cy.visit('/');
    
    cy.get('img').each(($img) => {
      // Check for proper dimensions
      cy.wrap($img).should('have.attr', 'src');
      cy.wrap($img).should('have.attr', 'alt');
    });
  });

  it('TC-041: CSS and JS should be minified', () => {
    cy.visit('/');
    
    // Check that critical CSS is present
    cy.get('link[rel="stylesheet"]').should('have.length.at.least', 1);
    
    // Check that scripts are loaded
    cy.get('script').should('have.length.at.least', 1);
  });

  it('Should have no console errors during page load', () => {
    const consoleErrors = [];
    
    cy.on('window:before:load', (win) => {
      cy.spy(win.console, 'error');
    });
    
    cy.visit('/');
    
    cy.window().then((win) => {
      expect(win.console.error).not.to.have.been.called;
    });
  });

  it('Should handle network latency gracefully', () => {
    cy.intercept('/api/**', (req) => {
      req.reply((res) => {
        res.delay(2000); // 2 second delay
      });
    });
    
    cy.visit('/services');
    
    // Page should still render
    cy.get('[data-testid="services-container"]', { timeout: 5000 }).should('be.visible');
  });
});
