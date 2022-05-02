/// <reference types="cypress" />

describe('Login page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    it('displays two todo items by default', () => {

        // Select language
        cy.get('.v-input__slot').click()
        cy.get('#list-item-41-2').click()


        // Enter username 
        cy.get('#enterUsername').type('worker')

        // Select location
        cy.get('#selectLocation').click()
        cy.get('#list-item-51-2').click()

        //
        // cy.get('submitLogin').first().should('have.text', 'Pay electric bill')
    })
})
