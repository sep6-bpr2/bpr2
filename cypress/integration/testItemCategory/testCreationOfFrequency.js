/* eslint-disable */
describe('testCreationOfFrequency', () => {
	 let to25Value
	 let chosenItemCode
		it('should login', () => {
			cy.visit('http://localhost:3000/login');
			cy.get('#enterUsername').click();
			cy.get('#enterUsername').type('admin');
			cy.get('.v-btn__content > div').click();
		})

		it('should navigate to item Category page', ()=>{
			cy.get('header > div > ul >li:nth-child(3) > a').click();
			cy.get('header > div > ul >li:nth-child(3) > a').should('contain.text','Item Categories');

		})

		it('should check title of Page and table header',()=>{
			cy.get('.itemCat > h1').should('contain','Item Category')
			cy.get('th').should('contain','Item Codes')
		})

		it('should choose first item Category', () => {
			cy.get('td').first().invoke('val').then(someVal => chosenItemCode = someVal)
			cy.get('td').first().click();
		})

		it('should validate chosen item code and heading',()=>{
			cy.get('.heading > h1').should('contain','Item Code')
			cy.get('.heading > h4').should('contain',chosenItemCode)
		})

		it('should validate cannot update invalid input', () => {
			cy.get('#to3000').should('be.visible')
			cy.get('#to25').click();
			cy.get('#to25').invoke('val').then(someVal => to25Value = someVal)
			cy.get('#to25').clear();
			cy.get('#to25').should('be.empty')
			cy.get('.col-sm-4:nth-child(1) .v-btn__content').click();
			cy.on("window:alert", (str) => {
				expect(str).to.equal("There is an invalid input");
			});
		})

		it('should reset form', () => {
			cy.get('#resetFreq').click();
			cy.wait(1000)
			cy.get('#to25').should('have.value',to25Value)
		})

		it('should input valid value', () => {
			cy.get('#to5000').should('be.visible')
			cy.get('#to25').click();
			cy.get('#to25').clear();
			cy.get('#to25').type('233457');
			cy.get('.col-sm-4:nth-child(1) .v-btn__content').click();
		})

		it('should check inputted value and cancel', () => {
			cy.get('td').first().click();
			cy.get('#to25').should('have.value','233457')
			cy.visit('http://localhost:3000/itemCategories');
		})
})
