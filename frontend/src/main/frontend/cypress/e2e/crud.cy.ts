describe('Exercise CRUD operation on tech. resource', () => {

    
    before(() => {
        cy.loginToOkta();
    });

    it('Add new technology resource', () => {        
        cy.get('li').first().should('have.text', 'Add new resource');
        cy.get('li').first().click();
        const id = randomId();
        cy.get('[data-testid="title"]').type('Test title - ' + id);
        cy.get('[data-testid="link"]').type('Test link ' + id);
        cy.get('[data-testid="resource-type"]').select('Article')
        cy.get('[data-testid="submit-btn"]').click();
        cy.get('[data-testid="result-message"]').should('be.visible').and('contain.text', 'Resource created');
        cy.get('[data-testid="resource-list-link"]').should('be.visible').and('contain.text', 'Go to resource list.');
        cy.get('[data-testid="resource-list-link"]').click();   
        cy.get('[data-testid="resource-title"]').first().should('have.text', 'Test title - ' + id);         


        cy.get('[data-testid="resource-title"]')
            .filter(`:contains("Test title - ${id}")`)
            .should('be.visible')
            .should('have.text', `Test title - ${id}`)
            .siblings()
            .find('[data-testid="edit-btn"]')
            .should('be.visible')
            .click();
            
        cy.get('[data-testid="title"]')
            .should('have.prop', `value`)
            .and('not.be.empty')
        cy.get('[data-testid="title"]')
            .clear()
            .type(`Test title - ${id} - [updated]`);
        cy.get('[data-testid="link"]')
            .should('have.prop', `value`)
            .and('not.be.empty')
        cy.get('[data-testid="link"]')
            .clear()
            .type(`Test link - ${id} - [updated]`);
       
        cy.get('[data-testid="resource-type"]').select('Blog')
        cy.get('[data-testid="submit-btn"]')
            .click();
        cy.get('[data-testid="result-message"]').should('be.visible').and('contain.text', 'Resource updated');

        cy.get('[data-testid="resource-list-link"]').should('be.visible').and('contain.text', 'Go to resource list.');
        cy.get('[data-testid="resource-list-link"]').click();   
        cy.get('[data-testid="resource-title"]').first().should('have.text', `Test title - ${id} - [updated]`);         

    });


    after(() => {
        cy.logoutFromOkta();
    });

    function randomId() {
        let id = '';
        for (let i = 0; i < 5; i++) {
            id += Math.floor(Math.random() * 10);
        }
        return id;
    }
    
});