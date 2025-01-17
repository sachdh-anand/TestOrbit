# TestOrbit Automation Framework

TestOrbit is a **powerful boilerplate automation framework** designed to kickstart end-to-end testing of modern web applications. Built with **modularity**, **scalability**, and **flexibility**, this framework integrates **Selenium**, **Pytest**, and **Cypress**, providing a robust foundation for automated testing.

The framework is thoughtfully crafted to showcase **real-world examples** of different automation approaches, allowing teams to evaluate and select the framework that best suits their specific needs. With **ready-to-use examples**, teams can quickly adopt and extend the framework to align with their workflows and objectives. TestOrbit is also **future-ready**, enabling seamless integration into CI/CD pipelines.

Whether you're automating UI testing with Selenium, writing Python-based workflows with Pytest, or leveraging JavaScript with Cypress, **TestOrbit** provides a solid foundation for building and scaling automation efforts.

---

### 🔥 Key Highlights
- **Flexibility in Framework Selection**: Offers multiple frameworks (Selenium + Pytest, Cypress) so teams can evaluate and choose the best tool for their specific requirements.
- **Boilerplate Simplicity**: Ready-to-use, professionally structured framework designed for immediate deployment and extension.
- **Integration-Ready**: Seamlessly integrates into CI/CD pipelines with detailed reporting, reusable utilities, and modular design.
- **Scalable Architecture**: Built for growth, enabling teams to scale their automation as projects evolve.
- **Market-Ready Design**: Serves as an excellent portfolio project, showcasing advanced automation capabilities and best practices.

    ![image](https://github.com/user-attachments/assets/b49a69f5-de6b-4865-9c42-e09ddea4386f)

This framework is a **testament to my ability to build comprehensive automation solutions** that cater to diverse testing needs. **TestOrbit** equips teams with the flexibility to evaluate and adopt the right framework, making it a valuable tool for QA engineers and developers alike.

---

## 🚀 Features

### Selenium Pytest Framework:
- **Page Object Model (POM)** for modular and reusable test automation.
- **Data-Driven Testing** with JSON files and database integration.
- **Custom Assertions** for consistent and centralized validation logic.
- **CI/CD Integration** for seamless integration with Jenkins and GitHub Actions.
- **Environment Configuration** with `.env` for flexible test environment management.

### Cypress Framework:
- **Reusable Commands** for workflow-based implementation of test scenarios.
- **BDD Feature Files** for test case documentation with Gherkin syntax.
- **Custom Assertions** for streamlined and reusable validation steps.
- **Video Recording** of test executions for debugging and transparency.
- **Future-Ready** for advanced integrations like Docker and AWS pipelines.

---

## 📂 Folder Structure

```plaintext
TestOrbit/
├── CypressFramework/        # Cypress automation framework
│   ├── BDD/                 # Cucumber feature files for BDD scenarios
│   │   ├── TS001_ProductPageView.feature
│   │   ├── TS002_AddToCartAndCheckout.feature
│   ├── cypress/             # Cypress core folder
│   │   ├── downloads/       # Downloaded files during tests
│   │   ├── e2e/             # Cypress test specs
│   │   │   ├── TS001_ProductPageView.cy.js
│   │   │   ├── TS002_AddToCartAndCheckout.cy.js
│   │   ├── fixtures/        # Test data for Cypress
│   │   ├── support/         # Support files for Cypress
│   │       ├── assertions.js      # Centralized assertions for Cypress
│   │       ├── cartCommands.js    # Cart-related commands
│   │       ├── productCommands.js # Product-related commands
│   ├── cypress.config.js    # Cypress configuration file
│   ├── package.json         # Node.js dependencies
├── SeleniumPytest/          # Selenium + Pytest automation framework
│   ├── logs/                # Execution logs
│   ├── page_objects/        # Page Object Model classes
│   │   ├── dropdown_page.py # Page Object for dropdown functionality
│   │   ├── login_page.py    # Page Object for login functionality
│   ├── reports/             # Test execution reports
│   ├── test_data/           # Test data for data-driven testing
│   │   ├── login_data.json  # Login test data
│   ├── tests/               # Test cases
│   │   ├── test_ts001_login.py     # Test login scenarios
│   │   ├── test_ts002_dropdown.py  # Test dropdown interactions
│   ├── utils/               # Reusable utility modules
│       ├── api.py           # Handles API authentication and requests
│       ├── assertions.py    # Contains reusable assertion methods
│       ├── config.py        # Configuration and environment settings
│       ├── database.py      # Handles database connections (optional)
│       ├── logger.py        # Logging configuration
│   ├── conftest.py          # Global fixtures
│   ├── pytest.ini           # Pytest configuration
│   ├── requirements.txt     # Python dependencies
└── README.md                # Master README for the TestOrbit project
```

---

## 🔧 Getting Started

### Selenium Pytest Framework

1. **Install Python Dependencies**:
   ```bash
   pip install -r SeleniumPytest/requirements.txt
   ```

2. **Run Selenium Tests**:
   ```bash
   pytest --html=SeleniumPytest/reports/report.html --self-contained-html
   ```

---

### Cypress Framework

1. **Navigate to the Cypress Framework Folder**:
   ```bash
   cd CypressFramework
   ```

2. **Install Node.js Dependencies**:
   ```bash
   npm install
   ```

3. **Run Cypress Tests**:
   - Open the Cypress Test Runner:
     ```bash
     npx cypress open
     ```
   - Run tests in headless mode:
     ```bash
     npx cypress run
     ```

4. **BDD Scenarios**:
   - Review feature files in `CypressFramework/BDD`.

---

## 🌟 Future Enhancements
- **Containerization**: Add Docker support for cross-platform compatibility.
- **Cloud Execution**: Integrate with AWS EKS for scalable test execution pipelines.
- **API Testing**: Extend Cypress or Pytest frameworks for robust API validations.

---

## 🛡️ License
This project is licensed under the MIT License.

---
