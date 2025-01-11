from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select

class DropdownPage:
    def __init__(self, driver):
        self.driver = driver
        self.dropdown = (By.ID, "dropdown")

    def navigate_to_dropdown(self, base_url):
        # Navigate to the dropdown page
        self.driver.get(f"{base_url}/dropdown")

    def select_option_by_visible_text(self, option_text):
        # Select dropdown option by visible text
        select = Select(self.driver.find_element(*self.dropdown))
        select.select_by_visible_text(option_text)

    def get_selected_option(self):
        # Get the currently selected option
        select = Select(self.driver.find_element(*self.dropdown))
        return select.first_selected_option.text
