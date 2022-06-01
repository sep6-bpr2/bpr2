describe('login', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000/login')
	})

	it('shouldnt login non-existent user',()=>{
		cy.get('#enterUsername').type('simon')
		cy.get('#selectLocation').click({force: true})
		cy.contains("DK").click()
		cy.get('#submitLogin').click()
		cy.get('.alert').should('contain.text','This user does not exist in the system!')
	})

	it('shoulnt login qa worker with all department',()=>{
		cy.get('#enterUsername').type('worker')
		cy.get('#selectLocation').parent().click()
		cy.get('.v-menu__content').contains("All").click();
		cy.get('#submitLogin').click()
		cy.get('.alert').should('contain.text','This user is not allowed to login with specified department!')
	})

	it('logs in proper administrator user',()=>{
		cy.get('#enterUsername').type('admin')
		cy.get('#selectLocation').click({force: true})
		cy.contains("DK").click()
		cy.get('#submitLogin').click()
		cy.get('h1').should('contain.text','Control point management')
		cy.get('header > button').click();
	})

	it('logs in proper qa worker user',()=>{
		cy.get('#enterUsername').type('worker')
		cy.get('#selectLocation').parent().click()
		cy.get('.v-menu__content').contains("DK").click();
		cy.get('#submitLogin').click()
		cy.get('h1').should('contain.text','Released orders')
	})
})
