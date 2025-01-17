// Validate that an element contains the expected text
Cypress.Commands.add("validateText", (locator, expectedText) => {
  cy.get(locator).should("contain.text", expectedText);
});

// Validate that an element does not contain the expected text
Cypress.Commands.add("validateNotText", (locator, notExpectedText) => {
  cy.get(locator).should("not.contain.text", notExpectedText);
});

// Validate that an element exists in the DOM
Cypress.Commands.add("validateExistence", (locator) => {
  cy.get(locator).should("exist");
});

// Validate that an element does not exist in the DOM
Cypress.Commands.add("validateNonExistence", (locator) => {
  cy.get(locator).should("not.exist");
});

// Validate that an element has a specific attribute with a value
Cypress.Commands.add(
  "validateAttribute",
  (locator, attribute, expectedValue) => {
    cy.get(locator).should("have.attr", attribute, expectedValue);
  }
);

// Validate that a URL matches the expected URL
Cypress.Commands.add("validateUrl", (expectedUrl) => {
  cy.url().should("eq", expectedUrl); // Validate that the current URL matches the expected URL
});
