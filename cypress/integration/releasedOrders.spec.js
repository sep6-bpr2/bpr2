// /// <reference types="cypress" />


describe('login', () => {
	beforeEach(() => {
        cy.clearLocalStorage()
		cy.visit('http://localhost:3000/login')
        cy.clearLocalStorage()
	})

	it('Check released order list with 2 items', () => {
		cy.get('#enterUsername').type('worker')
		cy.get('#selectLocation').click({force: true})
		cy.contains("DK").click()
		cy.get('#submitLogin').click()


        // Released orders validation
        cy.contains('This is the released orders page').should('be.visible')
        // Check that there are 2 rows in the table
        cy.get('#releasedOrderList').children().get('tbody').children().should('have.length', 2); 

        // Check header
        cy.contains('Item Number').should('be.visible')
        cy.contains('Item Category Code').should('be.visible')
        cy.contains('Quantity').should('be.visible')
        cy.contains('Deadline').should('be.visible')

        // Check rows to contain predefined informatpopoion
        cy.contains('123456789').should('be.visible')
        cy.contains('65487').should('be.visible')
        cy.contains('240').should('be.visible')
        cy.contains('2022-06-12').should('be.visible')

        cy.contains('47827').should('be.visible')
        cy.contains('32110').should('be.visible')
        
        // Completed order not visible
        cy.contains('1111').should('not.exist');

        // Check order clicking
        cy.get('#customTable0').click()
        cy.get('#nav0').click({force: true})

        cy.get('#customTable1').click()
        cy.get('#nav0').click({force: true})
	})

    it('ERROR user with wrong role', () => {
        cy.get('#enterUsername').type('admin')
		cy.get('#submitLogin').click()

		cy.visit('http://localhost:3000/releasedOrders')

        // Should see notification and failed
        cy.contains('Failed').should('be.visible')
	})

    it('ERROR non authorized user', () => {
		cy.visit('http://localhost:3000/releasedOrders')

        // Should see login screen
        cy.contains('English').should('be.visible')
        cy.contains('All').should('be.visible')
    })
})