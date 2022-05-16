describe('login', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000/login')
	})

	it('login with existing user', () => {
		cy.get('#enterUsername').type('admin')
		cy.get('#selectLocation').click({force: true})
		cy.contains("DK").click()
		cy.get('#submitLogin').click()
	})

})
