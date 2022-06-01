// /// <reference types="cypress" />

describe('Performance test', () => {
	beforeEach(() => {
		cy.clearLocalStorage()
		cy.visit('http://localhost:3000/login')
		cy.clearLocalStorage()
	})

	it('Completed order', () => {
		cy.get('#enterUsername').type('admin')
		cy.get('#selectLocation').click({force: true})
		cy.contains("DK").click({force: true})
		cy.get('#submitLogin').click()


		cy.visit('http://localhost:3000/completedOrders/464646/1111', {
			onBeforeLoad: (win) => {
				win.performance.mark('start-loading');
			}
		})
			.its('performance').then((performance) => {
			cy.contains("Information").should("be.visible")
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
