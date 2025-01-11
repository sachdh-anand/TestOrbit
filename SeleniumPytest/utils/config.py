import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    BASE_URL = "https://the-internet.herokuapp.com"  # Generic base URL
    USERNAME = os.getenv("BASIC_AUTH_USERNAME")  # Load username from .env
    PASSWORD = os.getenv("BASIC_AUTH_PASSWORD")  # Load password from .env
    IMPLICIT_WAIT = 10  # Implicit wait time in seconds
    BROWSER = "chrome"  # Default browser
