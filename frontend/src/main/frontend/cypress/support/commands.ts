/// <reference types="cypress" />

export {};
import { loginToAuth0, logoutFromAuth0 } from "./auth-commands/auth0";

Cypress.Commands.add("loginToAuth0", () => loginToAuth0());
Cypress.Commands.add("logoutFromAuth0", () => logoutFromAuth0());

declare global {
  namespace Cypress {
    interface Chainable {
      loginToAuth0(): Chainable<void>;
      logoutFromAuth0(): Chainable<void>;
    }
  }
}
