from loguru import logger
import sys

# Remove default logger
logger.remove()

# Add logger for console output
logger.add(sys.stdout, format="<green>{time:YYYY-MM-DD HH:mm:ss}</green> | <level>{level}</level> | <cyan>{message}</cyan>", level="INFO")

# Add logger for file output
logger.add("logs/test_{time}.log", rotation="1 MB", retention="10 days", level="DEBUG")
