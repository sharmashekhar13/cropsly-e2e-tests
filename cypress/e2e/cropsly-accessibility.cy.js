describe('Cropsly.com - Accessibility Tests', () => {
  
  it('Should have proper heading hierarchy', () => {
    cy.visit('/');
    
    // Check for H1
    cy.get('h1').should('have.length.at.least', 1);
    
    // Check heading order
    cy.get('h1, h2, h3, h4, h5, h6').each(($heading, index, $headings) => {
      if (index > 0) {
        const currentLevel = parseInt($heading.prop('tagName')[1]);
        const prevLevel = parseInt($headings.eq(index - 1).prop('tagName')[1]);
        // Heading levels should not skip more than one level
        expect(Math.abs(currentLevel - prevLevel)).to.be.lessThan(2);
      }
    });
  });

  it('Should have alt text for all images', () => {
    cy.visit('/');
    
    cy.get('img').each(($img) => {
      // Exclude spacer/decorative images
      if (!$img.hasClass('decorative')) {
        cy.wrap($img).should('have.attr', 'alt');
        cy.wrap($img).invoke('attr', 'alt').should('not.be.empty');
      }
    });
  });

  it('Should have proper form labels', () => {
    cy.visit('/contact');
    
    cy.get('input, textarea, select').each(($field) => {
      const fieldId = $field.attr('id');
      if (fieldId) {
        cy.get(`label[for="${fieldId}"]`).should('exist');
      }
    });
  });

  it('Should have proper color contrast', () => {
    cy.visit('/');
    
    // Check that text has sufficient contrast
    cy.get('body *:visible').each(($element) => {
      const styles = window.getComputedStyle($element[0]);
      const color = styles.color;
      const backgroundColor = styles.backgroundColor;
      
      // Basic check that colors are not the same
      expect(color).not.to.equal(backgroundColor);
    });
  });

  it('Should be keyboard navigable', () => {
    cy.visit('/');
    
    // Tab to first interactive element
    cy.get('body').tab();
    cy.focused().should('exist');
    
    // Continue tabbing
    cy.focused().tab();
    cy.focused().should('exist');
  });

  it('Should have proper ARIA labels where needed', () => {
    cy.visit('/');
    
    // Check buttons have aria-label or text
    cy.get('button:not(:has(span, a, img))').each(($btn) => {
      const hasText = $btn.text().trim().length > 0;
      const hasAriaLabel = $btn.attr('aria-label');
      expect(hasText || hasAriaLabel).to.be.true;
    });
  });

  it('Should have skip to main content link', () => {
    cy.visit('/');
    
    // Look for skip link (often hidden)
    cy.get('[data-testid="skip-to-main"], .skip-link').should('exist');
  });
});
