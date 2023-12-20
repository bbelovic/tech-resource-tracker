import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    video: false,
    testIsolation: false,
    baseUrl: 'http://localhost:8080',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
