const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://cropsly.com',
    viewportWidth: 1280,
    viewportHeight: 720,
    pageLoadTimeout: 30000,
    defaultCommandTimeout: 10000,
    requestTimeout: 15000,
    responseTimeout: 15000,
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    // Cypress plugins
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',
    
    // Video and screenshots
    video: true,
    videoCompressionLevel: 9,
    screenshotOnRunFailure: true,
    
    // Retries
    retries: {
      runMode: 2,
      openMode: 0
    },
    
    // Browser config
    browsers: ['chrome', 'firefox', 'edge'],
    
    // Environment variables
    env: {
      CYPRESS_RECORD_KEY: '',
      PRODUCTION_URL: 'https://cropsly.com',
      STAGING_URL: 'https://staging.cropsly.com'
    }
  },
  
  chromeWebSecurity: false,
  numTestsKeptInMemory: 0
});
