describe('Exercise CRUD operation on tech. resource', () => {
    it('CRUD test for tech. resource', () => {
        cy.loginToOkta();
        cy.get('a').click();
        cy.get('li').first().should('have.text', 'Add new resource')
        cy.get('li').first().click();
        cy.get('input[name="title"]').type('Test title');
        cy.get('input[name="link"]').type('Test link');
        cy.get('input[type="submit"]').click();
        cy.logoutFromOkta();
    });
});