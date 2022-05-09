/* eslint-disable */
describe('testCreationOfFrequency', () => {
		it('should login', () => {
			cy.visit('http://localhost:3000/login');
			cy.get('#userInput').click();
			cy.get('#userInput').type('admin');
			cy.get('.v-btn__content > div').click();
		})

		it('should choose first item Category', () => {
			cy.visit('http://localhost:3000/itemCategories')
			cy.wait(1000)
			cy.get('td').first().click();
		})

		it('should validate cannot update invalid input', () => {
			cy.get('#to3000').should('be.visible')
			cy.get('#to25').click();
			cy.get('#to25').clear();
			cy.get('#to25').should('be.empty')
			cy.get('.col-sm-3:nth-child(1) .v-btn__content').click();
		})

		it('should reset form', () => {
			cy.get('#resetBtn').click();
		})

		it('should input valid value', () => {
			cy.get('#to5000').should('be.visible')
			cy.get('#to25').click();
			cy.get('#to25').clear();
			cy.get('#to25').type('233457');
			cy.get('.col-sm-3:nth-child(1) .v-btn__content').click();
		})

		it('should check inputted value and cancel', () => {
			cy.get('td').first().click();
			cy.get('#to25').should('have.value','233457')
			cy.get('.col-sm-3:nth-child(3) .v-btn__content').click();
		})
})
