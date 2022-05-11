describe('login', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000/login')
	})

	it('login with existing user', () => {
		cy.get('#username').type('admin')
		cy.get('#location').click({force: true})
		cy.contains("object").click()
		cy.get('button').click()
	})

})
