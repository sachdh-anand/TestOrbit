# TestOrbit Automation Framework

TestOrbit is a scalable and professional-grade automation framework designed for end-to-end testing of modern web applications. Built with modularity and flexibility in mind, the framework currently leverages **Selenium**, **Pytest**, and the **Page Object Model (POM)**. It is future-ready to expand into **Cypress**, **Dockerized deployments**, and **AWS Kubernetes pipelines**.

---

## 🚀 Features
- **Selenium + Pytest Framework**: Clean, maintainable, and reusable test automation using POM.
- **Data-Driven Testing**: Parameterized test cases using JSON data files.
- **Custom Assertions**: Centralized assertion methods for consistent validations.
- **Scalable Folder Structure**: Modular design for easy integration and expansion.
- **CI/CD Ready**: Designed to integrate seamlessly with Jenkins, GitHub Actions, and Docker.
- **Future Expansion**:
  - Cypress integration for advanced testing.
  - End-to-end deployment pipelines using Docker, EKS, and AWS.

---

## 📂 Folder Structure
```plaintext
TestOrbit/
├── SeleniumPytest/           # Selenium + Pytest automation framework
│   ├── page_objects/         # Page Object Model classes
│   │   ├── login_page.py     # Page Object for login functionality
│   │   ├── dropdown_page.py  # Page Object for dropdown functionality
│   ├── tests/                # Test cases
│   │   ├── test_login.py     # Test login scenarios
│   │   ├── test_dropdown.py  # Test dropdown interactions
│   ├── test_data/            # Test data for data-driven testing
│   │   ├── login_data.json   # Login test data
│   ├── utils/                # Reusable utility modules
│   │   ├── database.py       # Handles database connections (optional)
│   │   ├── api.py            # Handles API authentication and requests
│   │   ├── assertions.py     # Contains reusable assertion methods
│   │   ├── config.py         # Configuration and environment settings
│   ├── drivers/              # Browser drivers
│   │   ├── chromedriver.exe
│   ├── reports/              # Test execution reports
│   ├── logs/                 # Execution logs
│   ├── conftest.py           # Global fixtures
│   ├── pytest.ini            # Pytest configuration
│   └── requirements.txt      # Python dependencies
└── README.md                 # Master README for the TestOrbit project
```
---

## 🛠️ Getting Started

### 1. Create the Project Structure
Run the following command in your terminal to create the folder structure and essential files:

```bash
mkdir -p TestOrbit/{page_objects,tests,test_data,utils,drivers,reports,logs} && \
touch TestOrbit/{page_objects/login_page.py,page_objects/dropdown_page.py,tests/test_login.py,tests/test_dropdown.py,test_data/login_data.json,utils/{database.py,api.py,assertions.py,config.py},drivers/chromedriver.exe,reports/.gitkeep,logs/.gitkeep,conftest.py,pytest.ini,requirements.txt,README.md}
```
---

### 2. Add Dependencies
Add the following dependencies to requirements.txt:
```
selenium==4.10.0         # For browser automation
pytest==7.4.0            # Testing framework
pytest-html==3.2.0       # HTML report generation
pytest-xdist==3.3.1      # Parallel test execution
requests==2.31.0         # API testing
PyMySQL==1.0.3           # Database connectivity (optional)
```

### 3. Install Dependencies
Install all dependencies using pip:

```bash
pip install -r requirements.txt
```
### 4. Run Tests
Run the test suite using Pytest:

```bash
pytest --html=reports/report.html --self-contained-html
```

🌟 Future Enhancements
Cypress Integration: Add cypress/ folder for end-to-end testing.
Docker Integration: Containerize the framework for portable test execution.
Kubernetes Deployment: Use AWS EKS for scalable pipeline execution.

🛡️ License
This project is licensed under the MIT License.

---

