import os
import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from dotenv import load_dotenv
from utils.logger import logger

# Load environment variables from .env file
load_dotenv()

@pytest.fixture(scope="session")
def config():
    config = {
        "BASE_URL": "https://the-internet.herokuapp.com",  # Generic base URL
        "USERNAME": os.getenv("BASIC_AUTH_USERNAME"),  # Load username from .env
        "PASSWORD": os.getenv("BASIC_AUTH_PASSWORD"),  # Load password from .env
        "IMPLICIT_WAIT": 10,  # Implicit wait time in seconds
        "BROWSER": "chrome"  # Default browser
    }
    logger.info("Configuration loaded successfully")
    return config

@pytest.fixture(scope="function")
def navigate_to_base_url(driver, config):
    logger.info("Navigating to the base URL")
    driver.get(config["BASE_URL"])
    yield
    logger.info("Finished navigating to the base URL")
    
@pytest.fixture(scope="function")
def driver():
    # Set up Chrome options
    chrome_options = Options()
    chrome_options.add_argument("--start-maximized")
    chrome_options.add_argument("--disable-extensions")
    chrome_options.add_argument("--disable-popup-blocking")
    chrome_options.add_argument("--headless")  # Run in headless mode

    # Initialize WebDriver
    driver = webdriver.Chrome(options=chrome_options)
    driver.implicitly_wait(config.IMPLICIT_WAIT)

    # Navigate to the Base URL
    driver.get(config.BASE_URL)  # Only navigate to base URL    
    yield driver

    # Teardown
    logger.info("Tearing down WebDriver")
    driver.quit()


def pytest_html_report_title(report):
    # Set a custom title for the HTML report
    report.title = "TestOrbit's SeleniumPytest Testing Report"


@pytest.hookimpl(tryfirst=True)
def pytest_configure(config):
    # Add custom metadata to the HTML report
    if not hasattr(config, "workerinput"):  # Avoid adding metadata for distributed tests
        config._metadata = {
            "Project Name": "TestOrbit",
            "Module": "SeleniumPytest",
            "Base URL": config.BASE_URL,
            "Browser": config.BROWSER,
            "Tester": "Your Name",
        }


@pytest.hookimpl(tryfirst=True)
def pytest_html_results_summary(prefix, summary, postfix):
    # Add a custom message in the summary section
    prefix.extend(["<p style='color: blue;'>This is an automated test report for TestOrbit's SeleniumPytest framework.</p>"])
