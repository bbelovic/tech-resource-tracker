export const loginToOkta = (username: string, password: string) => {
    cy.visit('http://localhost:8080')
    cy.get('a').click()
    cy.location('host').contains('dev-775522.okta.com')
    cy.get('input[name="username"]').type(username)
    cy.get('input[name="password"]').type(password)
    cy.get('[type="submit"]').click()

    cy.get('div').should('have.class', 'resource-list')
}
