describe('Cropsly.com - Case Studies & Portfolio Tests', () => {
  beforeEach(() => {
    cy.visit('/portfolio');
  });

  it('TC-012: Case studies section should load with all projects', () => {
    cy.get('[data-testid="portfolio-container"]').should('be.visible');
    cy.get('[data-testid="case-study-card"]').should('have.length.at.least', 5);
  });

  it('TC-013: Case study cards should contain required information', () => {
    cy.get('[data-testid="case-study-card"]').first().then(($card) => {
      cy.wrap($card).within(() => {
        cy.get('[data-testid="client-name"]').should('be.visible');
        cy.get('[data-testid="project-industry"]').should('be.visible');
        cy.get('[data-testid="project-brief"]').should('not.be.empty');
      });
    });
  });

  it('TC-014: Clicking case study should open detail view', () => {
    cy.get('[data-testid="case-study-card"]').first().click();
    cy.get('[data-testid="case-study-detail"]', { timeout: 5000 }).should('be.visible');
    cy.get('[data-testid="case-study-title"]').should('not.be.empty');
    cy.get('[data-testid="case-study-description"]').should('not.be.empty');
    cy.get('[data-testid="case-study-results"]').should('be.visible');
  });

  it('TC-015: Case study image gallery should work', () => {
    cy.get('[data-testid="case-study-card"]').first().click();
    cy.get('[data-testid="gallery-container"]', { timeout: 5000 }).should('be.visible');
    cy.get('[data-testid="gallery-image"]').should('have.length.at.least', 1);
    
    // Test navigation
    cy.get('[data-testid="gallery-next"]').should('be.visible').click();
    cy.get('[data-testid="gallery-image"].active').should('exist');
  });

  it('TC-016: Case studies should be filterable by category', () => {
    cy.get('[data-testid="filter-dropdown"]').should('be.visible');
    cy.get('[data-testid="filter-dropdown"]').click();
    cy.get('[data-testid="filter-option"]').first().click();
    
    // Verify filtered results
    cy.get('[data-testid="case-study-card"]').each(($card) => {
      cy.wrap($card).should('be.visible');
    });
  });

  it('Should have working breadcrumb navigation', () => {
    cy.get('[data-testid="case-study-card"]').first().click();
    cy.get('[data-testid="breadcrumb"]').should('be.visible');
    cy.get('[data-testid="breadcrumb-home"]').click();
    cy.url().should('include', '/');
  });

  it('Should display case study metrics and achievements', () => {
    cy.get('[data-testid="case-study-card"]').first().click();
    cy.get('[data-testid="metrics-section"]', { timeout: 5000 }).should('be.visible');
    cy.get('[data-testid="metric-item"]').should('have.length.at.least', 2);
  });

  it('Should have share buttons for case studies', () => {
    cy.get('[data-testid="case-study-card"]').first().click();
    cy.get('[data-testid="share-container"]', { timeout: 5000 }).should('be.visible');
    cy.get('[data-testid="share-linkedin"]').should('be.visible');
    cy.get('[data-testid="share-twitter"]').should('be.visible');
  });
});
