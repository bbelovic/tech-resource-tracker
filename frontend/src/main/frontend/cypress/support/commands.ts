/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//

export {}
import {loginToAuth0, logoutFromAuth0} from './auth-commands/auth0';

// -- This is a parent command --
Cypress.Commands.add('loginToAuth0', () => { return loginToAuth0() })
Cypress.Commands.add('logoutFromAuth0', () => {return logoutFromAuth0() })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

declare global {
  namespace Cypress {
    interface Chainable {
      loginToAuth0(): Chainable<void>
      logoutFromAuth0(): Chainable<void>
    }
  }
}
