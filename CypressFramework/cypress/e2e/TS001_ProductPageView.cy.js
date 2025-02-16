// Navigate to the home page before each test case
beforeEach(() => {
  cy.visit("/");
});

/**
 * Test Suite: TS001_ProductPageView
 * Validates product page view functionality on the e-commerce platform.
 */
describe("TS001_ProductPageView", () => {
  /**
   * Test Case: TC001_Search_and_Validate_Product_Positive
   * Search for "HTC Touch HD" and validate product details.
   */
  it("TC001_Search_and_Validate_Product_Positive", () => {
    // Search for the product and navigate to its page
    cy.searchProduct("HTC Touch HD");
    cy.clickProduct("HTC Touch HD");

    // Define the expected product details for validation
    const expectedDetails = {
      title: "HTC Touch HD",     // Product title
      price: "$146.00",          // Product price      
      //availability: "Out Of Stock",  // Availability status
      brand: "HTC",              // Product brand
    };

    // Validate product details using the reusable command
    cy.validateProductDetails(expectedDetails);
  });

  /**
   * Test Case: TC002_Validate_Product_Price_Negative
   * Verify the product price does not match an incorrect value.
   */
  it("TC002_Validate_Product_Price_Negative", () => {
    // Search for the product and navigate to its page
    cy.searchProduct("HTC Touch HD");
    cy.clickProduct("HTC Touch HD");

    // Validate that the price does NOT match the incorrect value
    cy.validateNotText(".price", "$120.00");
  });
});
