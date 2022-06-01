// /// <reference types="cypress" />

describe('Performance test', () => {
	beforeEach(() => {
        cy.clearLocalStorage()
	})

	it('Login', () => {
		cy.visit('http://localhost:3000/login',{
			onBeforeLoad: (win) => {
				win.performance.mark('start-loading');
			}
		})
			.its('performance').then((performance) => {
			cy.get('#enterUsername').should("be.visible")
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
