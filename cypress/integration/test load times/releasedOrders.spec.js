// /// <reference types="cypress" />

describe('Performance test', () => {
	beforeEach(() => {
        cy.clearLocalStorage()
		cy.visit('http://localhost:3000/login')
        cy.clearLocalStorage()
	})

	it('Released order list', () => {
		cy.get('#enterUsername').type('worker')
		cy.get('#selectLocation').click({force: true})
		cy.contains("DK").click({force: true})
		cy.get('#submitLogin').click()

		cy.visit('http://localhost:3000/releasedOrders', {
			onBeforeLoad: (win) => {
				win.performance.mark('start-loading');
			}
		})
			.its('performance').then((performance) => {
			cy.get('#releasedOrderList').children().get('tbody').children().should('have.length', 2)
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
