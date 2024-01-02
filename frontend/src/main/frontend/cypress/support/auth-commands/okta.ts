export const loginToOkta = () => {
    cy.visit('/')
    cy.get('a').click()

    cy.origin(Cypress.env('OKTA_URL'), () => {
        cy.readFile(Cypress.env('OKTA_USERNAME_FILE')).then( (valueFromFile) => {
          cy.get('input[name="identifier"]').type(valueFromFile)
        });
        
        cy.readFile(Cypress.env('OKTA_PASSWORD_FILE')).then( (valueFromFile) => {
          cy.get('input[name="credentials.passcode"]').type(valueFromFile)
        });
        cy.get('[type="submit"]').click()
    });

    cy.url({timeout: 15000}).should((result) => {     
        expect(result).to.contain(Cypress.env('APP_HOST'))
      });
  
      cy.request('/user').should((response) => {
        expect(response.status).to.have.eq(200);
        expect(response.body).to.be.a('Object').that.has.property('givenName').eq('Hideo');
      });
    
    cy.get('a').click();
    
}

export const logoutFromOkta = () => {
  cy.get('[data-testid="logout-link"]')
    .click();
  
  cy.url({timeout: 15000}).should((result) => {     
      expect(result).to.contain(Cypress.env('APP_HOST'))
  });

  cy.request('/user').should((response) => {
    expect(response.status).to.have.eq(200)
    expect(response.body).to.be.a('string').that.is.empty
  });
}