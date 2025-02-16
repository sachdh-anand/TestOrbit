const { defineConfig } = require("cypress");
require('dotenv').config();

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://the-internet.herokuapp.com",
    env: {
      apiBaseUrl: "https://restful-booker.herokuapp.com",
      apiUsername: process.env.CYPRESS_API_USERNAME,
      apiPassword: process.env.CYPRESS_API_PASSWORD,
    },
    viewportWidth: 1920, // Set the desired viewport width
    viewportHeight: 1080, // Set the desired viewport height
    retries: {
      runMode: 0, // Disable retries in `npx cypress run`
      openMode: 0, // Disable retries in `npx cypress open`
    },
    video: true, // Ensure video recording is enabled
    videosFolder: "cypress/videos", // Path to videos folder
    screenshotsFolder: "cypress/screenshots", // Path to screenshots folder 
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
