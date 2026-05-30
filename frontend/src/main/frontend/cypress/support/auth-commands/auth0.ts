export const loginToAuth0 = () => {
    cy.request('POST', '/test/login');
    cy.visit('/');

    cy.request('/user').should((response) => {
      expect(response.status).to.have.eq(200);
      expect(response.body).to.be.a('Object');
    });
  }



export const logoutFromAuth0 = () => {
    cy.request('POST', '/test/logout');
    cy.visit('/');

    cy.request('/user').should((response) => {
      expect(response.status).to.have.eq(200)
      expect(response.body).to.be.a('string').that.is.empty
    });
  }
