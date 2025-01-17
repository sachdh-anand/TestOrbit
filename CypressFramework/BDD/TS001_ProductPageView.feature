Feature: TS001_ProductPageView
  As a user,
  I want to search for a product and validate its details
  So that I can make an informed purchasing decision.

  Scenario: TC001_Search_and_Validate_Product_Positive
    Given I am on the home page
    When I search for "HTC Touch HD"
    And I click on the product in the search results
    Then I should be navigated to the product details page
    And I should see the product title "HTC Touch HD"
    And the product price "$146.00"
    And the product code "Product 1"
    And the availability status "In Stock"
    And the brand "HTC"

  Scenario: TC002_Validate_Product_Price_Negative
    Given I am on the home page
    When I search for "HTC Touch HD"
    And I click on the product in the search results
    Then I should be navigated to the product details page
    And I should see the product title "HTC Touch HD"
    But the expected price "$120.00" should fail validation
    And I should see an error message saying "Price validation failed. Expected $120.00 but got $146.00"
