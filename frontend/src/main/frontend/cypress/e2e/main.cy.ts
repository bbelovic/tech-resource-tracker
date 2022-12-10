describe('empty spec', () => {
  it(`Display 'Not authenticated' message when user is not authenticated.`, () => {
    cy.visit('http://localhost:8080')
    cy.get('h1').contains('Tech resource tracker')
    cy.get('h4').contains('Not authenticated')    
  })

  it(`Log in using Okta credentials`, () => {
    cy.loginToOkta('hideo.k@seznam.cz','Bb85sa!@')
  })
})