export const loginToOkta = () => {
    cy.visit('/')
    cy.get('a').click()

    cy.origin('https://dev-775522.okta.com/', () => {
        cy.readFile(Cypress.env('OKTA_USERNAME_FILE')).then( (valueFromFile) => {
          cy.get('input[name="username"]').type(valueFromFile)
        });
        
        cy.readFile(Cypress.env('OKTA_PASSWORD_FILE')).then( (valueFromFile) => {
          cy.get('input[name="password"]').type(valueFromFile)
        });
        cy.get('[type="submit"]').click()
    })

    cy.url({timeout: 15000}).should((result) => {     
        expect(result).to.contain(Cypress.env('APP_HOST'))
      })
  
      cy.request('/user').should((response) => {
        expect(response.status).to.have.eq(200);
        expect(response.body).to.be.a('Object').that.has.property('givenName').eq('Hideo');
      })
    
}
