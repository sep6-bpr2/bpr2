describe('create control point', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000/login')
		cy.get('#username').type('admin')
		cy.get('#location').click({force: true})
		cy.contains("object").click()
		cy.get('button').click()
		cy.visit('http://localhost:3000/controlPoints/createControlPoint')
	})

	it('sunny scenario', () => {
		expect(true).to.be.true
		cy.get('#description').type('test control point')
		cy.get('#type').click({force: true})
		cy.contains('text').click()
		cy.get('#categoryItemCode').first().type('32456')
		cy.get('#submit').click()
	})

	describe('options', () => {
		beforeEach(()=>{
			cy.get('#type').click({force: true})
			cy.contains('options').click()
		})

		it('always at least two options', () => {
			cy.get('#options>div').children().should('have.length', 2)

			cy.get('#deleteOption').first().click()
			cy.get('#options>div').children().should('have.length', 2)
		})
		it('new option', () => {
			cy.get('#newOption').click()
			cy.get('#options>div').children().should('have.length', 3)
		})

		it('delete option', () => {
			cy.get('#newOption').click()
			cy.get('#deleteOption').first().click()
			cy.get('#options>div').children().should('have.length', 2)
		})
	})
	

})
