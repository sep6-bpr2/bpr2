// /// <reference types="cypress" />

describe('Performance tests', () => {
	beforeEach(() => {
        cy.clearLocalStorage()
		cy.visit('http://localhost:3000/login')
        cy.clearLocalStorage()
	})

	it('Control points list', () => {
		cy.get('#enterUsername').type('admin')
		cy.get('#selectLocation').click({force: true})
		cy.contains("DK").click({force: true})
		cy.get('#submitLogin').click()

        cy.get('#controlPointList').children().get('tbody').children().should('have.length', 10); 
	})
})