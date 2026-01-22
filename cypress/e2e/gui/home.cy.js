describe('Acessa a home', () => {

    it('visão deslogada', () => {
        cy.visit('/home')

        cy.get('.btn-cadastrar')
        .should('be.visible')
        cy.get('.btn-login')
        .should('be.visible')
    })

    it('home faz chamada backend', () => {
        cy.intercept('GET', '**/home**').as('getHome')

        cy.visit('/home')
        cy.wait('@getHome')
    })
})