/**
 * Product-related Cypress commands for reusable workflows.
 */

// Command to search for a product using the search bar
Cypress.Commands.add("searchProduct", (productName) => {
  // Locate the search bar, type the product name, and submit
  cy.get('input[name="search"]', { timeout: 10000 })
    .eq(0)
    .should("be.visible")
    .click()
    .type(productName);

  cy.get('button[type="submit"]').eq(0).click().wait(1000);
});

// Command to click on a product in the search results
Cypress.Commands.add("clickProduct", (productName) => {
  // Locate and click the product name link in the search results
  cy.get(".product-layout").eq(0).click();
});

// Command to validate product details on the product page
Cypress.Commands.add("validateProductDetails", (expectedDetails) => {
  // Validate product title
  cy.validateText("h1", expectedDetails.title);

  // Validate product price
  cy.validateText(".price", expectedDetails.price);

  // Validate product availability status
  cy.validateText("li .badge.badge-success", expectedDetails.availability);

  // Validate product brand
  cy.validateText(
    'a[href*="manufacturer/info&manufacturer_id=5"]',
    expectedDetails.brand
  );
});
