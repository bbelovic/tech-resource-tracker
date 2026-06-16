const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    video: false,
    testIsolation: false,
    baseUrl: "http://localhost:8080",
    setupNodeEvents(on, config) {
      on("task", {
        log(message) {
          console.log(message);
          return null;
        },
      });
      return config;
    },
  },
});
