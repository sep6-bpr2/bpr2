// /// <reference types="cypress" />


describe('Completed orders', () => {
	beforeEach(() => {
        cy.clearLocalStorage()
		cy.visit('http://localhost:3000/login')
        cy.clearLocalStorage()
	})

    
    it('Completed order OK validate what is shown to user', () => {
        // Logging in to the correct user
		cy.get('#enterUsername').type('admin')
		cy.get('#selectLocation').click({force: true})
		cy.contains("DK").click()
		cy.get('#submitLogin').click()

        cy.get('#nav1').click({force: true})

        // Released orders validation
        cy.contains('This is the completed orders page').should('be.visible')
        // Check that there are 1 rows in the table
        cy.get('#completedOrderList').children().get('tbody').children().should('have.length', 1); 

        cy.get('#customTable0').click()

        cy.contains('Information').should('be.visible')
        cy.contains('Item ID').should('be.visible')
        cy.contains('Description').should('be.visible')
        cy.contains('Item category code').should('be.visible')
        cy.contains('Deadline').should('be.visible')
        cy.contains('Location').should('be.visible')
        cy.contains('Status').should('be.visible')
        cy.contains('Completed date').should('be.visible')

        cy.contains('1111').should('be.visible')
        cy.contains('Filterfilter 390x300x47').should('be.visible')
        cy.contains('32110').should('be.visible')
        cy.contains('2022-06-12').should('be.visible')
        cy.contains('DK').should('be.visible')
        cy.contains('completed').should('be.visible')
        cy.contains('2022-05-24').should('be.visible')

        // Check if the qa form contains all the elements it needs to 

        {
            // One time measurements
            cy.get('#oneTimeMeasurements').children('tbody').children().should('have.length', 1);
            cy.get('#oneTimeMeasurements').children().contains("Description").should('be.visible')
            cy.get('#oneTimeMeasurements').children().contains("Picture").should('be.visible')
            cy.get('#oneTimeMeasurements').children().contains("Units").should('be.visible')
            cy.get('#oneTimeMeasurements').children().contains("Tolerance").should('be.visible')
            cy.get('#oneTimeMeasurements').children().contains("Expected value").should('be.visible')
            cy.get('#oneTimeMeasurements').children().contains("Answer").should('be.visible')

            // Row one no tolerance
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput0').contains("Descirption of the control point 1").should('be.visible')
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput0').contains("Show guide").should('be.visible')
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput0').contains("mm").should('be.visible')
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput0').contains("301.00").should('be.visible')
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput0').find("input").should('be.visible')
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput0').find("input").should('have.value', '32323')
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput0').contains("Show guide").click()
            // Check that image is visible and that it is of width bigger than 0 (this means it loaded good)
            cy.get('img').should('be.visible').and(($img) => { expect($img[0].naturalWidth).to.be.greaterThan(0)})
            cy.get('span').should('be.visible')
            cy.get('span').click()
            cy.get('img').should('not.be.visible')
        }

        {
            // multiple time information table
            cy.get('#multipleTimeMeasurementsInfo').children('tbody').children().should('have.length', 1);
            cy.get('#multipleTimeMeasurementsInfo').children().contains("Letter").should('be.visible')
            cy.get('#multipleTimeMeasurementsInfo').children().contains("Description").should('be.visible')
            cy.get('#multipleTimeMeasurementsInfo').children().contains("Picture").should('be.visible')
            cy.get('#multipleTimeMeasurementsInfo').children().contains("Units").should('be.visible')
            cy.get('#multipleTimeMeasurementsInfo').children().contains("Tolerance").should('be.visible')
            cy.get('#multipleTimeMeasurementsInfo').children().contains("Expected value").should('be.visible')

            // Row one no tolerance
            cy.get('#multipleTimeMeasurementsInfo').children('tbody').children('#customTableInput0').contains("A").should('be.visible')
            cy.get('#multipleTimeMeasurementsInfo').children('tbody').children('#customTableInput0').contains("This is a description").should('be.visible')
            cy.get('#multipleTimeMeasurementsInfo').children('tbody').children('#customTableInput0').contains("Show guide").should('be.visible')
            cy.get('#multipleTimeMeasurementsInfo').children('tbody').children('#customTableInput0').contains("Yes/No").should('be.visible')
            cy.get('#multipleTimeMeasurementsInfo').children('tbody').children('#customTableInput0').contains("Fiber").should('be.visible')
            cy.get('#multipleTimeMeasurementsInfo').children('tbody').children('#customTableInput0').contains("Show guide").click()
            cy.get('img').should('be.visible').and(($img) => { expect($img[0].naturalWidth).to.be.greaterThan(0)})
            cy.get('span').should('be.visible')
            cy.get('span').click()
            cy.get('img').should('not.be.visible')  
        }

        {
            cy.get('#multipleTimeMeasurementsAnswers').children('tbody').children().should('have.length', 2);
            cy.get('#multipleTimeMeasurementsAnswers').children().contains("No.").should('be.visible')
            cy.get('#multipleTimeMeasurementsAnswers').children().contains("A").should('be.visible')

            // Column one with numbers ( they are inputs )
            cy.get('#multipleTimeMeasurementsAnswers').find('#multipleTimeTable0').find("input").should('have.length', 7)
            cy.get('#multipleTimeMeasurementsAnswers').find('#multipleTimeTable0').find("input").eq(0).should('have.value', '1')
            cy.get('#multipleTimeMeasurementsAnswers').find('#multipleTimeTable0').find("input").eq(1).should('have.value', '2')
            cy.get('#multipleTimeMeasurementsAnswers').find('#multipleTimeTable0').find("input").eq(2).should('have.value', '3')
            cy.get('#multipleTimeMeasurementsAnswers').find('#multipleTimeTable0').find("input").eq(3).should('have.value', '4')
            cy.get('#multipleTimeMeasurementsAnswers').find('#multipleTimeTable0').find("input").eq(4).should('have.value', '5')
            cy.get('#multipleTimeMeasurementsAnswers').find('#multipleTimeTable0').find("input").eq(5).should('have.value', '6')
            cy.get('#multipleTimeMeasurementsAnswers').find('#multipleTimeTable0').find("input").eq(6).should('have.value', '7')

            // Column with text inputs for number
            cy.get('#multipleTimeMeasurementsAnswers').find('#multipleTimeTable1').find("select").should('have.length', 7)
            cy.get('#multipleTimeMeasurementsAnswers').find('#multipleTimeTable1').find("select").eq(0).should('have.value', 'Yes')
            cy.get('#multipleTimeMeasurementsAnswers').find('#multipleTimeTable1').find("select").eq(1).should('have.value', 'Yes')
            cy.get('#multipleTimeMeasurementsAnswers').find('#multipleTimeTable1').find("select").eq(2).should('have.value', 'Yes')
            cy.get('#multipleTimeMeasurementsAnswers').find('#multipleTimeTable1').find("select").eq(3).should('have.value', 'Yes')
            cy.get('#multipleTimeMeasurementsAnswers').find('#multipleTimeTable1').find("select").eq(4).should('have.value', 'Yes')
            cy.get('#multipleTimeMeasurementsAnswers').find('#multipleTimeTable1').find("select").eq(5).should('have.value', 'No')
            cy.get('#multipleTimeMeasurementsAnswers').find('#multipleTimeTable1').find("select").eq(6).should('have.value', 'No')


        }
    })

    it('ERROR user with wrong role', () => {
        cy.get('#enterUsername').type('worker')
        cy.get('#selectLocation').click({force: true})
		cy.contains("DK").click()
		cy.get('#submitLogin').click()
		
		cy.visit('http://localhost:3000/completedOrders/4144123sda')

        // Should see notification and failed
        cy.contains('Failed').should('be.visible')
	})

    it('ERROR non authorized user', () => {
		cy.visit('http://localhost:3000/completedOrders/4144123sda')

        // Should see login screen
        cy.contains('English').should('be.visible')
        cy.contains('All').should('be.visible')
    })
})