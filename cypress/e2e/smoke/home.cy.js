describe('Home', () => {

    it('Acessa home visão deslogada', () => {
        cy.visit('/home')

        cy.get('.btn-cadastrar')
        .should('be.visible')
        cy.get('.btn-login')
        .should('be.visible')

        cy.get('.box-container')
        .should('be.visible')
    })

    it('Home faz chamada backend', () => {
        cy.intercept('GET', '**/home**').as('getHome')

        cy.visit('/home')
        cy.wait('@getHome')
        .its('response.statusCode')
        .should('eq', 200)
    })

    it('UI retorna vitrines e produtos', () => {
        cy.intercept({
            method: 'GET',
            url: '**/home/tpPagina/HOME*segmento=Shopping*',
        }).as('getProducts')

        cy.visit('/home')

        cy.wait('@getProducts')
        .its('response.statusCode')
        .should('eq', 200)

         cy.get('.grid-card')
        .should('have.length.greaterThan', 0)
        
    })
})