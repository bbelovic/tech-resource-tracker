describe('empty spec', () => {
  it.skip(`Display 'Not authenticated' message when user is not authenticated.`, () => {
    cy.visit('/')
    cy.get('h1').contains('Tech resource tracker')
    cy.get('h4').contains('Not authenticated')    
  })

  it(`Log in using Okta credentials`, () => {
    console.log(Cypress.config().baseUrl)
    cy.loginToOkta('hideo.k@seznam.cz','Bb85sa!@')
    //cy.visit('/user')

    cy.request()
    cy.get('div').should('have.class', 'resource-list')
  })
})