const moment = require("moment")
const model = require("../models/orders")

/**
 * get a list of orders that are released in the system. All of them
 * @param {string} location - location of the order (DK, LT)
 * @returns [{
 *      id: string(int),
 *      categoryCode: string(int),
 *      quantity: int,
 *      deadline: string(date)
 * }]
 */
module.exports.releasedOrders = async (location) => {
    // Get released orders from konfair
    let orders = await model.getReleasedOrders(location)

    // No released orders in the konfair database
    if (orders.length == 0) {
        return []
    }

    // Get our database qa reports that are related to these released orders
    let qaReports = await model.getMultipleQAReports(listToCommaString(orders, 'id'))

    let uncompletedOrders = []

    // Filter all orders that are not completed
    for (let i = 0; i < orders.length; i++) {
        let addToList = true

        // Use the our database qa report to know if that order has been completed
        for (let j = 0; j < qaReports.length; j++) {
            if (qaReports[j].itemId == orders[i].id && qaReports[j].status != 0) {
                addToList = false
                break
            }
        }

        if (addToList) {
            const date = new Date(orders[i].deadline)
            orders[i].deadline = moment(date).format('YYYY-MM-DD')
            uncompletedOrders.push(orders[i])
        }

    }

    return uncompletedOrders
}

/**
 * get a list of orders that are completed in the system. All of them
 * @param {string} location - location of the order (DK, LT)
 * @returns [{
 *      id: string(int),
 *      categoryCode: string(int),
 *      quantity: int,
 *      deadline: string(date)
 * }]
 */
module.exports.completedOrders = async (location) => {
    let qaReports = await model.getCompletedQAReports()

    if (qaReports.length == 0) {
        return []
    }

    let orders = await model.getOrdersByIdList(location, listToCommaString(qaReports, 'itemId'))

    for (let i = 0; i < qaReports.length; i++) {

        for (let j = 0; j < orders.length; j++) {
            if (qaReports[i].itemId == orders[j].id) {
                const deadline = new Date(orders[j].deadline)
                orders[j].deadline = moment(deadline).format('YYYY-MM-DD')

                const completionDate = new Date(qaReports[i].completionDate)
                orders[j].completionDate = moment(completionDate).format('YYYY-MM-DD')
            }
        }
    }

    return orders
}

/**
 * convert a list of objects with specified key to a string with comma separated values of that key
 * @param {[]} list - list of objects
 * @param {string} key - key that is in all of the objects 
 * @returns string EX: "1,2,4,5,7"
 */
function listToCommaString(list, key) {
    let stringList = ""
    for (let i = 0; i < list.length; i++) {
        if ((list.length - 1) == i) {
            stringList = stringList + list[i][key].toString()
        } else {
            stringList = stringList + list[i][key].toString() + ","
        }
    }
    return stringList
}

/**
 * get a qa report object of specified order with all of the measurements and information included in it
 * @param {string} id id of the order
 * @param {string} language language that will be preferred for the information retrieved
 * @param {boolean} showAuthors should the order contain the real author names in the answers
 * @param {boolean} getCompleted should the order be completed or released
 * @returns {Promise} Order, its one time measurement and multiple time measurement control points, and answers. Or a response with a message
 */
