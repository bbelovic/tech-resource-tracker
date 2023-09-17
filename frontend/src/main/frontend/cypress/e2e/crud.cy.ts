describe('Exercise CRUD operation on tech. resource', () => {

    /*
    before(() => {
        
    });*/

    it('Add new technology resource', () => {
        cy.loginToOkta();
        cy.get('a').click();
        cy.get('li').first().should('have.text', 'Add new resource')
        cy.get('li').first().click();
        cy.get('[data-testid="title"]').type('Test title');
        cy.get('[data-testid="link"]').type('Test link');
        cy.get('[data-testid="resource-type"]').select('Article')
        cy.get('[data-testid="submit-btn"]').click();
        cy.get('[data-testid="result-message"]').should('be.visible').and('have.text', 'Success');        
        cy.logoutFromOkta();
    });

    /*
    after(() => {
        
    });*/
});