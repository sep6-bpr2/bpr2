// /// <reference types="cypress" />

describe('Performance tests', () => {
	beforeEach(() => {
		cy.clearLocalStorage()
		cy.visit('http://localhost:3000/login')
		cy.clearLocalStorage()
	})

	it('Users', () => {
		cy.get('#enterUsername').type('admin')
		cy.get('#selectLocation').click({force: true})
		cy.contains("DK").click({force: true})
		cy.get('#submitLogin').click()

		cy.visit('http://localhost:3000/users', {
			onBeforeLoad: (win) => {
				win.performance.mark('start-loading');
			}
		})
			.its('performance').then((performance) => {
			cy.get('h1').should('contain.text', 'User management')
				.then(() => performance.mark('end-loading'))
				.then(() => {
					performance.measure('pageLoad', 'start-loading', 'end-loading');
					// Retrieve the timestamp we just created
					const measure = performance.getEntriesByName('pageLoad')[0];
					// This is the total amount of time (in milliseconds) between the start and end
					const duration = measure.duration;
					assert.isAtMost(duration, 5000);
				});
		})
	})
})
