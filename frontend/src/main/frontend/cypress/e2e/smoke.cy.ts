describe.skip('Smoke E2E test', () => {
  it(`Display 'welcome-screen' with log in link when user is not authenticated.`, () => {
    cy.visit('/')
    cy.get('h1').contains('Technology resource tracker')
    cy.get('a').contains('log in')
    cy.request('/user').should((response) => {
      expect(response.status).to.have.eq(200);
      expect(response.body).to.be.a('string').that.is.empty;
    });
  })

  it(`Crawl tech. resource list page`, () => {
    cy.loginToOkta();
    verifyMenuIsVisible();
    cy.logoutFromOkta();
    cy.get('a').contains('log in');

  })

  function verifyMenuIsVisible() {
    cy.get('a').click();
    cy.get('h1').should('have.class', 'page-title')
        .and('be.visible');
    cy.get('ul').should('be.visible')
  }
})