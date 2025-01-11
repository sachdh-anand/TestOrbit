import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from utils.config import Config


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
    driver.implicitly_wait(Config.IMPLICIT_WAIT)

    # Navigate to the Base URL
    driver.get(Config.BASE_URL)  # Only navigate to base URL    
    yield driver

    # Teardown
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
            "Base URL": Config.BASE_URL,
            "Browser": Config.BROWSER,
            "Tester": "Your Name",
        }


@pytest.hookimpl(tryfirst=True)
def pytest_html_results_summary(prefix, summary, postfix):
    # Add a custom message in the summary section
    prefix.extend(["<p style='color: blue;'>This is an automated test report for TestOrbit's SeleniumPytest framework.</p>"])
