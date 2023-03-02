describe('Smoke E2E test', () => {
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
    cy.loginToOkta('hideo.k@seznam.cz','Bb85sa!@')
    verifyMenuIsVisible()
  })

  function verifyMenuIsVisible() {
    cy.get('a').click();
    cy.get('h1').should('have.class', 'page-title')
        .and('be.visible');
    cy.get('ul').should('be.visible')
  }
})