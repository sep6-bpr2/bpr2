// /// <reference types="cypress" />

describe('Control points page', () => {
	beforeEach(() => {
        cy.clearLocalStorage()
		cy.visit('http://localhost:3000/login')
        cy.clearLocalStorage()
	})

	it('Check control points list items', () => {
		cy.get('#enterUsername').type('admin')
		// cy.get('#selectLocation').click({force: true})
		// cy.contains("All").click({force: true})
		cy.get('#submitLogin').click()


        // Released orders validation
        cy.contains('Control point management').should('be.visible')
        // Check that there are 2 rows in the table
        cy.get('#controlPointList').children().get('tbody').children().should('have.length', 10); 

        // Check header
        cy.contains('ID').should('be.visible')
        cy.contains('Description').should('be.visible')

        // // Check rows to contain predefined informatpopoion
        cy.contains('Descirption of the control point 1').should('be.visible')
        cy.contains('This is a description 2').should('be.visible')
        cy.contains('This is a description 3').should('be.visible')
        cy.contains('This is a description 4').should('be.visible')
        cy.contains('This is a description 5').should('be.visible')
        cy.contains('This is a description 6').should('be.visible')
        cy.contains('This is a description 7').should('be.visible')
        cy.contains('This is a description 8').should('be.visible')
        cy.contains('This is a description 9').should('be.visible')
        cy.contains('This is a description 10').should('be.visible')

        // // Check order clicking
        cy.get('#customTable0').click()
        cy.get('#nav0').click({force: true})
	})

    it('ERROR user with wrong role', () => {
        cy.get('#enterUsername').type('worker')
		cy.get('#submitLogin').click()

		cy.visit('http://localhost:3000/controlPoints')

        // Should see notification and failed
        cy.contains('Failed').should('be.visible')
	})

    it('ERROR non authorized user', () => {
		cy.visit('http://localhost:3000/controlPoints')

        // Should see login screen
        cy.contains('English').should('be.visible')
        cy.contains('All').should('be.visible')
    })
})