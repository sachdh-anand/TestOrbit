/**
 * Test Suite: TS002_AddToCartAndCheckout
 * Validates cart and checkout functionality on the e-commerce platform.
 */

// Navigate to the home page before each test case
beforeEach(() => {
    cy.visit("/");
  });
  
  describe("TS002_AddToCartAndCheckout", () => {
    /**
     * Test Case: TC001_Add_Product_To_Cart_And_Proceed_To_Checkout
     * Add "iPod Nano" to the cart and proceed to checkout.
     */
    it("TC001_Add_Product_To_Cart_And_Proceed_To_Checkout", () => {
      // Search for the product "iPod Nano"
      cy.searchProduct("iPod Nano");
  
      // Click on the product in the search results
      cy.clickProduct("iPod Nano");
  
      // Add the product to the cart
      cy.addToCart();
  
      // Navigate to the cart page
      cy.navigateToCart();
  
      // Validate that the product is in the cart with the correct price
      cy.validateCartItem("iPod Nano", "$122.00");

      const expectedSummary = {
        subTotal: "$100.00",
        ecoTax: "$2.00",
        vat: "$20.00",
        total: "$122.00",
      };
    
      cy.validateCartSummary(expectedSummary);
  
      // Proceed to checkout
      cy.proceedToCheckout();

    });
  
    /**
     * Test Case: TC002_Checkout_With_Empty_Cart
     * Validate checkout behavior when the cart is empty.
     */
    it("TC002_Checkout_With_Empty_Cart", () => {
      // Navigate to the cart page
      cy.navigateToCart();
  
      // Validate that the cart is empty
      cy.validateEmptyCart();
  
      // Validate the warning message
      //cy.validateText(".cart-empty-message", "Your shopping cart is empty!");
  
      // Validate the presence of the "Continue" button
      //cy.validateExistence(".continue-button");
  
      // Click on the "Continue" button
      //cy.get(".continue-button").click();
  
      // Validate redirection to the home page
      //cy.validateUrl(`${Cypress.config("baseUrl")}/`);
    });
  });
  