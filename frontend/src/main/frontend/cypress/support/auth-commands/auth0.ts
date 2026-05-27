export const loginToAuth0 = () => {
    const auth0Domain = Cypress.env('AUTH0_DOMAIN');

    cy.visit('/');
    cy.get('a').click();

    cy.origin(auth0Domain, () => {
      cy.readFile(Cypress.env('AUTH0_USERNAME_FILE')).then((valueFromFile) => {
        cy.get('input[name="username"], input[name="email"]', { timeout: 30000 })
          .should('be.visible')
          .type(valueFromFile);
      });

      cy.readFile(Cypress.env('AUTH0_PASSWORD_FILE')).then((valueFromFile) => {
        cy.get('input[name="password"]', { timeout: 30000 })
          .should('be.visible')
          .type(valueFromFile);
      });

      cy.get('button[type="submit"], input[type="submit"]', { timeout: 30000 })
        .should('be.visible')
        .click();
    });

    cy.url({ timeout: 30000 }).should((result) => {
      expect(result).to.contain(Cypress.env('APP_HOST'));
    });

    cy.request('/user').should((response) => {
      expect(response.status).to.have.eq(200);
      expect(response.body).to.be.a('Object');
    });

    cy.get('a').click();
  }



export const logoutFromAuth0 = () => {
    cy.visit('/');

    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="logout-link"]').length === 0) {
        return;
      }

      cy.get('[data-testid="logout-link"]').click();

      cy.url({ timeout: 15000 }).should((result) => {
        expect(result).to.contain(Cypress.env('APP_HOST'));
      });

      cy.request('/user').should((response) => {
        expect(response.status).to.have.eq(200)
        expect(response.body).to.be.a('string').that.is.empty
      });
    });
  }
