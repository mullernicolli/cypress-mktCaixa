describe('Produtos', () => {

    it('Acessar e validar a página de um produto híbrido visível na home', () => {
        cy.visit('/home')

        cy.contains('.grid-card', 'Resgatar')
        .filter(':contains("Comprar")')
        .first()
        .should('be.visible')
        .scrollIntoView()
        .within(() => {
            cy.get('a.img-produto').click()
        })

        cy.url().should('not.include', '/home')
        .should('match', /\/\d+$/)
        cy.contains('SKU:')
        .should('be.visible')

        cy.contains('Usar pontos')
        cy.get('#parcelaWrapper')
        .should('be.visible')
        cy.get('#freteInfo')
        .should('be.visible')
        cy.get('#btnResgatar')
        .should('be.visible')
        cy.get('#btnAdicionarCarrinho')
        .should('be.visible')

        cy.contains('Ganhar pontos').click()
        cy.get('#freteInfo')
        .should('be.visible')
        cy.get('#btnComprar')
        .should('be.visible')
        cy.get('#btnAdicionarCarrinho')
        .should('be.visible')
    })
})