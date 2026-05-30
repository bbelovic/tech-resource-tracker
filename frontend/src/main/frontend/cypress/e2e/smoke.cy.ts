describe('Smoke E2E test', () => {
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
    cy.loginToAuth0();
    verifyMenuIsVisible();
    cy.logoutFromAuth0();
    cy.get('a').contains('log in');

  })

  function verifyMenuIsVisible() {
    cy.get('h1').should('have.class', 'page-title')
        .and('be.visible');
    cy.get('[data-testid="app-menu"]').should('be.visible');
    cy.get('[data-testid="add-tech-resource"]').should('be.visible')
        .and('have.text', 'Add new resource');
    cy.get('[data-testid="logout-link"]').should('be.visible')
        .and('have.text', 'Logout');
  }
})
