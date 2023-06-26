describe('Exercise CRUD operation on tech. resource', () => {
    it('CRUD test for tech. resource', () => {
        cy.loginToOkta();
        cy.get('a').click();
        cy.get('ul').first().click();
        cy.logoutFromOkta();
    });
});