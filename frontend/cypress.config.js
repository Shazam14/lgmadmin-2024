const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "q79k4g",
  e2e: {
    baseUrl: "http://localhost:3001",
    REACT_APP_RECAPTCHA_SITE_KEY: "6LehhNkpAAAAAAbT4e83dfASMjlIqXzheo49BT4j",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});
