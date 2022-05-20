// /// <reference types="cypress" />

describe('Performance test', () => {
	beforeEach(() => {
        cy.clearLocalStorage()
		cy.visit('http://localhost:3000/login')
        cy.clearLocalStorage()
	})

	it('Completed order list', () => {
		cy.get('#enterUsername').type('admin')
		cy.get('#selectLocation').click({force: true})
		cy.contains("DK").click({force: true})
		cy.get('#submitLogin').click()

        cy.visit('http://localhost:3000/completedOrders')

        cy.get('#completedOrderList').children().get('tbody').children().should('have.length', 1); 
	})
})