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
- **Environment Configuration** with `.env` for flexible test environment management.

### Cypress Framework:
- **Reusable Commands** for workflow-based implementation of test scenarios.
- **BDD Feature Files** for test case documentation with Gherkin syntax.
- **Custom Assertions** for streamlined and reusable validation steps.
- **Video Recording** of test executions for debugging and transparency.

### CI/CD Integration: Jenkins Pipeline as a Service
TestOrbit incorporates a robust and centralized **Jenkinsfile** that demonstrates a full-fledged CI/CD pipeline tailored for modern web applications. This pipeline is designed to ensure **high code quality**, **environment consistency**, and **seamless deployments** across Development, QA, and Production environments, leveraging **Docker** and **Kubernetes**.

#### 🚀 Pipeline Overview
1. **Static Code Analysis (Pre-Merge Check)**  
   Automatically runs **linting** and **security scans** on pull requests to catch issues early and block bad code from merging into the main branch.
2. **Dev Pipeline (Continuous Integration)**  
   Builds Docker images, pushes them to the registry, and triggers Kubernetes to deploy updates to the Dev environment for rapid feedback.
3. **QA Pipeline (Release Validation)**  
   Detects stable release tags, builds and pushes release-specific Docker images, and deploys them to QA for validation. Nightly **Cypress regression tests** ensure application stability.
4. **Controlled Production Deployment**  
   Validated and tested builds are deployed to Production after **manual approval**, ensuring the highest level of reliability and confidence.

#### 🌟 Key CI/CD Features
- **Centralized Jenkinsfile**: A single, easily maintainable file that manages the entire pipeline from pre-merge checks to Production deployments.  
- **Environment Consistency**: Dockerized builds and Kubernetes orchestration ensure reliable, scalable, and consistent deployments across environments.  
- **Shift-Left Testing**: Early-stage static code analysis prevents issues downstream, saving time and resources.  
- **Automated Nightly Tests**: Cypress tests run nightly to catch regressions, improving application stability and delivery confidence.  
- **Real-Time Notifications**: Slack integration keeps the team informed of deployment statuses, ensuring transparency and collaboration.

#### 🎯 Why This Matters
This CI/CD pipeline reflects **best practices in modern DevOps**, combining automation, scalability, and efficiency to deliver software that is **reliable**, **high-quality**, and **deployment-ready**. The framework's modular design makes it easy to adapt and scale for different projects, showcasing my ability to create practical, impactful automation solutions.

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
│   │   ├── fixtures/        # Test data and file uploads/downloads for Cypress
│   │   │   ├── testData/          # Test data files
│   │   │   │   ├── productData.json   # Product-related test data
│   │   │   │   ├── userCredentials.json # User login credentials
│   │   │   │   ├── checkoutData.json   # Checkout-related test data
│   │   │   ├── upload_download/   # Files for upload and download tests
│   │   │   │   ├── sampleImage.jpg     # Sample image for upload tests
│   │   │   │   ├── sampleFile.pdf       # Sample PDF for upload tests
│   │   │   ├── example.json        # Cypress default example fixture
│   │   ├── support/         # Support files for Cypress
│   │   │   ├── utils/               # Utility functions
│   │   │   │   ├── assert.js         # Centralized assertion utilities
│   │   │   │   ├── database.js       # Database-related utility functions
│   │   │   │   ├── api.js            # API-related utility functions
│   │   │   ├── workflowCommands/    # Feature-specific reusable Cypress commands
│   │   │   │   ├── cartCommands.js        # Cart-related commands
│   │   │   │   ├── productCommands.js     # Product-related commands
│   │   │   ├── commands.js          # Global custom Cypress commands
│   ├── cypress.config.js    # Cypress configuration file
│   ├── package.json         # Node.js dependencies
│   ├── package-lock.json    # Node.js lockfile
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
├── node_modules/            # Node.js dependencies (excluded from version control)
├── Jenkinsfile              # CI/CD pipeline definition for Jenkins
├── LICENSE                  # License for the TestOrbit project
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