module.exports.getQAReport = async (id, language, showAuthors, getCompleted) => {
    // Get a detailed item object from konfair database. Returns array of orders that match this id
    let itemData = await model.getOrderInformation(id)

    // If it exists continue process
    if (itemData && itemData.length != 0) {

        // get the first one of the orders. Others dont matter as there should not be more than one order with same id.
        itemData = itemData[0]

        // Check if there exists a QA report for this order
        let qaReport = await model.getReleasedOrderReport(id)

        // Check if the exists a qa report for this or not and its status
        if (!getCompleted && qaReport.length != 0 && qaReport[0].status == 1)
            return { response: 0, message: "Order is completed" }
        else if (getCompleted && qaReport.length != 0 && qaReport[0].status == 0)
            return { response: 0, message: "Order is not completed" }
        else if (getCompleted && qaReport.length == 0)
            return { response: 0, message: "Order has not been initialized and completed" }

        // We cannot expect their database state of released or whatever item to change when the order is
        // finished on our part of the system. So a released order can only be released and completed
        // can be whatever status
        if (!getCompleted && itemData.status != 3) {
            return { response: 0, message: "Order has not been released" }
        }

        let controlPoints = null
        let attributes = null

        // If the qa report doesn't exist and this is not a completed order operation
        // Generate the connections for the control points
        if (qaReport.length == 0 && !getCompleted) {

            // Get all the attributes that belong to this order
            attributes = await model.getReleasedOrderAttributes(id)

            // If the order doesn't have any attributes it is bad.
            if (attributes.length == 0)
                return { response: 0, message: "This order does not have any attributes in it" }


            // Get control points that connect to these attributes and are for this categoryCode
            controlPoints = await model.getSpecificControlPoints(listToCommaString(attributes, 'id'), parseInt(itemData.categoryCode))

            // Get all the attributes and item categories of these control points 
            // Will later validate which one connects to which one
            for (let i = 0; i < controlPoints.length; i++) {
                controlPoints[i].attributes = await model.getControlPointAttributes(controlPoints[i].id)
            }

            let added = []
            // Determine if the control point is applied to tje 
            for (let i = 0; i < controlPoints.length; i++) {

                // If no attributes then it is a general control point for this category
                if (controlPoints[i].attributes.length == 0) {
                    added.push(controlPoints[i])
                    continue;
                }

                attributes:
                for (let j = 0; j < controlPoints[i].attributes.length; j++) {
                    for (let k = 0; k < attributes.length; k++) {
                        // The control point must be linked to at least one attribute
                        if (attributes[k].id == controlPoints[i].attributes[j].id) {
                            // Control point without a range 

                            if (controlPoints[i].attributes[j].maxValue == null && controlPoints[i].attributes[j].minValue == null) {
                                added.push(controlPoints[i])
                                // Break out of both loops using the label
                                break attributes;
                            }

                            // Control point with range which attribute value has to meet
                            if (controlPoints[i].attributes[j].maxValue >= parseFloat(attributes[k].value) &&
                                controlPoints[i].attributes[j].minValue <= parseFloat(attributes[k].value)) {
                                added.push(controlPoints[i])
                                break attributes;
                            }
                        }
                    }
                }
            }

            // Add all of the control point connections to this order
            if (added.length != 0) {
                // Add qa report 
                qaReport = await model.createQAReport(id)
                qaReport = qaReport[0]

                // Add the connections between control point and qa report
                for (let i = 0; i < added.length; i++) {
                    await model.insertControlPointConnection(added[i].id, qaReport.id)
                }

            } else {
                // The order does not have control points that apply to it
                return { response: 0, message: "This order does not have any control points that apply to it" }
            }
            // qa report already exists as well as the connections
        } else {

            qaReport = qaReport[0]

            // Get all the attributes that belong to this order
            attributes = await model.getReleasedOrderAttributes(id)
        }

        // Get the frequency of the category and apply it to the 
        itemData.frequency = await model.getFrequenciesForCategory(parseInt(itemData.categoryCode))
        if (itemData.frequency && itemData.frequency.length != 0)
            itemData.frequency = itemData.frequency[0]
        else
            itemData.frequency = null


        // Fetch all the control points that relate to this qa report. With author anonymity or not
        if (showAuthors) {
            controlPoints = await model.getReleasedOrderControlPointsAuthors(qaReport.id)
        }
        else {
            controlPoints = await model.getReleasedOrderControlPoints(qaReport.id)
        }

        // Get all the attributes and item categories of these control points 
        for (let i = 0; i < controlPoints.length; i++) {
            controlPoints[i].attributes = await model.getControlPointAttributes(controlPoints[i].id)
        }

        // Get all the data for the control point: descriptions, frequency, options
        for (let i = 0; i < controlPoints.length; i++) {
            // Get descriptions for this order
            let descriptions = await model.getReleasedOrderControlPointsDescriptions(controlPoints[i].id)
            // Pick the correct language
            let englishIndex = -1;
            for (let j = 0; j < descriptions.length; j++) {
                if (descriptions[j].language == language)
                    controlPoints[i].description = descriptions[j].description
                // Backup of english
                if (descriptions[j].language == "gb")
                    englishIndex = j
            }

            // Use english if correct langue is not there
            if (controlPoints[i].description == null && englishIndex != -1)
                controlPoints[i].description = descriptions[englishIndex].description


            // Get frequency of the control point
            controlPoints[i].frequency = await model.getFrequencies(controlPoints[i].frequencyId)
            if (controlPoints[i].frequency && controlPoints[i].frequency.length != 0)
                controlPoints[i].frequency = controlPoints[i].frequency[0]
            else
                controlPoints[i].frequency = null

            // Get options if the control poi
            if (controlPoints[i].inputType == 0) {
                controlPoints[i].options = await model.getReleasedOrderControlPointsOptions(controlPoints[i].id)
            }
        }

        // Add correct status based on order being retrieved
        if (getCompleted) {
            itemData.status = "completed"
        } else {
            itemData.status = "incomplete"
        }

        itemData.qaReportId = qaReport.id
        itemData.oneTimeControlPoints = []
        itemData.multipleTimeControlPoints = []

        // Categorize the control points into one time or multiple time

        for (let i = 0; i < controlPoints.length; i++) {

            // Assigns the attribute parameters to the control point
            if (controlPoints[i].attributes.length != 0) {
                loop:
                for (let j = 0; j < controlPoints[i].attributes.length; j++) {
                    for (let k = 0; k < attributes.length; k++) {
                        if (controlPoints[i].attributes[j].id == attributes[k].id) {
                            controlPoints[i].expectedValue = attributes[k].value
                            controlPoints[i].units = attributes[k].units
                            break loop
                        }
                    }
                }
            }

            // Attributes no longer needed after the assigning
            delete controlPoints[i].attributes

            // One time measurement
            if (controlPoints[i].measurementType == 1)
                itemData.oneTimeControlPoints.push(controlPoints[i])
            else
                itemData.multipleTimeControlPoints.push(controlPoints[i])


            // Compute the text shown for the tolerance
            controlPoints[i].toleranceText = ""
            if (controlPoints[i].upperTolerance != null && controlPoints[i].upperTolerance == controlPoints[i].lowerTolerance)
                controlPoints[i].toleranceText = "+/-" + controlPoints[i].upperTolerance + controlPoints[i].units
            else if (controlPoints[i].upperTolerance != null && controlPoints[i].upperTolerance != controlPoints[i].lowerTolerance)
                controlPoints[i].toleranceText = "+" + controlPoints[i].upperTolerance + "/-" + controlPoints[i].lowerTolerance + controlPoints[i].units

            // Compute the options if the control point input type is option
            if (controlPoints[i].inputType == 0) {
                let allUnits = ""

                for (let j = 0; j < controlPoints[i].options.length; j++) {
                    if (j == 0) {
                        allUnits = controlPoints[i].options[j].value
                    } else {
                        allUnits = allUnits + "/" + controlPoints[i].options[j].value
                    }
                }

                controlPoints[i].units = allUnits
                // Assign units of text if input type text
            } else if (controlPoints[i].inputType == 1) {
                controlPoints[i].units = "Text"
            }
        }

        // Character to mark each multiple time control time
        // Will be incremented for other letters in alphabet
        let currentChar = 'a'
        let answersMulti = []
        let frequencyCategoryKey = ""


        // FInd the correct frequency based on the quantity
        if (itemData.quantity <= 25) {
            frequencyCategoryKey = "to25"
        } else if (itemData.quantity <= 50) {
            frequencyCategoryKey = "to50"
        } else if (itemData.quantity <= 100) {
            frequencyCategoryKey = "to100"
        } else if (itemData.quantity <= 200) {
            frequencyCategoryKey = "to200"
        } else if (itemData.quantity <= 300) {
            frequencyCategoryKey = "to300"
        } else if (itemData.quantity <= 500) {
            frequencyCategoryKey = "to500"
        } else if (itemData.quantity <= 700) {
            frequencyCategoryKey = "to700"
        } else if (itemData.quantity <= 1000) {
            frequencyCategoryKey = "to1000"
        } else if (itemData.quantity <= 1500) {
            frequencyCategoryKey = "to1500"
        } else if (itemData.quantity <= 2000) {
            frequencyCategoryKey = "to2000"
        } else if (itemData.quantity <= 4000) {
            frequencyCategoryKey = "to4000"
        } else if (itemData.quantity <= 5000) {
            frequencyCategoryKey = "to5000"
        }


        // Get the list of connections for the multiple time control points
        // These have the answers and the authors to those answers
        let mIdList = listToCommaString(itemData.multipleTimeControlPoints, 'id')
        let mResults = []
        if (mIdList != '') {
            if (showAuthors) {
                mResults = await model.qaReportControlPointResultsAuthors(itemData.qaReportId, mIdList)
            } else {
                mResults = await model.qaReportControlPointResults(itemData.qaReportId, mIdList)
            }
        }

        // let gf = 0
        for (let i = 0; i < itemData.multipleTimeControlPoints.length; i++) {
            // TUrn the character to uppercase
            itemData.multipleTimeControlPoints[i].letter = currentChar.toUpperCase()

            let arrayOfAnswers = []

            // Get the connections that belong to this control point
            let mResultsForControlPoint = []
            for (let j = 0; j < mResults.length; j++) {
                if (mResults[j].controlPointId == itemData.multipleTimeControlPoints[i].id)
                    mResultsForControlPoint.push(mResults[j])
            }

            // Get the correct frequency for this control point
            let assignedFrequency = null
            // If control point freq is not existent then assign the category frequency
            if (itemData.multipleTimeControlPoints[i].frequency == null && itemData.frequency != null)
                assignedFrequency = itemData.frequency[frequencyCategoryKey]
            // If the control point has a frequency 
            else if (itemData.multipleTimeControlPoints[i].frequency != null)
                assignedFrequency = itemData.multipleTimeControlPoints[i].frequency[frequencyCategoryKey]

            // Generate enough rows for this control point as the frequency dictates
            for (let j = 0; j < assignedFrequency; j++) {

                let answer = ""
                let author = ""
                let connectionId = ""

                // Get the first value from answers 
                if (mResultsForControlPoint.length != 0) {
                    answer = mResultsForControlPoint[0].answer
                    author = mResultsForControlPoint[0].author
                    connectionId = mResultsForControlPoint[0].connectionId
                    mResultsForControlPoint.shift() // Remove the first element
                    // If there are no more values then generate some empty ones to fill it up
                } else {
                    // If order doesn't have the needed answers then it is not completed but broken
                    if (getCompleted) {
                        return { response: 0, message: "Order has not been fully initialized and completed" }
                    } else {
                        // Add the thing to the database and give the connectionID to it
                        let insertResponse = await model.insertMultipleTimeMeasurement(itemData.multipleTimeControlPoints[i].id, '', itemData.qaReportId, '')
                        connectionId = insertResponse[0].id
                    }
                }

                // Add the row to the list
                arrayOfAnswers.push(
                    {
                        connectionId: connectionId,
                        id: itemData.multipleTimeControlPoints[i].id,
                        answer: answer,
                        inputType: itemData.multipleTimeControlPoints[i].inputType,
                        author: author
                    })
            }

            // Sort these so that the order stays the same in the ui every time
            arrayOfAnswers.sort((a, b) => (a.connectionId > b.connectionId) ? 1 : -1)

            answersMulti.push(arrayOfAnswers)

            // Get the next character a -> b -> c ...
            currentChar = String.fromCharCode(currentChar.charCodeAt(0) + 1)
        }

        itemData.multipleTimeAnswers = answersMulti

        // Convert the deadline to only have date
        const date = new Date(itemData.deadline)
        itemData.deadline = moment(date).format('YYYY-MM-DD')


        // Clean up the data before sending to reduce size of payload
        delete itemData.frequency
        for (let i = 0; i < itemData.oneTimeControlPoints.length; i++) {
            delete itemData.oneTimeControlPoints[i].frequency
        }
        for (let i = 0; i < itemData.multipleTimeControlPoints.length; i++) {
            delete itemData.multipleTimeControlPoints[i].frequency
        }

        return itemData
    } else {
        return { response: 0, message: "The order does not exist in the database" }
    }
}

