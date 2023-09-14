describe('Exercise CRUD operation on tech. resource', () => {

    before(() => {
        cy.loginToOkta();
    });

    it('Add new technology resource', () => {
        cy.get('a').click();
        cy.get('li').first().should('have.text', 'Add new resource')
        cy.get('li').first().click();
        cy.get('[data-testid="title"]').type('Test title');
        cy.get('[data-testid="link"]').type('Test link');
        cy.get('[data-cy="resource-type"]').select('Article')
        cy.get('button[name="submitBtn"]').click();
        cy.get('[data-cy="result-message"]').should('be.visible').and('have.text', 'Success');        
    });

    after(() => {
        cy.logoutFromOkta();
    });
});