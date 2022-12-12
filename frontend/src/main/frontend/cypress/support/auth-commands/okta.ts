export const loginToOkta = (username: string, password: string) => {
    cy.visit('http://localhost:8080')
    cy.get('a').click()

    cy.origin('https://dev-775522.okta.com/', {args: {username: 'hideo.k@seznam.cz', password: ''}}, ({username, password}) => {
        cy.get('input[name="username"]').type(username)
        cy.get('input[name="password"]').type(password)
        cy.get('[type="submit"]').click()
    })
    cy.visit('http://localhost:8080')

    cy.get('div').should('have.class', 'resource-list')
}
