describe('create control point', () => {
	before(() => {
		cy.visit('http://localhost:3000/login')
		cy.get('#username').type('admin')
		cy.get('#location').click({force: true})
		cy.contains("object").click()
		cy.get('button').click()
	})

	beforeEach(() => {
		cy.visit('http://localhost:3000/controlPoints/createControlPoint')
	})

	it('sunny scenario', () => {
		expect(true).to.be.true
		cy.get('#description').type('test control point')
		cy.get('#type').click({force: true})
		cy.contains('text').click()
		cy.get('#categoryItemCode').type('32456')
		cy.get('#submit').click()
	})

	describe('options', () => {
		beforeEach(() => {
			cy.get('#type').click({force: true})
			cy.contains('options').click()
		})

		it('always at least two options', () => {
			cy.get('#options>div').children().should('have.length', 2)

			cy.get('#deleteOption').click()
			cy.get('#options>div').children().should('have.length', 2)
		})
		it('new option', () => {
			cy.get('#newOption').click()
			cy.get('#options>div').children().should('have.length', 3)
		})

		it('delete option and option index change while doing it', () => {
			cy.get('#newOption').click()
			cy.get('#deleteOption').click()
			cy.contains('Option 1')
			cy.get('#options>div').children().should('have.length', 2)
		})
	})

	describe('attributes', () => {
		it('new attribute', () => {
			cy.get('#newAttribute').click()
			cy.get('#attributes>div').children().should('have.length', 1)
		})

		it('delete attribute', () => {
			cy.get('#newAttribute').click()
			cy.get('#newAttribute').click()
			cy.get('#attributes>div').children().should('have.length', 2)
			cy.get('#deleteAttribute').click()
			cy.get('#attributes>div').children().should('have.length', 1)
		})
	})

	describe('category item codes', () => {
		it('always at least one code', () => {
			cy.get('#codes>div').children().should('have.length', 1)

			cy.get('#deleteItemCode').click()
			cy.get('#codes>div').children().should('have.length', 1)
		})

		it('new item category code', () => {
			cy.get('#codes>div').children().should('have.length', 1)
			cy.get('#newItemCode').click()
			cy.get('#codes>div').children().should('have.length', 2)
		})

		it('delete code', () => {
			cy.get('#newItemCode').click()
			cy.get('#codes>div').children().should('have.length', 2)
			cy.get('#deleteItemCode').click()
			cy.get('#codes>div').children().should('have.length', 1)
		})
	})

	describe('frequency', () => {
		it('add frequency', () => {
			cy.get('#addFreq').click()
			cy.contains('>25')
			cy.get('#deleteFreq')
		})
		it('delete frequency', () => {
			cy.get('#addFreq').click()
			cy.get('#deleteFreq').click()
			cy.get('#addFreq')
		})
		it('reset frequency', ()=> {
			cy.get('#addFreq').click()
			cy.get('.freqEntry').first().type("33")
			cy.get('.freqEntry').first().should('have.value', "233")// does not work
		})

	})


})
