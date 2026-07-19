# Cropsly.com - End-to-End Test Suite 🚀

## Project Overview
Comprehensive End-to-End (E2E) test scenarios and test cases for **cropsly.com** - a leading software development and AI solutions company website.

## 📋 Contents

### Documentation Files
- **E2E_Test_Scenarios.csv** - Master test scenarios matrix
- **E2E_Test_Cases.csv** - Detailed test cases with expected results
- **Test_Execution_Report.md** - Execution results and coverage report
- **TEST_SUMMARY.md** - Executive summary of test coverage

### Automation Scripts
- **cypress/e2e/cropsly-homepage.cy.js** - Homepage tests
- **cypress/e2e/cropsly-services.cy.js** - Services page tests
- **cypress/e2e/cropsly-contact-form.cy.js** - Contact form tests
- **cypress/e2e/cropsly-responsive.cy.js** - Mobile responsiveness tests
- **cypress/e2e/cropsly-performance.cy.js** - Performance tests
- **cypress.config.js** - Cypress configuration
- **package.json** - Dependencies

## 🎯 Key Areas Tested

✅ Homepage Navigation & Content  
✅ Services Browsing (Mobile, Web, AI, SaaS)  
✅ Case Studies & Portfolio Review  
✅ Contact Form Submission  
✅ Lead Capture Forms  
✅ Mobile Responsiveness (iPhone, iPad, Desktop)  
✅ Performance & Load Times  
✅ Navigation & UI Elements  
✅ Footer Links & Social Media  
✅ Form Validations & Error Handling  

## 📊 Test Statistics

| Metric | Count |
|--------|-------|
| **Total Test Cases** | 45+ |
| **Test Scenarios** | 8 Major User Journeys |
| **Critical Priority** | 12 |
| **High Priority** | 18 |
| **Medium Priority** | 15+ |
| **Coverage** | 85%+ |

## 🏗️ Test Scenarios

### SC-001: Homepage Navigation (CRITICAL)
- Verify homepage loads within 3 seconds
- All navigation menu items functional
- Hero section visible and clickable
- CTA buttons working

### SC-002: Services Exploration (HIGH)
- Browse all service categories
- Read service descriptions
- View service icons/images
- Navigate to detailed service pages

### SC-003: Case Studies & Portfolio (HIGH)
- View case study cards
- Click on individual case studies
- Read case study details
- Verify project screenshots load

### SC-004: Contact Form Journey (CRITICAL)
- Fill contact form with valid data
- Submit form successfully
- Receive confirmation message
- Verify form validation

### SC-005: Lead Capture Forms (HIGH)
- Submit lead generation form
- Email validation working
- Form submission confirmation
- Success message displayed

### SC-006: Responsive Design Testing (HIGH)
- Desktop (1920x1080)
- Tablet (768x1024)
- Mobile (375x667)
- No overlapping elements
- Proper touch target sizes

### SC-007: Performance & Load Times (MEDIUM)
- Page load < 3 seconds
- Images optimized
- CSS/JS minified
- No console errors

### SC-008: Footer & External Links (MEDIUM)
- Footer content visible
- Social media links working
- External links open in new tabs
- Copyright info displayed

## 🔧 Setup & Execution

### Prerequisites
```bash
npm install
npm install -D cypress
```

### Run Tests
```bash
# Run all tests
npm run test:e2e

# Run specific test file
npm run test:e2e -- cypress/e2e/cropsly-homepage.cy.js

# Run in headed mode (see browser)
npm run test:e2e:headed

# Generate report
npm run test:report
```

## 📈 Test Execution Report Summary

**Total Tests Executed:** 45  
**Passed:** 42 ✅  
**Failed:** 2 ⚠️  
**Skipped:** 1 ⏭️  
**Pass Rate:** 93.3%  
**Execution Time:** ~8 minutes  

## 🐛 Known Issues / Failures

1. **TC-032: Email Validation Regex** - Frontend allows some invalid email formats
2. **TC-018: Mobile Menu Toggle** - Animation timing causes intermittent failures on slow networks

## ✅ Recommendations

1. Fix email validation regex to be more strict
2. Add loading states for form submission
3. Improve mobile menu animation timing
4. Add form rate limiting
5. Implement server-side validation
6. Add analytics tracking tests

## 📚 Technologies Used

- **Testing Framework:** Cypress 13.x
- **Language:** JavaScript
- **Assertion Library:** Chai
- **Reporting:** Mochawesome
- **CI/CD:** GitHub Actions (optional)

## 👥 Team & Contacts

**QA Lead:** Sharma Shekhar  
**Repository:** github.com/sharmashekhar13/cropsly-e2e-tests  
**Website:** https://cropsly.com  

## 📝 Version History

| Version | Date | Changes |
|---------|------|----------|
| 1.0 | 2026-07-19 | Initial test suite creation |
| | | 45 test cases across 8 scenarios |
| | | Cypress automation scripts |
| | | Detailed documentation |

## 📄 License

This test suite is proprietary to Cropsly Solutions Private Limited.

---

**Last Updated:** July 19, 2026  
**Maintained By:** QA Team  
**Status:** Active ✅
