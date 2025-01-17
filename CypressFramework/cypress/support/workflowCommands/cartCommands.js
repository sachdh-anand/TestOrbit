/**
 * Cart-related Cypress commands for reusable workflows.
 */

// Add a product to the cart
Cypress.Commands.add("addToCart", () => {
  //cy.contains("Add to Cart").click();
  cy.get('[title="Add to Cart"]').eq(1).click().wait(2000);
});

// Navigate to the cart page
Cypress.Commands.add("navigateToCart", () => {
  cy.get(".cart-icon").eq(0).click().wait(10000);
});

// Validate that a specific product exists in the cart with the expected price
Cypress.Commands.add("validateCartItem", (productName, expectedPrice) => {
  // Target the cart item table using the "table-responsive overflow-auto" class
  cy.get(".table-responsive.overflow-auto table").within(() => {
    // Validate the product name
    cy.validateExistence(`a:contains(${productName})`);

    // Validate the product price
    cy.validateExistence(`td.text-right:contains(${expectedPrice})`);
  });
});

// Validate that the cart is empty
Cypress.Commands.add("validateEmptyCart", () => {
  cy.validateExistence(".py-5.text-center"); // Reuse validateExistence from assertions.js
  cy.validateText(".py-5.text-center", "Your shopping cart is empty!");
});

// Proceed to the checkout page
Cypress.Commands.add("proceedToCheckout", () => {
  cy.contains("Checkout").click();
});

// Validate the cart summary during checkout
// Validate the cart summary details
Cypress.Commands.add("validateCartSummary", (expectedSummary) => {
  // Target the table with the "table mb-0" class
  cy.get(".table.mb-0").within(() => {
    // Validate Sub-Total
    cy.validateText("td:contains('Sub-Total:') + td.text-right", expectedSummary.subTotal);

    // Validate Eco Tax
    cy.validateText("td:contains('Eco Tax (-2.00):') + td.text-right", expectedSummary.ecoTax);

    // Validate VAT
    cy.validateText("td:contains('VAT (20%):') + td.text-right", expectedSummary.vat);

    // Validate Total
    cy.validateText("td:contains('Total:') + td.text-right", expectedSummary.total);
  });
});

