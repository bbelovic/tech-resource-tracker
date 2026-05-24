export const loginToAuth0 = () => {
  cy.visit('/');
  cy.get('a').click();

  cy.origin(Cypress.env('AUTH0_DOMAIN'), () => {
    cy.readFile(Cypress.env('AUTH0_USERNAME_FILE')).then((valueFromFile) => {
      cy.get('input[name="username"], input[name="email"]').type(valueFromFile);
    });

    cy.readFile(Cypress.env('AUTH0_PASSWORD_FILE')).then((valueFromFile) => {
      cy.get('input[name="password"]').type(valueFromFile);
    });

    cy.get('button[type="submit"], input[type="submit"]').click();
  });

  cy.url({timeout: 15000}).should((result) => {
    expect(result).to.contain(Cypress.env('APP_HOST'));
  });

  cy.request('/user').should((response) => {
    expect(response.status).to.have.eq(200);
    expect(response.body).to.be.a('Object');
  });

  cy.get('a').click();
}

export const logoutFromAuth0 = () => {
  cy.get('[data-testid="logout-link"]')
    .click();

  cy.url({timeout: 15000}).should((result) => {
    expect(result).to.contain(Cypress.env('APP_HOST'));
  });

  cy.request('/user').should((response) => {
    expect(response.status).to.have.eq(200)
    expect(response.body).to.be.a('string').that.is.empty
  });
}
