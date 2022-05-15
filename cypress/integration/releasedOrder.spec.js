// /// <reference types="cypress" />


describe('released order', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/login')
        cy.clearLocalStorage()
    })

    // it('Released order ERROR No attributes', () => {
    //     // Logging in to the correct user
    //     cy.get('#enterUsername').type('worker')
    //     cy.get('#selectLocation').click({ force: true })
    //     cy.contains("object").click()
    //     cy.get('#submitLogin').click()


        // Released orders validation
        // cy.contains('This is the released orders page').should('be.visible')
        // Check that there are 2 rows in the table
        // cy.get('#releasedOrderList').children().get('tbody').children().should('have.length', 3);

    //     // Check order that has no attributes
    //     cy.get('#customTable0').click()
    //     cy.contains('Failed').should('be.visible')
    // })

    // it('Released order ERROR order does not exist', () => {
    //     // Logging in to the correct user
    //     cy.get('#enterUsername').type('worker')
    //     cy.get('#selectLocation').click({ force: true })
    //     cy.contains("object").click()
    //     cy.get('#submitLogin').click()

        // Released orders validation
        // cy.contains('This is the released orders page').should('be.visible')
        // Check that there are 2 rows in the table
        // cy.get('#releasedOrderList').children().get('tbody').children().should('have.length', 3);

    //     // Check order that has no attributes
    //     cy.get('#customTable0').click()
    //     cy.contains('Failed').should('be.visible')
    // })

    // it('Released order ERROR order does not exist', () => {
    //     // Logging in to the correct user
    //     cy.get('#enterUsername').type('worker')
    //     cy.get('#selectLocation').click({ force: true })
    //     cy.contains("object").click()
    //     cy.get('#submitLogin').click()


    //     // Check order without logging in or 
    //     cy.visit('http://localhost:3000/releasedOrders/4345')

    //     // Check order that has no attributes
    //     cy.contains('Failed').should('be.visible')
    // })

    it('Released order OK validate what is shown to user', () => {
        // Logging in to the correct user
        cy.get('#enterUsername').type('worker')
        cy.get('#selectLocation').click({ force: true })
        cy.contains("object").click()
        cy.get('#submitLogin').click()

        // Released orders validation
        cy.contains('This is the released orders page').should('be.visible')
        // Check that there are 2 rows in the table
        cy.get('#releasedOrderList').children().get('tbody').children().should('have.length', 3);

        // Check order that is ok
        cy.get('#customTable1').click()

        cy.contains('Information').should('be.visible')
        cy.contains('Item ID').should('be.visible')
        cy.contains('Description').should('be.visible')
        cy.contains('Item category code').should('be.visible')
        cy.contains('Deadline').should('be.visible')
        cy.contains('Location').should('be.visible')
        cy.contains('Status').should('be.visible')

        cy.contains('47827').should('be.visible')
        cy.contains('Panelfilter 390x300x47').should('be.visible')
        cy.contains('32110').should('be.visible')
        cy.contains('2022-06-12').should('be.visible')
        cy.contains('Denmark, Give').should('be.visible')
        cy.contains('incomplete').should('be.visible')
        // Check if the qa form contains all the elements it needs to 

        {
            // One time measurements
            cy.get('#oneTimeMeasurements').children('tbody').children().should('have.length', 7);
            cy.get('#oneTimeMeasurements').children().contains("Description").should('be.visible')
            cy.get('#oneTimeMeasurements').children().contains("Picture").should('be.visible')
            cy.get('#oneTimeMeasurements').children().contains("Units").should('be.visible')
            cy.get('#oneTimeMeasurements').children().contains("Tolerance").should('be.visible')
            cy.get('#oneTimeMeasurements').children().contains("Expected value").should('be.visible')
            cy.get('#oneTimeMeasurements').children().contains("Answer").should('be.visible')

            // Row one no tolerance
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput0').contains("This is a description").should('be.visible')
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput0').contains("Show guide").should('be.visible')
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput0').contains("mm").should('be.visible')
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput0').contains("300.00").should('be.visible')
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput0').find("input").should('be.visible')

            // Row two symmetric tolerance
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput1').contains("This is a description").should('be.visible')
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput1').contains("Show guide").should('be.visible')
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput1').contains("mm").should('be.visible')
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput1').contains("+/-1mm").should('be.visible')
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput1').contains("390.00").should('be.visible')
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput1').find("input").should('be.visible')

            // Row three asymmetric tolerance 
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput2').contains("This is a description").should('be.visible')
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput2').contains("Show guide").should('be.visible')
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput2').contains("mm").should('be.visible')
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput2').contains("+6/-1mm").should('be.visible')
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput2').contains("47").should('be.visible')
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput2').find("input").should('be.visible')

            // Row four text
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput3').contains("This is a description").should('be.visible')
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput3').contains("Show guide").should('be.visible')
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput3').contains("Text").should('be.visible')
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput3').contains("ISO ePM10 50%").should('be.visible')
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput3').find("input").should('be.visible')

            // Row five options
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput4').contains("This is a description").should('be.visible')
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput4').contains("Show guide").should('be.visible')
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput4').contains("Yes/No").should('be.visible')
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput4').contains("Ja").should('be.visible')
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput4').find("select").should('be.visible')

            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput0').contains("Show guide").click()
            cy.get('img').should('be.visible')
            cy.get('span').should('be.visible')
            cy.get('span').click()
            cy.get('img').should('not.be.visible')

        }

        {
            // multiple time information table
            cy.get('#multipleTimeMeasurementsInfo').children('tbody').children().should('have.length', 3);
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
            cy.get('#multipleTimeMeasurementsInfo').children('tbody').children('#customTableInput0').contains("mm").should('be.visible')
            cy.get('#multipleTimeMeasurementsInfo').children('tbody').children('#customTableInput0').contains("340.00").should('be.visible')

            // Row two symmetric tolerance
            cy.get('#multipleTimeMeasurementsInfo').children('tbody').children('#customTableInput0').contains("A").should('be.visible')
            cy.get('#multipleTimeMeasurementsInfo').children('tbody').children('#customTableInput1').contains("This is a description").should('be.visible')
            cy.get('#multipleTimeMeasurementsInfo').children('tbody').children('#customTableInput1').contains("Show guide").should('be.visible')
            cy.get('#multipleTimeMeasurementsInfo').children('tbody').children('#customTableInput1').contains("Text").should('be.visible')
            cy.get('#multipleTimeMeasurementsInfo').children('tbody').children('#customTableInput1').contains("ISO e").should('be.visible')

            // Row three asymmetric tolerance 
            cy.get('#multipleTimeMeasurementsInfo').children('tbody').children('#customTableInput0').contains("A").should('be.visible')
            cy.get('#multipleTimeMeasurementsInfo').children('tbody').children('#customTableInput2').contains("This is a description").should('be.visible')
            cy.get('#multipleTimeMeasurementsInfo').children('tbody').children('#customTableInput2').contains("Show guide").should('be.visible')
            cy.get('#multipleTimeMeasurementsInfo').children('tbody').children('#customTableInput2').contains("Yes/No").should('be.visible')
            cy.get('#multipleTimeMeasurementsInfo').children('tbody').children('#customTableInput2').contains("Fiber").should('be.visible')

            cy.get('#multipleTimeMeasurementsInfo').children('tbody').children('#customTableInput0').contains("Show guide").click()
            cy.get('img').should('be.visible')
            cy.get('span').should('be.visible')
            cy.get('span').click()
            cy.get('img').should('not.be.visible')

        }

        {
            cy.get('#multipleTimeMeasurementsAnswers').children('tbody').children().should('have.length', 4);
            cy.get('#multipleTimeMeasurementsAnswers').children().contains("No.").should('be.visible')
            cy.get('#multipleTimeMeasurementsAnswers').children().contains("A").should('be.visible')
            cy.get('#multipleTimeMeasurementsAnswers').children().contains("B").should('be.visible')
            cy.get('#multipleTimeMeasurementsAnswers').children().contains("C").should('be.visible')

            // Column one with numbers ( they are inputs )
            cy.get('#multipleTimeMeasurementsAnswers').find('#multipleTimeTable0').find("input").should('have.length', 7)

            // Column with number inputs for number
            cy.get('#multipleTimeMeasurementsAnswers').find('#multipleTimeTable1').find("input").filter(':enabled').should('have.length', 5)
            cy.get('#multipleTimeMeasurementsAnswers').find('#multipleTimeTable1').find("input").filter(':disabled').should('have.length', 2)

            // Column with text inputs for number
            cy.get('#multipleTimeMeasurementsAnswers').find('#multipleTimeTable2').find("input").filter(':enabled').should('have.length', 5)
            cy.get('#multipleTimeMeasurementsAnswers').find('#multipleTimeTable2').find("input").filter(':disabled').should('have.length', 2)

            // Column with text inputs for number
            cy.get('#multipleTimeMeasurementsAnswers').find('#multipleTimeTable3').find("select").should('have.length', 7)
        }

    })


    it('Released order OK validate error detection of the inputs', () => {
        // Logging in to the correct user
        cy.get('#enterUsername').type('worker')
        cy.get('#selectLocation').click({ force: true })
        cy.contains("object").click()
        cy.get('#submitLogin').click()

        // Released orders validation
        cy.contains('This is the released orders page').should('be.visible')
        // Check that there are 2 rows in the table
        cy.get('#releasedOrderList').children().get('tbody').children().should('have.length', 3);

        // Check order that is ok
        cy.get('#customTable1').click()
        cy.contains('Information').should('be.visible')

        // One time measurements
        {
            // Numbers
            // incorrect type highlight red
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput0').find("input").clear().type('a').should('have.css', 'color', 'rgb(255, 0, 0)')
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput1').find("input").clear().type('a').should('have.css', 'color', 'rgb(255, 0, 0)')
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput2').find("input").clear().type('a').should('have.css', 'color', 'rgb(255, 0, 0)')

            // Check negative values
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput0').find("input").clear().type('-300').should('have.css', 'color', 'rgb(255, 0, 0)')
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput1').find("input").clear().type('-390').should('have.css', 'color', 'rgb(255, 0, 0)')
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput2').find("input").clear().type('-47').should('have.css', 'color', 'rgb(255, 0, 0)')

            // Check out of tolerance values
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput0').find("input").clear().type('301').should('have.css', 'color', 'rgb(255, 140, 0)')
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput1').find("input").clear().type('392').should('have.css', 'color', 'rgb(255, 140, 0)')
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput2').find("input").clear().type('54').should('have.css', 'color', 'rgb(255, 140, 0)')

            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput0').find("input").clear().type('299').should('have.css', 'color', 'rgb(255, 140, 0)')
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput1').find("input").clear().type('388').should('have.css', 'color', 'rgb(255, 140, 0)')
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput2').find("input").clear().type('45').should('have.css', 'color', 'rgb(255, 140, 0)')

            // Check numbers above max lenght
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput0').find("input").clear().type('555555555555555555555555555555555555555555555555555').should('have.css', 'color', 'rgb(255, 0, 0)')
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput1').find("input").clear().type('555555555555555555555555555555555555555555555555555').should('have.css', 'color', 'rgb(255, 0, 0)')
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput2').find("input").clear().type('555555555555555555555555555555555555555555555555555').should('have.css', 'color', 'rgb(255, 0, 0)')

            // Check good values
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput0').find("input").clear().type('300').should('have.css', 'color', 'rgb(0, 0, 0)')
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput1').find("input").clear().type('390').should('have.css', 'color', 'rgb(0, 0, 0)')
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput2').find("input").clear().type('47').should('have.css', 'color', 'rgb(0, 0, 0)')

            // Check good empty
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput0').find("input").clear().should('have.css', 'color', 'rgb(0, 0, 0)')
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput1').find("input").clear().should('have.css', 'color', 'rgb(0, 0, 0)')
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput2').find("input").clear().should('have.css', 'color', 'rgb(0, 0, 0)')


            // Text
            // Check text that all characters can be entered
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput3').find("input").clear().type('414211sdgsfdggÆØÅ').should('have.css', 'color', 'rgb(0, 0, 0)')

            // Check numbers above max lenght
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput3').find("input").clear().type('555555555555555555555555555555555555555555555555555').should('have.css', 'color', 'rgb(255, 0, 0)')

            // Check empty value
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput3').find("input").clear().should('have.css', 'color', 'rgb(0, 0, 0)')

            // Options
            // Check empty select
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput4').find("select").get('[value=""]').should('be.disabled')
            // Check other options
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput4').find("select").select(1).should('have.value', 'Yes')
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput4').find("select").select(2).should('have.value', 'No')
        }


        // Multiple time values
        {
            // Numbers
            cy.get('#multipleTimeMeasurementsAnswers').find('#multipleTimeTable1').find("input").filter(':enabled').first()

            // incorrect type highlight red
            cy.get('#multipleTimeMeasurementsAnswers').find('#multipleTimeTable1').find("input").filter(':enabled').first().clear().type('a').should('have.css', 'color', 'rgb(255, 0, 0)')

            // Check negative values
            cy.get('#multipleTimeMeasurementsAnswers').find('#multipleTimeTable1').find("input").filter(':enabled').first().clear().type('-390').should('have.css', 'color', 'rgb(255, 0, 0)')

            // Check out of tolerance values
            cy.get('#multipleTimeMeasurementsAnswers').find('#multipleTimeTable1').find("input").filter(':enabled').first().clear().type('347').should('have.css', 'color', 'rgb(255, 140, 0)')

            cy.get('#multipleTimeMeasurementsAnswers').find('#multipleTimeTable1').find("input").filter(':enabled').first().clear().type('338').should('have.css', 'color', 'rgb(255, 140, 0)')

            // Check numbers above max lenght
            cy.get('#multipleTimeMeasurementsAnswers').find('#multipleTimeTable1').find("input").filter(':enabled').first().clear().type('555555555555555555555555555555555555555555555555555').should('have.css', 'color', 'rgb(255, 0, 0)')

            // Check good values
            cy.get('#multipleTimeMeasurementsAnswers').find('#multipleTimeTable1').find("input").filter(':enabled').first().clear().type('340').should('have.css', 'color', 'rgb(0, 0, 0)')

            // Check good empty
            cy.get('#multipleTimeMeasurementsAnswers').find('#multipleTimeTable1').find("input").filter(':enabled').first().clear().should('have.css', 'color', 'rgb(0, 0, 0)')


            // Text
            // Check text that all characters can be entered
            cy.get('#multipleTimeMeasurementsAnswers').find('#multipleTimeTable2').find("input").filter(':enabled').first().clear().type('414211sdgsfdggÆØÅ').should('have.css', 'color', 'rgb(0, 0, 0)')

            // Check numbers above max lenght
            cy.get('#multipleTimeMeasurementsAnswers').find('#multipleTimeTable2').find("input").filter(':enabled').first().clear().type('555555555555555555555555555555555555555555555555555').should('have.css', 'color', 'rgb(255, 0, 0)')

            // Check empty value
            cy.get('#multipleTimeMeasurementsAnswers').find('#multipleTimeTable2').find("input").filter(':enabled').first().clear().should('have.css', 'color', 'rgb(0, 0, 0)')

            // Options
            // Check empty select
            cy.get('#multipleTimeMeasurementsAnswers').find('#multipleTimeTable3').find("select").first().get('[value=""]').should('be.disabled')
            // Check other options
            cy.get('#multipleTimeMeasurementsAnswers').find('#multipleTimeTable3').find("select").first().select(1).should('have.value', 'Yes')
            cy.get('#multipleTimeMeasurementsAnswers').find('#multipleTimeTable3').find("select").first().select(2).should('have.value', 'No')
        }
    })


    it('Released order OK save inputs', () => {
        // Logging in to the correct user
        cy.get('#enterUsername').type('worker')
        cy.get('#selectLocation').click({ force: true })
        cy.contains("object").click()
        cy.get('#submitLogin').click()

        // Released orders validation
        cy.contains('This is the released orders page').should('be.visible')
        // Check that there are 2 rows in the table
        cy.get('#releasedOrderList').children().get('tbody').children().should('have.length', 3);

        // Check order that is ok
        cy.get('#customTable1').click()
        cy.contains('Information').should('be.visible')

        // One time control points
        {
            // Number
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput0').find("input").clear().type('asdasd')
            cy.get('#saveButton').click()
            cy.contains('Failed').should('be.visible')
            cy.get('#closeAlertButton').click()
            cy.contains('Failed').should('not.exist');
            cy.reload()
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput0').find("input").should('not.have.value', 'asdasd')

            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput0').find("input").clear().type('555555555555555555555555555555555555555555555555555')
            cy.get('#saveButton').click()
            cy.contains('Failed').should('be.visible')
            cy.get('#closeAlertButton').click()
            cy.contains('Failed').should('not.exist');
            cy.reload()
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput0').find("input").should('not.have.value', '555555555555555555555555555555555555555555555555555')

            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput0').find("input").clear().type('100')
            cy.get('#saveButton').click()
            cy.contains('Success').should('be.visible')
            cy.get('#closeAlertButton').click()
            cy.contains('Success').should('not.exist');
            cy.reload()
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput0').find("input").should('have.value', '100')

            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput0').find("input").clear().type('300.90')
            cy.get('#saveButton').click()
            cy.contains('Success').should('be.visible')
            cy.get('#closeAlertButton').click()
            cy.contains('Success').should('not.exist');
            cy.reload()
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput0').find("input").should('have.value', '300.90')


            // Text
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput3').find("input").clear().type('asdasd')
            cy.get('#saveButton').click()
            cy.contains('Success').should('be.visible')
            cy.get('#closeAlertButton').click()
            cy.contains('Success').should('not.exist');
            cy.reload()
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput3').find("input").should('have.value', 'asdasd')

            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput3').find("input").clear().type('555555555555555555555555555555555555555555555555555')
            cy.get('#saveButton').click()
            cy.contains('Failed').should('be.visible')
            cy.get('#closeAlertButton').click()
            cy.contains('Failed').should('not.exist');
            cy.reload()
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput3').find("input").should('not.have.value', '555555555555555555555555555555555555555555555555555')

            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput3').find("input").clear().type('This is the answer')
            cy.get('#saveButton').click()
            cy.contains('Success').should('be.visible')
            cy.get('#closeAlertButton').click()
            cy.contains('Success').should('not.exist');
            cy.reload()
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput3').find("input").should('have.value', 'This is the answer')

            // Option
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput5').find("select").select(1)
            cy.get('#saveButton').click()
            cy.contains('Success').should('be.visible')
            cy.get('#closeAlertButton').click()
            cy.contains('Success').should('not.exist');
            cy.reload()
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput5').find("select").should('have.value', 'Yes')

            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput5').find("select").select(2)
            cy.get('#saveButton').click()
            cy.contains('Success').should('be.visible')
            cy.get('#closeAlertButton').click()
            cy.contains('Success').should('not.exist');
            cy.reload()
            cy.get('#oneTimeMeasurements').children('tbody').children('#customTableInput5').find("select").should('have.value', 'No')

        }

        // multiple time  control points
        {
            // // Number
            cy.get('#multipleTimeMeasurementsAnswers').find('#multipleTimeTable1').find("input").filter(':enabled').eq(1).clear().type('asdasd')
            cy.get('#saveButton').click()
            cy.contains('Failed').should('be.visible')
            cy.get('#closeAlertButton').click()
            cy.contains('Failed').should('not.exist');
            cy.reload()
            cy.get('#multipleTimeMeasurementsAnswers').find('#multipleTimeTable1').find("input").filter(':enabled').eq(1).should('not.have.value', 'asdasd')

            cy.get('#multipleTimeMeasurementsAnswers').find('#multipleTimeTable1').find("input").filter(':enabled').eq(1).clear().type('555555555555555555555555555555555555555555555555555')
            cy.get('#saveButton').click()
            cy.contains('Failed').should('be.visible')
            cy.get('#closeAlertButton').click()
            cy.contains('Failed').should('not.exist');
            cy.reload()
            cy.get('#multipleTimeMeasurementsAnswers').find('#multipleTimeTable1').find("input").filter(':enabled').eq(1).should('not.have.value', '555555555555555555555555555555555555555555555555555')

            cy.get('#multipleTimeMeasurementsAnswers').find('#multipleTimeTable1').find("input").filter(':enabled').eq(1).clear().type('100')
            cy.get('#saveButton').click()
            cy.contains('Success').should('be.visible')
            cy.get('#closeAlertButton').click()
            cy.contains('Success').should('not.exist');
            cy.reload()
            cy.get('#multipleTimeMeasurementsAnswers').find('#multipleTimeTable1').find("input").filter(':enabled').eq(1).should('have.value', '100')


            cy.get('#multipleTimeMeasurementsAnswers').find('#multipleTimeTable1').find("input").filter(':enabled').eq(1).clear().type('300.90')
            cy.get('#saveButton').click()
            cy.contains('Success').should('be.visible')
            cy.get('#closeAlertButton').click()
            cy.contains('Success').should('not.exist');
            cy.reload()
            cy.get('#multipleTimeMeasurementsAnswers').find('#multipleTimeTable1').find("input").filter(':enabled').eq(1).should('have.value', '300.90')


            // Text
            cy.get('#multipleTimeMeasurementsAnswers').find('#multipleTimeTable2').find("input").filter(':enabled').eq(1).clear().type('asdasd')
            cy.get('#saveButton').click()
            cy.contains('Success').should('be.visible')
            cy.get('#closeAlertButton').click()
            cy.contains('Success').should('not.exist');
            cy.reload()
            cy.get('#multipleTimeMeasurementsAnswers').find('#multipleTimeTable2').find("input").filter(':enabled').eq(1).should('have.value', 'asdasd')

            cy.get('#multipleTimeMeasurementsAnswers').find('#multipleTimeTable2').find("input").filter(':enabled').eq(1).clear().type('555555555555555555555555555555555555555555555555555')
            cy.get('#saveButton').click()
            cy.contains('Failed').should('be.visible')
            cy.get('#closeAlertButton').click()
            cy.contains('Failed').should('not.exist');
            cy.reload()
            cy.get('#multipleTimeMeasurementsAnswers').find('#multipleTimeTable2').find("input").filter(':enabled').eq(1).should('not.have.value', '555555555555555555555555555555555555555555555555555')

            cy.get('#multipleTimeMeasurementsAnswers').find('#multipleTimeTable2').find("input").filter(':enabled').eq(1).clear().type('This is the answer')
            cy.get('#saveButton').click()
            cy.contains('Success').should('be.visible')
            cy.get('#closeAlertButton').click()
            cy.contains('Success').should('not.exist');
            cy.reload()
            cy.get('#multipleTimeMeasurementsAnswers').find('#multipleTimeTable2').find("input").filter(':enabled').eq(1).should('have.value', 'This is the answer')

            // // Option
            cy.get('#multipleTimeMeasurementsAnswers').find('#multipleTimeTable3').find("select").eq(1).select(1)
            cy.get('#saveButton').click()
            cy.contains('Success').should('be.visible')
            cy.get('#closeAlertButton').click()
            cy.contains('Success').should('not.exist');
            cy.reload()
            cy.get('#multipleTimeMeasurementsAnswers').find('#multipleTimeTable3').find("select").filter(':enabled').eq(1).should('have.value', 'Yes')

            cy.get('#multipleTimeMeasurementsAnswers').find('#multipleTimeTable3').find("select").eq(1).select(2)
            cy.get('#saveButton').click()
            cy.contains('Success').should('be.visible')
            cy.get('#closeAlertButton').click()
            cy.contains('Success').should('not.exist');
            cy.reload()
            cy.get('#multipleTimeMeasurementsAnswers').find('#multipleTimeTable3').find("select").filter(':enabled').eq(1).should('have.value', 'No')
        }
    })

    it('Released order ERROR complete order without all fields filed in', () => {
        // Logging in to the correct user
        cy.get('#enterUsername').type('worker')
        cy.get('#selectLocation').click({ force: true })
        cy.contains("object").click()
        cy.get('#submitLogin').click()

        // Released orders validation
        cy.contains('This is the released orders page').should('be.visible')
        // Check that there are 2 rows in the table
        cy.get('#releasedOrderList').children().get('tbody').children().should('have.length', 3);

        // Check order that is ok
        cy.get('#customTable1').click()
        cy.contains('Information').should('be.visible')

        cy.get('#completeButton').click()
        cy.contains('Failed').should('be.visible')
        cy.get('#closeAlertButton').click()
        cy.contains('Failed').should('not.exist');
    })

})