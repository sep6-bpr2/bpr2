/* eslint-disable */
describe('testCreationOfUser', () => {

	let val = Math.random().toString(36).substring(2,7)

	it('should login', () => {
		cy.visit('http://localhost:3000/login');
		cy.get('#username').click();
		cy.get('#username').type('admin');
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
		cy.get('.v-btn:nth-child(4) > .v-btn__content').click();
		cy.on("window:alert", (str) => {
			expect(str).to.equal("User already exists!");
		});
	})

	it('should create user',()=>{
		cy.get('#createUser').click()
		cy.get('#usernameInput').click();
		cy.get('#usernameInput').clear();
		cy.get('#usernameInput').type(val);
		cy.get('#roles').parent().click()
		cy.get('.v-menu__content').contains("admin").click();
		cy.get('.v-btn:nth-child(4) > .v-btn__content').click();
	})

	it('should check created user',()=>{
		cy.get('tr').should('contain.text',val)
	})
})
