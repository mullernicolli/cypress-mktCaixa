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

    it('UI retorna mesma quantidade da API de produtos nas vitrines', () => {  // comparação bruta sem aplicação de regras!
        cy.intercept({
            method: 'GET',
            url: '**/home/tpPagina/HOME*segmento=Shopping*',
        }).as('getProducts')

        cy.visit('/home')
        cy.wait('@getProducts')
        .then((interception) => {
            const itensLayout = interception.response.body.itensLayout
            const vitrinesDaHome = itensLayout
                .filter(item => item.vitrines)
                .flatMap(item => item.vitrines)

            const totalProdutosAPI = vitrinesDaHome.reduce((total, vitrine) => total + vitrine.itensVitrine.length, 0)

            cy.get('.grid-card')
                .should('have.length', totalProdutosAPI)
        })
    })
})