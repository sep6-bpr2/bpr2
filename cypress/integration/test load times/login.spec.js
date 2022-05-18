// /// <reference types="cypress" />

describe('Performance test', () => {
	beforeEach(() => {
        cy.clearLocalStorage()
		cy.visit('http://localhost:3000/login')
        cy.clearLocalStorage()
	})

	it('Login', () => {
		cy.get('#enterUsername').type('worker')
		cy.get('#selectLocation').click({force: true})
		cy.contains("DK").click({force: true})
		cy.get('#submitLogin').click()

        cy.get("#nav0").should("be.visible")
	})
})