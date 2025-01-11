import pytest
import json
from page_objects.dropdown_page import DropdownPage
from utils.logger import logger
from utils.config import Config

# Load test data from JSON
with open("test_data/dropdown_data.json") as file:
    dropdown_data = json.load(file)

@pytest.mark.parametrize("option", dropdown_data["options"])
def test_tc002_dropdown_selection(driver, option):
    logger.info("Starting test case 'test_tc001_dropdown_selection' for dropdown selection")

    # Initialize the DropdownPage object
    dropdown_page = DropdownPage(driver)

    # Navigate to the dropdown page
    logger.info("Navigating to the dropdown page")
    dropdown_page.navigate_to_dropdown(Config.BASE_URL)

    # Select the dropdown option
    logger.info(f"Selecting option: {option}")
    dropdown_page.select_option_by_visible_text(option)

    # Verify the selected option
    selected_option = dropdown_page.get_selected_option()
    assert selected_option == option, f"Expected '{option}', but got '{selected_option}'"
    logger.success(f"Dropdown selection test passed for option: {option}")
