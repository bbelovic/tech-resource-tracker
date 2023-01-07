describe('empty spec', () => {
  it(`Display 'Not authenticated' message when user is not authenticated.`, () => {
    cy.visit('/')
    cy.get('h1').contains('Tech resource tracker')
    cy.get('h4').contains('Not authenticated')    
    cy.request('/user').should((response) => {
      expect(response.status).to.have.eq(200);
      expect(response.body).to.be.a('string').that.is.empty;
    });
  })

  it(`Log in using Okta credentials`, () => {
    console.log(Cypress.config().baseUrl)
    cy.loginToOkta('hideo.k@seznam.cz','Bb85sa!@')
    
    cy.url({timeout: 15000}).should((result) => {

      expect(result).to.contain('localhost:8080')

    })

    cy.request('/user').should((response) => {
      expect(response.status).to.have.eq(200);
      expect(response.body).to.be.a('Object').that.has.property('givenName').eq('Hideo');
    });
    
    
  })
})