from selenium.webdriver.common.by import By
from utils.config import Config

class LoginPage:
    def __init__(self, driver):
        self.driver = driver
        self.username_field = (By.ID, "username")
        self.password_field = (By.ID, "password")
        self.login_button = (By.XPATH, "//button[@type='submit']")
        self.success_message = (By.CSS_SELECTOR, ".flash.success")
        self.error_message = (By.CSS_SELECTOR, ".flash.error")

    def navigate_to_login(self):
        # Navigate to the login page
        self.driver.get(f"{Config.BASE_URL}/login")

    def enter_username(self, username):
        self.driver.find_element(*self.username_field).clear()
        self.driver.find_element(*self.username_field).send_keys(username)

    def enter_password(self, password):
        self.driver.find_element(*self.password_field).clear()
        self.driver.find_element(*self.password_field).send_keys(password)

    def click_login(self):
        self.driver.find_element(*self.login_button).click()

    def get_success_message(self):
        return self.driver.find_element(*self.success_message).text

    def get_error_message(self):
        return self.driver.find_element(*self.error_message).text
