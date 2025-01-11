import pytest
import json
from page_objects.login_page import LoginPage
from utils.logger import logger

# Load test data from JSON
with open("test_data/login_data.json") as file:
    login_data = json.load(file)

@pytest.mark.parametrize(
    "username, password, expected_message, is_valid",
    [
        (login_data["valid_credentials"]["username"], login_data["valid_credentials"]["password"], login_data["valid_credentials"]["expected_message"], True),
        (login_data["invalid_credentials"]["username"], login_data["invalid_credentials"]["password"], login_data["invalid_credentials"]["expected_message"], False),
    ]
)
def test_login(driver, username, password, expected_message, is_valid):
    logger.info("Starting test case for login")

    # Initialize the LoginPage object
    login_page = LoginPage(driver)

    # Navigate to the login page
    logger.info("Navigating to login page")
    login_page.navigate_to_login()

    # Perform login
    logger.info(f"Entering username: {username}")
    login_page.enter_username(username)
    logger.info("Entering password")
    login_page.enter_password(password)
    logger.info("Clicking login button")
    login_page.click_login()

    # Verify success or error message
    if is_valid:
        logger.info("Verifying success message")
        actual_message = login_page.get_success_message()
        assert expected_message in actual_message, f"Expected '{expected_message}', but got '{actual_message}'"
        logger.success("Login test passed for valid credentials")
    else:
        logger.info("Verifying error message")
        actual_message = login_page.get_error_message()
        assert expected_message in actual_message, f"Expected '{expected_message}', but got '{actual_message}'"
        logger.warning("Login test passed for invalid credentials")