/**
 * saves the answers of the passed order
 * @param {Object} editedQAReport - qa report that has changes
 * @param {string} username 
 * @returns {Promise} result of the operation {response, message}
 */
module.exports.saveQAReport = async (editedQAReport, username) => {

    const originalOrder = await module.exports.getQAReport(editedQAReport.id, 'gb', true, false)

    if (originalOrder != null) {
        //Check surface level requirements
        if (
            originalOrder.id == editedQAReport.id &&
            originalOrder.categoryCode == editedQAReport.categoryCode &&
            originalOrder.quantity == editedQAReport.quantity &&
            originalOrder.qaReportId == editedQAReport.qaReportId &&
            originalOrder.status == "incomplete" &&
            originalOrder.oneTimeControlPoints.length == editedQAReport.oneTimeControlPoints.length &&
            originalOrder.multipleTimeControlPoints.length == editedQAReport.multipleTimeControlPoints.length &&
            originalOrder.multipleTimeAnswers.length == editedQAReport.multipleTimeAnswers.length
        ) {
            let match = true

            // Check if there is a match to the amount of answers
            for (let i = 0; i < originalOrder.oneTimeControlPoints.length; i++) {
                if (originalOrder.oneTimeControlPoints[i].id != editedQAReport.oneTimeControlPoints[i].id) {
                    match = false
                }
            }

            for (let i = 0; i < originalOrder.multipleTimeAnswers.length; i++) {
                for (let j = 0; j < originalOrder.multipleTimeAnswers[i].length; j++) {
                    if (originalOrder.multipleTimeAnswers[i][j].id != editedQAReport.multipleTimeAnswers[i][j].id) {
                        match = false
                    }
                }
            }

            if (match) {

                let badValuesPresent = false
                let changesMade = false

                // CHeck the edited qa report for bad values and changed values

                for (let i = 0; i < editedQAReport.oneTimeControlPoints.length; i++) {
                    // Insert The one time measurement

                    if (
                        (
                            editedQAReport.oneTimeControlPoints[i].author != originalOrder.oneTimeControlPoints[i].author &&
                            editedQAReport.oneTimeControlPoints[i].author != 'taken' &&
                            originalOrder.oneTimeControlPoints[i].author != null
                        ) ||
                        editedQAReport.oneTimeControlPoints[i].answer != originalOrder.oneTimeControlPoints[i].answer
                    ) {

                        let inputValidated = false

                        // input is too long

                        if (editedQAReport.oneTimeControlPoints[i].answer == '') {
                            inputValidated = false
                        } else if (editedQAReport.oneTimeControlPoints[i].answer.length > 50) {
                            inputValidated = false
                        }
                        // input is option
                        else if (originalOrder.oneTimeControlPoints[i].inputType == 0) { //Option

                            for (let j = 0; j < originalOrder.oneTimeControlPoints[i].options.length; j++) {
                                if (originalOrder.oneTimeControlPoints[i].options[j].value == editedQAReport.oneTimeControlPoints[i].answer) {
                                    inputValidated = true
                                    break;
                                }
                            }
                        }

                        // input is text
                        else if (originalOrder.oneTimeControlPoints[i].inputType == 1 &&  // Text
                            typeof editedQAReport.oneTimeControlPoints[i].answer === 'string'
                        ) {
                            inputValidated = true
                        }

                        // input is number
                        else if (originalOrder.oneTimeControlPoints[i].inputType == 3 && // Number
                            isNumeric(editedQAReport.oneTimeControlPoints[i].answer) &&
                            Number(editedQAReport.oneTimeControlPoints[i].answer) >= 0
                        ) {
                            inputValidated = true
                        }

                        // Insert if everything is ok
                        if (inputValidated) {
                            changesMade = true
                            await model.alterMeasurement(
                                editedQAReport.oneTimeControlPoints[i].connectionId,
                                editedQAReport.oneTimeControlPoints[i].id,
                                editedQAReport.oneTimeControlPoints[i].answer,
                                editedQAReport.qaReportId,
                                username
                            )
                        } else {
                            badValuesPresent = true
                        }
                    }
                }


                for (let i = 0; i < originalOrder.multipleTimeAnswers.length; i++) {
                    for (let j = 0; j < originalOrder.multipleTimeAnswers[i].length; j++) {
                        // Insert The one time measurement


                        if (
                            (
                                editedQAReport.multipleTimeAnswers[i][j].author != originalOrder.multipleTimeAnswers[i][j].author &&
                                editedQAReport.multipleTimeAnswers[i][j].author != 'taken' &&
                                originalOrder.multipleTimeAnswers[i][j].author != null
                            ) ||
                            editedQAReport.multipleTimeAnswers[i][j].answer != originalOrder.multipleTimeAnswers[i][j].answer
                        ) {

                            let inputValidated = false

                            if (editedQAReport.multipleTimeAnswers[i][j].answer == '') {
                                inputValidated = false
                            } 
                            else if (editedQAReport.multipleTimeAnswers[i][j].answer.length > 50) {
                                inputValidated = false
                            }

                            else if (originalOrder.multipleTimeAnswers[i][j].inputType == 0) { //Option

                                for (let k = 0; k < originalOrder.multipleTimeControlPoints[i].options.length; k++) {
                                    if (originalOrder.multipleTimeControlPoints[i].options[k].value == editedQAReport.multipleTimeAnswers[i][j].answer) {
                                        inputValidated = true
                                        break;
                                    }
                                }
                            }


                            else if (originalOrder.multipleTimeAnswers[i][j].inputType == 1 &&  // Text
                                typeof editedQAReport.multipleTimeAnswers[i][j].answer === 'string'
                            ) {
                                inputValidated = true
                            }


                            else if (originalOrder.multipleTimeAnswers[i][j].inputType == 3 && // Number
                                isNumeric(editedQAReport.multipleTimeAnswers[i][j].answer) &&
                                Number(editedQAReport.multipleTimeAnswers[i][j].answer) >= 0
                            ) {
                                inputValidated = true
                            }

                            if (inputValidated) {
                                changesMade = true
                                model.alterMeasurement(
                                    editedQAReport.multipleTimeAnswers[i][j].connectionId,
                                    editedQAReport.multipleTimeAnswers[i][j].id,
                                    editedQAReport.multipleTimeAnswers[i][j].answer,
                                    editedQAReport.qaReportId,
                                    username,
                                )
                            } else {
                                badValuesPresent = true
                            }
                        }
                    }
                }

                if (changesMade) {
                    if (badValuesPresent) {
                        return { response: 2, message: "Only some data was saved. There were mistakes in input" }

                    } else {
                        return { response: 1, message: "Data saved successfully" }
                    }
                } else {
                    return { response: 2, message: "No changes were made to the data, because no values were updated" }
                }
            } else {
                return { response: 0, message: "Qa report data data does not match database data" }
            }
        } else {
            return { response: 0, message: "Qa report data data does not match database data" }
        }
    } else {
        return { response: 0, message: "Your data does not match what is in the database" }
    }
}

