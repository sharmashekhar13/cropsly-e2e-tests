describe('Cropsly.com - SEO & Meta Tags Tests', () => {
  
  it('Should have proper meta tags on homepage', () => {
    cy.visit('/');
    
    // Check meta description
    cy.get('meta[name="description"]')
      .should('have.attr', 'content')
      .and('not.be.empty');
    
    // Check og:title
    cy.get('meta[property="og:title"]')
      .should('have.attr', 'content')
      .and('not.be.empty');
    
    // Check og:description
    cy.get('meta[property="og:description"]')
      .should('have.attr', 'content')
      .and('not.be.empty');
  });

  it('Should have canonical URL', () => {
    cy.visit('/');
    
    cy.get('link[rel="canonical"]')
      .should('have.attr', 'href');
  });

  it('Should have viewport meta tag for mobile', () => {
    cy.visit('/');
    
    cy.get('meta[name="viewport"]')
      .should('have.attr', 'content')
      .and('include', 'width=device-width');
  });

  it('Should have robots meta tag', () => {
    cy.visit('/');
    
    cy.get('meta[name="robots"]')
      .should('have.attr', 'content');
  });

  it('Should have structured data (JSON-LD)', () => {
    cy.visit('/');
    
    cy.get('script[type="application/ld+json"]')
      .should('have.length.at.least', 1)
      .each(($script) => {
        cy.wrap($script).then(($script) => {
          const json = JSON.parse($script.text());
          expect(json).to.be.an('object');
        });
      });
  });

  it('Should have proper heading structure for SEO', () => {
    cy.visit('/');
    
    // Should have exactly one H1
    cy.get('h1').should('have.length', 1);
    
    // H1 should not be empty
    cy.get('h1').invoke('text').should('not.be.empty');
  });

  it('Should have meta tags on service pages', () => {
    cy.visit('/services');
    
    cy.get('meta[name="description"]')
      .should('have.attr', 'content')
      .and('include.text', 'service');
  });
});
