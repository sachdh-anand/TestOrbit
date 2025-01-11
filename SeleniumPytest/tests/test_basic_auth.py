from selenium.webdriver.common.by import By
def test_basic_auth(driver):
    # Verify that the login was successful
    success_message = driver.find_element(By.TAG_NAME, "p").text
    assert success_message == "Congratulations! You must have the proper credentials.", "Authentication failed!"
