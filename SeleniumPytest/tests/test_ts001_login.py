import pytest
import json
from page_objects.login_page import LoginPage
from utils.database import Database
from utils.logger import logger
from utils.config import Config

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
def test_tc001_login(driver, username, password, expected_message, is_valid):
    logger.info("Starting test case 'test_tc001_login' for login")

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

@pytest.mark.skip(reason="Skipping this test case for now")
def test_tc002_login_using_db_dataset(driver):
    """
    Test login functionality using credentials fetched from the database
    """
    logger.info("Starting test case 'test_tc002_login_db' for login using database")

    # Initialize the LoginPage object
    login_page = LoginPage(driver)

    # Fetch user credentials from the database
    db = Database()
    query = "SELECT username, password FROM users"
    users_in_db = db.execute_query(query)

    # Navigate to the login page
    logger.info("Navigating to login page")
    login_page.navigate_to_login(Config.BASE_URL)

    for username, password in users_in_db:
        logger.info(f"Testing login with username: {username}")
        
        # Perform login
        login_page.enter_username(username)
        login_page.enter_password(password)
        login_page.click_login()

        # Validate login success
        actual_message = login_page.get_success_message()
        assert "You logged into a secure area!" in actual_message, f"Login failed for user {username}"
        logger.success(f"Login test passed for user '{username}'")