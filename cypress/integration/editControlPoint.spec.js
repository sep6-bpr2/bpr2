describe('edit control point', () => {
// make sure that some of the latest control points in test env are called this is a description

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
		cy.visit('http://localhost:3000/controlPoints/1')

		// Should see notification and failed
		cy.contains('Failed').should('be.visible')
	})

	it('ERROR non authorized user', () => {
		cy.visit('http://localhost:3000/controlPoints/1')

		// Should see login screen
		cy.contains('English').should('be.visible')
		cy.contains('All').should('be.visible')
	})

	describe('authorized and logged', () => {
		before( '', () => {
			cy.clearLocalStorage()
			cy.visit('http://localhost:3000/login')
			cy.get('#enterUsername').type('admin')
			cy.get('#selectLocation').click({force: true})
			cy.contains("DK").click()
			cy.get('#submitLogin').click()
			cy.wait(1000)
			cy.visit('http://localhost:3000/controlPoints/createControlPoint')
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

		beforeEach(() => {
			cy.clearLocalStorage()
			cy.visit('http://localhost:3000/login')
			cy.get('#enterUsername').type('admin')
			cy.get('#selectLocation').click({force: true})
			cy.contains("DK").click()
			cy.get('#submitLogin').click()
			cy.wait(1000)
			cy.visit('http://localhost:3000/controlPoints')
			cy.contains('this is a description').click()
		})

		describe('on submit exceptions/notifications', () => {

			it('User submits control point form without any description specified', ()=>{
				cy.get('#description').clear()
				cy.get('#submit').click()
				cy.contains('at least one description')
			})

			it('User submits control point with no measurement type specified', ()=> {
				cy.get('#measurementType').click({force: true})
				cy.contains('Main information').click()
				cy.get('#submit').click()
				// it is not possible to clear the vuetify drop down once it has some value
				cy.contains('control point has been changed')
			})

			it('User submits control point with no input type specified', () => {
				cy.get('#type').click({force: true})
				cy.contains('Main information').click()
				cy.get('#submit').click()
				// it is not possible to clear the vuetify drop down once it has some value
				cy.contains('control point has been changed')
			})

			it('User submits control point with input type options while no values for options has been specified', ()=> {
				cy.get('#type').click({force: true})
				cy.contains('options').click()
				cy.get('#newOption').click()
				cy.get('#submit').click()
				cy.contains('option can not be empty')
			})

			it('User submits control point with input type number while no value for upper tolerance has been specified', () => {

				cy.get('#type').click({force: true})
				cy.contains('number').click()
				cy.get('#lowerTolerance').type('1.2')
				cy.get('#submit').click()
				cy.contains('upper tolerance can not be empty')
			})

			it('User submits control point with input type number while no value for lower tolerance has been specified', () => {
				cy.get('#type').click({force: true})
				cy.contains('number').click()
				cy.get('#upperTolerance').type('1.2')
				cy.get('#submit').click()
				cy.contains('lower tolerance can not be empty')
			})

			it('User submits control point with no value for item category specified', () => {
				cy.get('#newItemCode').click()
				cy.get('#deleteItemCode').click()
				cy.get('#submit').click()
				cy.contains('code can not be empty')
			})

			it('User submits control point while he specified attributes without the names', () => {
				cy.get('#newAttribute').click()
				cy.get('#submit').click()
				cy.contains('attributes must have a name')
			})

			it('User submits control point with negative lower tolerance', () => {
				cy.get('#type').click({force: true})
				cy.contains('number').click()
				cy.get('#lowerTolerance').type('-1.2')
				cy.get('#upperTolerance').type('1.2')
				cy.get('#submit').click()
				cy.contains('lower tolerance needs to be grater or equal to 0 and smaller than 2147483647')
			})

			it('User submits control point with negative upper tolerance', () => {
				cy.get('#type').click({force: true})
				cy.contains('number').click()
				cy.get('#lowerTolerance').type('1.2')
				cy.get('#upperTolerance').type('-1.2')
				cy.get('#submit').click()
				cy.contains('upper tolerance needs to be grater or equal to 0 and smaller than 2147483647')
			})

			it('User submits control point with description exceeding 200 characters', () => {
				cy.get('#description').type('Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,\n' +
					'molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum\n' +
					'numquam blanditiis harum quisquam eius sed odit fugia')
				cy.get('#submit').click()
				cy.contains('description can not exceed 200 characters')
			})

			it('User submits control point with non positive minimum value for an attribute', () => {
				cy.get('#newAttribute').click()
				cy.get('#attributeName').click()
				cy.contains('height cm').click()
				cy.get("#attributeMinVal").type('-')
                cy.get("#attributeMinVal").type('1')
				cy.get("#attributeMaxVal").type('1')
				cy.get('#submit').click()
				cy.contains('attribute minimum and maximum value needs to be positive value')
			})

			it('User submits control point with non positive maximum value for an attribute', () => {
				cy.get('#newAttribute').click()
				cy.get('#attributeName').click()
				cy.contains('height cm').click()
				cy.get("#attributeMinVal").type('6')
				cy.get("#attributeMaxVal").type('-')
                cy.get("#attributeMaxVal").type('9')

				cy.get('#submit').click()
				cy.contains('attribute minimum and maximum value needs to be positive value')
			})

			it('User submits control point with attribute minimum value greater then maximum value', () => {
				cy.get('#newAttribute').click()
				cy.get('#attributeName').click()
				cy.contains('height cm').click()
				cy.get("#attributeMinVal").type('2')
				cy.get("#attributeMaxVal").type('1')
				cy.get('#submit').click()
				cy.contains('attribute minimum value can not be greater or equal to the maximum value')
			})
		})


		describe('sunny scenarios', ()=> {
			let desc;
			beforeEach('',  () => {
				desc = Math.random().toString(36).substring(2,7);
			})

			describe('description', () => {
				it('description change', () => {
					cy.get('#description').clear().type(desc)
					cy.get('#submit').click()
					cy.visit('http://localhost:3000/controlPoints')
					cy.contains(desc).click()
				})
			})

			describe('measurement type', () => {
				it('measurement type change',  () => {
					cy.get('#description').clear().type(desc)
					cy.get('#measurementType').click({force: true})
					cy.contains('multiple times').click()
					cy.get('#submit').click()
					cy.visit('http://localhost:3000/controlPoints')
					cy.contains(desc).click()
					cy.contains('multiple times')
				})
			})

			describe('input type', () => {
				it('input type change',  () => {
					cy.get('#description').clear().type(desc)
					cy.get('#type').click({force: true})
					cy.contains('number').click()
					cy.get('#lowerTolerance').type('1')
					cy.get('#upperTolerance').type('2')
					cy.get('#submit').click()
					cy.visit('http://localhost:3000/controlPoints')
					cy.contains(desc).click()
					cy.contains('number')
				})
			})

			describe('attributes', () => {
				it('attributes change',  () => {
					cy.get('#description').clear().type(desc)

					cy.get('#newAttribute').click()
					cy.get('#attributeName').click()
					cy.contains('Dybde').click()

					cy.get('#submit').click()
					cy.visit('http://localhost:3000/controlPoints')
					cy.contains(desc).click()
				})
			})

			describe('codes', () => {
				it('codes change', () => {
					cy.get('#description').clear().type(desc)

					cy.get('#categoryItemCode').click()
					cy.contains('32110').click()

					cy.get('#submit').click()
					cy.visit('http://localhost:3000/controlPoints')
					cy.contains(desc).click()
				})
			})

			afterEach('', () => {
				cy.get('#description').clear().type('this is a description')
				cy.get('#submit').click()
			})
		})

	})
})
