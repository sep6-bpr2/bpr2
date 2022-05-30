// /// <reference types="cypress" />


describe('Completed orders', () => {
	beforeEach(() => {
        cy.clearLocalStorage()
		cy.visit('http://localhost:3000/login')
        cy.clearLocalStorage()
	})

	it('Check completed order list with 1 items', () => {
        // Logging in to the correct user
		cy.get('#enterUsername').type('admin')
		cy.get('#selectLocation').click({force: true})
		cy.contains("DK").click()
		cy.get('#submitLogin').click()

        cy.get('#nav1').click({force: true})

        // Released orders validation
        cy.contains('This is the completed orders page').should('be.visible')
        // Check that there are 2 rows in the table
        cy.get('#completedOrderList').children().get('tbody').children().should('have.length', 1); 

        // Check header
        cy.contains('Item Number').should('be.visible')
        cy.contains('Item Category Code').should('be.visible')
        cy.contains('Quantity').should('be.visible')
        cy.contains('Deadline').should('be.visible')
        cy.contains('Completion date').should('be.visible')


        // Check rows to contain predefined informatpopoion
        cy.contains('1111').should('be.visible')
        cy.contains('32110').should('be.visible')
        cy.contains('240').should('be.visible')
        cy.contains('2022-06-12').should('be.visible')
        cy.contains('2022-05-24').should('be.visible')

        // Released orders not visible
        cy.contains('123456789').should('not.exist');
        cy.contains('47827').should('not.exist');
        

        // Check order clicking
        cy.get('#customTable0').click()
        cy.contains('1111').should('be.visible')
        cy.get('#nav1').click({force: true})
	})

    it('ERROR user with wrong role', () => {
        cy.get('#enterUsername').type('worker')
        cy.get('#selectLocation').click({force: true})
		cy.contains("DK").click()
		cy.get('#submitLogin').click()
		
		cy.visit('http://localhost:3000/completedOrders')

        // Should see notification and failed
        cy.contains('Failed').should('be.visible')
	})

    it('ERROR non authorized user', () => {
		cy.visit('http://localhost:3000/completedOrders')

        // Should see login screen
        cy.contains('English').should('be.visible')
        cy.contains('All').should('be.visible')
    })
})