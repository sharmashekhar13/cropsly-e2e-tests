describe('Cropsly.com - Services Tests', () => {
  beforeEach(() => {
    cy.visit('/services');
  });

  it('TC-006: Services page should load with all categories', () => {
    cy.get('[data-testid="services-container"]').should('be.visible');
    cy.get('[data-testid="service-card"]').should('have.length.at.least', 5);
  });

  it('TC-007: Mobile App Development service should display correctly', () => {
    cy.get('[data-testid="service-mobile-app"]')
      .should('be.visible')
      .should('contain', 'Mobile App Development');
    
    cy.get('[data-testid="tech-swift"]').should('be.visible');
    cy.get('[data-testid="tech-kotlin"]').should('be.visible');
    cy.get('[data-testid="tech-flutter"]').should('be.visible');
  });

  it('TC-008: Web Development service should display correctly', () => {
    cy.get('[data-testid="service-web-dev"]')
      .should('be.visible')
      .should('contain', 'Web Development');
    
    cy.get('[data-testid="tech-react"]').should('be.visible');
    cy.get('[data-testid="tech-nextjs"]').should('be.visible');
    cy.get('[data-testid="tech-nodejs"]').should('be.visible');
  });

  it('TC-009: AI Solutions service should display correctly', () => {
    cy.get('[data-testid="service-ai"]')
      .should('be.visible')
      .should('contain', 'AI Solutions');
    
    cy.get('[data-testid="ai-gpt"]').should('be.visible');
    cy.get('[data-testid="ai-claude"]').should('be.visible');
  });

  it('TC-010: SaaS Rescue service should display correctly', () => {
    cy.get('[data-testid="service-saas-rescue"]')
      .should('be.visible')
      .should('contain', 'SaaS Rescue');
    
    cy.get('[data-testid="saas-features"]').should('be.visible');
  });

  it('TC-011: Clicking service card should navigate to details', () => {
    cy.get('[data-testid="service-card"]').first().click();
    cy.get('[data-testid="service-detail"]').should('be.visible');
  });

  it('Should have service descriptions', () => {
    cy.get('[data-testid="service-description"]')
      .should('have.length.at.least', 5)
      .each(($el) => {
        cy.wrap($el).should('not.be.empty');
      });
  });
});
