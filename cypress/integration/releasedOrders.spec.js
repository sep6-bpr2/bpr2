// /// <reference types="cypress" />


describe('login', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000/login')
        cy.clearLocalStorage()
	})

	it('Check released order list with 2 items', () => {
        // Logging in to the correct user
        cy.get('#selectLanguage').click({force: true})
		cy.contains("Dansk").click()

        cy.get('#selectLanguage').click({force: true})
		cy.contains("Lietuvi").click()

        cy.get('#selectLanguage').click({force: true})
		cy.contains("English").click()

		cy.get('#enterUsername').type('worker')
		cy.get('#selectLocation').click({force: true})
		cy.contains("object").click()
		cy.get('#submitLogin').click()


        // Released orders validation
        cy.contains('This is the released orders page').should('be.visible')
        // Check that there are 2 rows in the table
        cy.get('#releasedOrderList').children().get('tbody').children().should('have.length', 3); 

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

        // Check order clicking
        cy.get('#customTable0').click()
        cy.get('#nav0').click({force: true})

        cy.get('#customTable1').click()
        cy.get('#nav0').click({force: true})
	})

    it('Check released order list with 0 items', () => {
        // Go to page without logging in
		cy.visit('http://localhost:3000/releasedOrders')

        // Released orders validation
        cy.contains('This is the released orders page').should('be.visible')
        cy.get('#releasedOrderList').children().get('tbody').children().should('have.length', 0); 

        // Check header
        cy.contains('Item Number').should('be.visible')
        cy.contains('Item Category Code').should('be.visible')
        cy.contains('Quantity').should('be.visible')
        cy.contains('Deadline').should('be.visible')

        // Check rows to contain predefined information
        cy.contains('123456789').should('not.exist')
        cy.contains('65487').should('not.exist')
        cy.contains('240').should('not.exist')
        cy.contains('2022-06-12').should('not.exist')

        cy.contains('47827').should('not.exist')
        cy.contains('32110').should('not.exist')

        cy.contains('English').should('be.visible')
	})
})