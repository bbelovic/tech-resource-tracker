export const loginToAuth0 = () => {
  cy.request("POST", "/test/login");
  cy.visit("/");

  cy.request("/user").should((response) => {
    expect(response.status).to.have.eq(200);
    expect(response.body).to.be.a("Object");
  });

  cy.get('[data-testid="app-menu"]', { timeout: 15000 }).should("be.visible");
};

export const logoutFromAuth0 = () => {
  cy.request("POST", "/test/logout");
  cy.visit("/");

  cy.request("/user").should((response) => {
    expect(response.status).to.have.eq(200);
    expect(response.body).to.be.a("string").that.is.empty;
  });
};
