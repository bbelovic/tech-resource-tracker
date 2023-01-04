describe('empty spec', () => {
  it(`Display 'Not authenticated' message when user is not authenticated.`, () => {
    cy.visit('/')
    cy.get('h1').contains('Tech resource tracker')
    cy.get('h4').contains('Not authenticated')    
    cy.request('/user').should((response) => {
      expect(response.status).to.have.eq(200);
      expect(response.body).to.have.length(0);
    });
  })

  it.skip(`Log in using Okta credentials`, () => {
    console.log(Cypress.config().baseUrl)
    cy.loginToOkta('hideo.k@seznam.cz','Bb85sa!@')
    //cy.visit('/user')
    cy.request('/user').should((response) => {expect(response.status).to.be.eq(200)});
    // TODO: check content of the body
    // TODO: "refresh" page and reveal resource list

    //cy.request()
    //cy.s
    //cy.get('div').should('have.class', 'resource-list')
  })
})