Feature: TS002_AddToCartAndCheckout
  As a user,
  I want to add a product to the cart and proceed to checkout
  So that I can purchase the product successfully or handle errors gracefully.

  Scenario: TC001_Add_Product_To_Cart_And_Proceed_To_Checkout
    Given I am on the product details page for "HTC Touch HD"
    When I click on the "Add to Cart" button
    Then the product should be added to the cart
    And I should see a confirmation message
    When I proceed to the checkout page
    Then I should see my cart summary
    And I should see available payment options
    And I should see a total price matching "$146.00"

  Scenario: TC002_Checkout_With_Empty_Cart
    Given I am on the home page
    When I navigate to the shopping cart page
    And my cart is empty
    Then I should see a warning message saying "Your shopping cart is empty!"
    And I should see a "Continue" button
    When I click on the "Continue" button
    Then I should be redirected back to the home page
