describe('Exercise CRUD operation on tech. resource', () => {
    it('CRUD test for tech. resource', () => {
        cy.loginToOkta();
        cy.get('a').click();
        cy.get('li').first().should('have.text', 'Add new resource').click();
        cy.get('#title').type('Test title');
        cy.get('#link').type('Test link');
        cy.get('[type="submit"]').click();
        cy.logoutFromOkta();
    });
});