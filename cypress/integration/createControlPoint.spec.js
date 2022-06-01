describe('create control point', () => {

	beforeEach('clear login', () => {
		cy.clearLocalStorage()
		cy.visit('http://localhost:3000/login')
		cy.clearLocalStorage()
	})

	it('ERROR user with wrong role', () => {
		cy.get('#enterUsername').type('worker')
		cy.get('#selectLocation').click({force: true})
		cy.contains("DK").click()
		cy.get('#submitLogin').click()
		cy.wait(1000)
		cy.visit('http://localhost:3000/controlPoints/createControlPoint')

		// Should see notification and failed
		cy.contains('Failed').should('be.visible')
	})

	it('ERROR non authorized user', () => {
		cy.visit('http://localhost:3000/controlPoints/createControlPoint')

		// Should see login screen
		cy.contains('English').should('be.visible')
		cy.contains('All').should('be.visible')
	})

	describe('authorized and logged', () => {
		beforeEach(() => {
			cy.clearLocalStorage()
			cy.visit('http://localhost:3000/login')
			cy.get('#enterUsername').type('admin')
			cy.get('#selectLocation').click({force: true})
			cy.contains("DK").click()
			cy.get('#submitLogin').click()
			cy.wait(1000)
			cy.visit('http://localhost:3000/controlPoints/createControlPoint')
		})

		it('sunny scenarios', () => {
			cy.get('#description').type('this is a description')
			cy.get('#measurementType').click({force: true})
			cy.contains('one time').click({force: true})
			cy.get('#type').click({force: true})
			cy.contains('text').click()
			cy.get('#categoryItemCode').type('32110')
			cy.contains('32110').click()
			cy.get('#submit').click()
			cy.contains('control point has been created')
		})

		describe('on submit exceptions/notifications', () => {

			it('User submits control point form without any description specified', ()=>{
				cy.get('#measurementType').click({force: true})
				cy.contains('one time').click({force: true})
				cy.get('#type').click({force: true})
				cy.contains('text').click()
				cy.get('#categoryItemCode').type('32110')
				cy.contains('32110').click()
				cy.get('#submit').click()
				cy.contains('at least one description')
			})

			it('User submits control point with no measurement type specified', ()=> {
				cy.get('#description').type('this is a description')
				cy.get('#type').click({force: true})
				cy.contains('text').click()
				cy.get('#categoryItemCode').type('32110')
				cy.contains('32110').click()
				cy.get('#submit').click()
				cy.contains('measurement type can not be empty')
			})

			it('User submits control point with no input type specified', () => {
				cy.get('#description').type('this is a description')
				cy.get('#measurementType').click({force: true})
				cy.contains('one time').click({force: true})
				cy.get('#categoryItemCode').type('32110')
				cy.contains('32110').click()
				cy.get('#submit').click()
				cy.contains('value type can not be empty')
			})

			it('User submits control point with input type options while no values for options has been specified', ()=> {
				cy.get('#description').type('this is a description')
				cy.get('#measurementType').click({force: true})
				cy.contains('one time').click({force: true})
				cy.get('#type').click({force: true})
				cy.contains('options').click()
				cy.get('#newOption').click()
				cy.get('#categoryItemCode').type('32110')
				cy.contains('32110').click()
				cy.get('#submit').click()
				cy.contains('option can not be empty')
			})

			it('User submits control point with input type number while no value for upper tolerance has been specified', () => {
				cy.get('#description').type('this is a description')
				cy.get('#measurementType').click({force: true})
				cy.contains('one time').click({force: true})
				cy.get('#type').click({force: true})
				cy.contains('number').click()
				cy.get('#lowerTolerance').type('1.2')
				cy.get('#categoryItemCode').type('32110')
				cy.contains('32110').click()
				cy.get('#submit').click()
				cy.contains('upper tolerance can not be empty')
			})

			it('User submits control point with input type number while no value for lower tolerance has been specified', () => {
				cy.get('#description').type('this is a description')
				cy.get('#measurementType').click({force: true})
				cy.contains('one time').click({force: true})
				cy.get('#type').click({force: true})
				cy.contains('number').click()
				cy.get('#upperTolerance').type('1.2')
				cy.get('#categoryItemCode').type('32110')
				cy.contains('32110').click()
				cy.get('#submit').click()
				cy.contains('lower tolerance can not be empty')
			})

			it('User submits control point with no value for item category specified', () => {
				cy.get('#description').type('this is a description')
				cy.get('#measurementType').click({force: true})
				cy.contains('one time').click({force: true})
				cy.get('#type').click({force: true})
				cy.contains('text').click()
				cy.get('#submit').click()
				cy.contains('code can not be empty')
			})

			it('User submits control point while he specified attributes without the names', () => {
				cy.get('#description').type('this is a description')
				cy.get('#measurementType').click({force: true})
				cy.contains('one time').click({force: true})
				cy.get('#type').click({force: true})
				cy.contains('text').click()
				cy.get('#categoryItemCode').type('32110')
				cy.contains('32110').click()
				cy.get('#newAttribute').click()
				cy.get('#submit').click()
				cy.contains('attributes must have a name')
			})

			it('User submits control point with negative lower tolerance', () => {
				cy.get('#description').type('this is a description')
				cy.get('#measurementType').click({force: true})
				cy.contains('one time').click({force: true})
				cy.get('#type').click({force: true})
				cy.contains('number').click()
				cy.get('#lowerTolerance').type('-1.2')
				cy.get('#upperTolerance').type('1.2')
				cy.get('#categoryItemCode').type('32110')
				cy.contains('32110').click()
				cy.get('#submit').click()
				cy.contains('lower tolerance needs to be grater or equal to 0 and smaller than 2147483647')
			})

			it('User submits control point with negative upper tolerance', () => {
				cy.get('#description').type('this is a description')
				cy.get('#measurementType').click({force: true})
				cy.contains('one time').click({force: true})
				cy.get('#type').click({force: true})
				cy.contains('number').click()
				cy.get('#lowerTolerance').type('1.2')
				cy.get('#upperTolerance').type('-1.2')
				cy.get('#categoryItemCode').type('32110')
				cy.contains('32110').click()
				cy.get('#submit').click()
				cy.contains('upper tolerance needs to be grater or equal to 0 and smaller than 2147483647')
			})

			it('User submits control point with description exceeding 200 characters', () => {
				cy.get('#description').type('Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,\n' +
					'molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum\n' +
					'numquam blanditiis harum quisquam eius sed odit fugia')
				cy.get('#measurementType').click({force: true})
				cy.contains('one time').click({force: true})
				cy.get('#type').click({force: true})
				cy.contains('text').click()
				cy.get('#categoryItemCode').type('32110')
				cy.contains('32110').click()
				cy.get('#submit').click()
				cy.contains('description can not exceed 200 characters')
			})

			it('User submits control point with non positive minimum value for an attribute', () => {
				cy.get('#description').type('this is a description')
				cy.get('#measurementType').click({force: true})
				cy.contains('one time').click({force: true})
				cy.get('#type').click({force: true})
				cy.contains('text').click()
				cy.get('#categoryItemCode').type('32110')
				cy.contains('32110').click()

				cy.get('#newAttribute').click()
				cy.get('#attributeName').click()
				cy.contains('height cm').click()
				cy.get("#attributeMinVal").type('0')
				cy.get("#attributeMaxVal").type('1.2')
				cy.get('#submit').click()
				cy.contains('attribute minimum and maximum value needs to be positive value')
			})

			it('User submits control point with non positive maximum value for an attribute', () => {
				cy.get('#description').type('this is a description')
				cy.get('#measurementType').click({force: true})
				cy.contains('one time').click({force: true})
				cy.get('#type').click({force: true})
				cy.contains('text').click()
				cy.get('#categoryItemCode').type('32110')
				cy.contains('32110').click()

				cy.get('#newAttribute').click()
				cy.get('#attributeName').click()
				cy.contains('height cm').click()
				cy.get("#attributeMinVal").type('0.1')
				cy.get("#attributeMaxVal").type('-1.2')
				cy.get('#submit').click()
				cy.contains('attribute minimum and maximum value needs to be positive value')
			})

			it('User submits control point with attribute minimum value greater then maximum value', () => {
				cy.get('#description').type('this is a description')
				cy.get('#measurementType').click({force: true})
				cy.contains('one time').click({force: true})
				cy.get('#type').click({force: true})
				cy.contains('text').click()
				cy.get('#categoryItemCode').type('32110')
				cy.contains('32110').click()

				cy.get('#newAttribute').click()
				cy.get('#attributeName').click()
				cy.contains('height cm').click()
				cy.get("#attributeMinVal").type('2')
				cy.get("#attributeMaxVal").type('1')
				cy.get('#submit').click()
				cy.contains('attribute minimum value can not be greater or equal to the maximum value')
			})
		})
	})
})
