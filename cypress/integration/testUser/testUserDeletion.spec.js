/* eslint-disable */
describe('testDeletionOfUser', () => {

	let val2 = Math.random().toString(36).substring(2,7)

	it('should login', () => {
		cy.visit('http://localhost:3000/login');
		cy.get('#enterUsername').click();
		cy.get('#enterUsername').type('admin');
		cy.get('.v-btn__content > div').click();
	})

	it('should get user page',()=>{
		cy.visit('http://localhost:3000/users')
	})

	it('should validate user that already exists',()=>{
		cy.get('#createUser').click()
		cy.get('#usernameInput').click();
		cy.get('#usernameInput').type('admin');
		cy.get('#roles').parent().click()
		cy.get('.v-menu__content').contains("admin").click();
		cy.get('.v-btn:nth-child(3) > .v-btn__content').click();
		cy.on("window:alert", (str) => {
			expect(str).to.equal("User already exists!");
		});
	})

	it('should create user',()=>{
		cy.get('#createUser').click()
		cy.get('#usernameInput').click();
		cy.get('#usernameInput').clear();
		cy.get('#usernameInput').type(val2);
		cy.get('#roles').parent().click()
		cy.get('.v-menu__content').contains("admin").click();
		cy.get('.v-btn:nth-child(3) > .v-btn__content').click();
	})

	it('should check created user',()=>{
		cy.get('tr').should('contain.text',val2)
	})

	it('should delete user',()=>{
		cy.get('tr').last().trigger('mouseover')
		cy.get('.trashCan').last().click()
		cy.on("window:alert", (str) => {
			expect(str).to.equal("Are you sure you want to delete user with username: " + val2);
		});
	})

	it('should check that user deleted',()=>{
		cy.get('tr').should('not.include.text',val2)
	})


})