/**
 * Checks if the string is a valid number
 * @param {string} str the string that you want to check if it is a number
 * @returns {boolean} 
 */
function isNumeric(str) {
    if (typeof str != "string") {
        return false // we only process strings!  
    } else {
        // @ts-ignore
        return !isNaN(str) && !isNaN(parseFloat(str))
    }
}

/**
 * Completes the order and 
 * @param {Object} editedQAReport 
 * @param {string} username 
 * @returns {Promise} result of the operation {response, message}
 */
module.exports.completeQAReport = async (editedQAReport, username) => {

    if (
        editedQAReport &&
        editedQAReport.oneTimeControlPoints &&
        editedQAReport.oneTimeControlPoints.length != 0 &&
        editedQAReport.multipleTimeAnswers &&
        editedQAReport.multipleTimeAnswers.length != 0
    ) {

        let qaReportIsFinished = true;

        // Check if all answers are not empty in the qa report
        for (let i = 0; i < editedQAReport.oneTimeControlPoints.length; i++) {
            if (editedQAReport.oneTimeControlPoints[i].answer == '' || editedQAReport.oneTimeControlPoints[i].answer == null) {
                qaReportIsFinished = false
                break;
            }
        }
        check:
        for (let i = 0; i < editedQAReport.multipleTimeAnswers.length; i++) {
            for (let j = 0; j < editedQAReport.multipleTimeAnswers[i].length; j++) {
                if (editedQAReport.multipleTimeAnswers[i][j].answer == '' || editedQAReport.multipleTimeAnswers[i][j].answer == null) {
                    qaReportIsFinished = false
                    break check;
                }
            }
        }

        if (qaReportIsFinished) {
            const result = await module.exports.saveQAReport(editedQAReport, username)



            if (result.response == 1) {
                await model.setQaReportStatusToFinished(
                    editedQAReport.id
                )
                return { response: 1, message: "Data saved and order completed successfully" }
            } else {
                return result
            }
        } else {
            return { response: 0, message: "All qa report fields have to be filled" }
        }
    } else {
        return { response: 0, message: "Data is not valid" }
    }
}