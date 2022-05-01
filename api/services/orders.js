const moment = require("moment")
const model = require("../models/orders")

module.exports.releasedOrders = async (location) => {
    // Get the konfair orders

    // CHECK IF THEY ARE COMPLETED BY QUERYING THE OWN DATABASE
    let orders = await model.getReleasedOrders(location)

    let qaReports = await model.getMultipleQAReports(listToCommaString(orders, 'id'))

    let uncompletedOrders = []
    // Fix date and check if the order is finished
    for (let i = 0; i < orders.length; i++) {
        let addToList = true

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

module.exports.releasedOrderFull = async (id, language) => {
    // Get general order from the konfair database
    let itemData = await model.getReleasedOrderInformation(id)
    if (itemData.length != 0) {
        itemData = itemData[0]

        // Check if there exists a QA report for this order
        let qaReport = await model.getReleasedOrderReport(id)

        if (qaReport.length != 0 && qaReport[0].status == 1) {
            return { result: 0, message: "Order is completed" }
        }

        let controlPoints = null
        let attributes = null

        if (qaReport.length == 0) {
            // Get all the attributes with the values of the order
            attributes = await model.getReleasedOrderAttributes(id)

            controlPoints = await model.getSpecificControlPoints(listToCommaString(attributes, 'id'), parseInt(itemData.categoryCode))

            // Get all the attributes and item categories of these control points 
            for (let i = 0; i < controlPoints.length; i++) {
                controlPoints[i].attributes = await model.getControlPointAttributes(controlPoints[i].id)
            }

            let added = []
            for (let i = 0; i < controlPoints.length; i++) {

                // If no attributes then it is a general control point for category
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

            controlPoints = added

            if (added.length != 0) {
                // Add qa report 
                let report = await model.createQAReport(id)
                report = report[0]
                // Add the connections between control point and qa report
                for (let i = 0; i < added.length; i++) {
                    await model.insertControlPointConnection(added[i].id, report.id)
                }

                qaReport = await model.getReleasedOrderReport(id)
                qaReport = qaReport[0]

            } else {
                return null
            }

        } else {
            qaReport = qaReport[0]

            // Get all the attributes with the values of the order
            attributes = await model.getReleasedOrderAttributes(id)


        }

        controlPoints = await model.getReleasedOrderControlPoints(qaReport.id)

        // Get all the attributes and item categories of these control points 
        for (let i = 0; i < controlPoints.length; i++) {
            if (Array.isArray(controlPoints[i].id)) {
                controlPoints[i].id = controlPoints[i].id[0]
            }
            controlPoints[i].attributes = await model.getControlPointAttributes(controlPoints[i].id)
        }

        for (let i = 0; i < controlPoints.length; i++) {
            controlPoints[i].descriptions = ""
            let descriptions = await model.getReleasedOrderControlPointsDescriptions(controlPoints[i].id)

            let englishIndex = -1;
            for (let j = 0; j < descriptions.length; j++) {
                if (descriptions[j].language == language) {
                    controlPoints[i].description = descriptions[j].description
                }

                // Backup of english
                if (descriptions[j].language == "gb") {
                    englishIndex = j
                }
            }

            if (controlPoints[i].description == null && englishIndex != -1) {
                controlPoints[i].description = descriptions[englishIndex].description
            }

            controlPoints[i].frequency = null
            controlPoints[i].frequency = await model.getReleasedOrderControlPointsFrequencies(controlPoints[i].frequencyId)
            if (controlPoints[i].type == 0) {
                controlPoints[i].options = null
                controlPoints[i].options = await model.getReleasedOrderControlPointsOptions(controlPoints[i].id)
            }
        }

        itemData.status = "incomplete"
        itemData.attributes = attributes
        itemData.qaReportId = qaReport.id
        itemData.controlPoints = controlPoints

        itemData.oneTimeControlPoints = []
        itemData.multipleTimeControlPoints = []

        for (let i = 0; i < itemData.controlPoints.length; i++) {

            if (itemData.controlPoints[i].attributes.length != 0) {

                loop:
                for (let j = 0; j < itemData.controlPoints[i].attributes.length; j++) {
                    for (let k = 0; k < itemData.attributes.length; k++) {
                        if (itemData.controlPoints[i].attributes[j].id == itemData.attributes[k].id) {
                            itemData.controlPoints[i].expectedValue = itemData.attributes[k].value
                            itemData.controlPoints[i].units = itemData.attributes[k].units
                            break loop
                        }
                    }
                }

            }

            itemData.controlPoints[i].image = "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg"

            // One time measurement
            if (itemData.controlPoints[i].controlPointType == 1) {
                itemData.oneTimeControlPoints.push(itemData.controlPoints[i])
            } else {
                itemData.multipleTimeControlPoints.push(itemData.controlPoints[i])
            }

            itemData.controlPoints[i].toleranceText = ""
            if (itemData.controlPoints[i].upperTolerance != null && itemData.controlPoints[i].upperTolerance == itemData.controlPoints[i].lowerTolerance) {
                itemData.controlPoints[i].toleranceText = "+/-" + itemData.controlPoints[i].upperTolerance + itemData.controlPoints[i].units
            } else if (itemData.controlPoints[i].upperTolerance != null && itemData.controlPoints[i].upperTolerance != itemData.controlPoints[i].lowerTolerance) {
                itemData.controlPoints[i].toleranceText = "+" + itemData.controlPoints[i].upperTolerance + "/-" + itemData.controlPoints[i].lowerTolerance + itemData.controlPoints[i].units
            }

            if (itemData.controlPoints[i].type == 0) {
                let allUnits = ""

                for (let j = 0; j < itemData.controlPoints[i].options.length; j++) {
                    if (j == 0) {
                        allUnits = itemData.controlPoints[i].options[j].value
                    } else {
                        allUnits = allUnits + "/" + itemData.controlPoints[i].options[j].value
                    }
                }

                itemData.controlPoints[i].units = allUnits
            } else if (itemData.controlPoints[i].type == 1) {
                itemData.controlPoints[i].units = "Text"
            }
        }

        let currentChar = 'a'

        let asnwersMulti = []

        let frequencyCategoryKey = ""

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

        let mIdList = listToCommaString(itemData.multipleTimeControlPoints, 'id')

        let mResults = []
        if (mIdList != '') {
            mResults = await model.qaReportControlPointResults(itemData.qaReportId, mIdList)
        }



        for (let i = 0; i < itemData.multipleTimeControlPoints.length; i++) {
            itemData.multipleTimeControlPoints[i].letter = currentChar.toUpperCase()



            let arrayOfAnswers = []

            let mResultsForControlPoint = []
            for (let j = 0; j < mResults.length; j++) {
                if (mResults[j].controlPointId == itemData.multipleTimeControlPoints[i].id) {
                    mResultsForControlPoint.push(mResults[j])
                }
            }

            let assignedFrequency = null
            if (itemData.multipleTimeControlPoints[i].frequency == null && itemData.frequency != null) {
                assignedFrequency = itemData.frequency[0][frequencyCategoryKey]
            } else {
                assignedFrequency = itemData.multipleTimeControlPoints[i].frequency[0][frequencyCategoryKey]
            }



            for (let j = 0; j < assignedFrequency; j++) {

                let answer = ""
                let author = ""
                let connectionId = ""

                if (mResultsForControlPoint.length !== 0) {
                    answer = mResultsForControlPoint[0].answer
                    author = mResultsForControlPoint[0].author
                    connectionId = mResultsForControlPoint[0].connectionId
                    mResultsForControlPoint.shift() // Remove the first element
                }

                arrayOfAnswers.push(
                    {
                        connectionId: connectionId,
                        id: itemData.multipleTimeControlPoints[i].id,
                        answer: answer,
                        type: itemData.multipleTimeControlPoints[i].type,
                        author: author
                    })
            }
            asnwersMulti.push(arrayOfAnswers)
            currentChar = String.fromCharCode(currentChar.charCodeAt(0) + 1)
        }

        itemData.multipleTimeAnswers = asnwersMulti

        const date = new Date(itemData.deadline)
        itemData.deadline = moment(date).format('YYYY-MM-DD')

        return itemData
    } else {
        return null
    }

}

module.exports.saveQAReport = async (editedQAReport, username) => {

    const originalOrder = await module.exports.releasedOrderFull(editedQAReport.id, 'gb')

    if (originalOrder != null) {
        //Check surface level requirements
        if (
            originalOrder.id == editedQAReport.id &&
            originalOrder.categoryCode == editedQAReport.categoryCode &&
            originalOrder.quantity == editedQAReport.quantity &&
            originalOrder.qaReportId == editedQAReport.qaReportId &&
            originalOrder.status == "incomplete" &&
            originalOrder.attributes.length == editedQAReport.attributes.length &&
            originalOrder.controlPoints.length == editedQAReport.controlPoints.length &&
            originalOrder.oneTimeControlPoints.length == editedQAReport.oneTimeControlPoints.length &&
            originalOrder.multipleTimeControlPoints.length == editedQAReport.multipleTimeControlPoints.length &&
            originalOrder.multipleTimeAnswers.length == editedQAReport.multipleTimeAnswers.length
        ) {
            let match = true

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

                for (let i = 0; i < editedQAReport.oneTimeControlPoints.length; i++) {
                    // Insert The one time measurement

                    if (editedQAReport.oneTimeControlPoints[i].author != originalOrder.oneTimeControlPoints[i].author ||
                        editedQAReport.oneTimeControlPoints[i].answer != originalOrder.oneTimeControlPoints[i].answer
                    ) {

                        let inputValidated = false

                        if (originalOrder.oneTimeControlPoints[i].type == 0) { //Option

                            for (let j = 0; j < originalOrder.oneTimeControlPoints[i].options.length; j++) {
                                if (originalOrder.oneTimeControlPoints[i].options[j].value == editedQAReport.oneTimeControlPoints[i].answer) {
                                    inputValidated = true
                                    break;
                                }
                            }
                        } else if (originalOrder.oneTimeControlPoints[i].type == 1 &&  // Text
                            typeof editedQAReport.oneTimeControlPoints[i].answer === 'string'
                        ) {
                            inputValidated = true
                        } else if (originalOrder.oneTimeControlPoints[i].type == 3 && // Number
                            isNumeric(editedQAReport.oneTimeControlPoints[i].answer)
                        ) {
                            inputValidated = true
                        } else {
                            badValuesPresent = true
                        }

                        if (inputValidated) {
                            await model.deleteQAReportConnection(editedQAReport.oneTimeControlPoints[i].connectionId)
                            await model.insertOrReplaceOneTimeMeasurement(
                                editedQAReport.oneTimeControlPoints[i].id,
                                editedQAReport.oneTimeControlPoints[i].answer,
                                editedQAReport.qaReportId,
                                username
                            )
                        }
                    }
                }


                for (let i = 0; i < originalOrder.multipleTimeAnswers.length; i++) {
                    for (let j = 0; j < originalOrder.multipleTimeAnswers[i].length; j++) {
                        // Insert The one time measurement
                        if (editedQAReport.multipleTimeAnswers[i][j].author != originalOrder.multipleTimeAnswers[i][j].author ||
                            editedQAReport.multipleTimeAnswers[i][j].answer != originalOrder.multipleTimeAnswers[i][j].answer
                        ) {

                            let inputValidated = false

                            if (originalOrder.multipleTimeAnswers[i][j].type == 0) { //Option

                                for (let k = 0; k < originalOrder.multipleTimeControlPoints[i].options.length; k++) {
                                    if (originalOrder.multipleTimeControlPoints[i].options[k].value == editedQAReport.multipleTimeAnswers[i][j].answer) {
                                        inputValidated = true
                                        break;
                                    }
                                }
                            } else if (originalOrder.multipleTimeAnswers[i][j].type == 1 &&  // Text
                                typeof editedQAReport.multipleTimeAnswers[i][j].answer === 'string'
                            ) {
                                inputValidated = true
                            } else if (originalOrder.multipleTimeAnswers[i][j].type == 3 && // Number
                                isNumeric(editedQAReport.multipleTimeAnswers[i][j].answer)
                            ) {
                                inputValidated = true
                            } else {
                                badValuesPresent = true
                            }

                            if (inputValidated) {
                                await model.deleteQAReportConnection(editedQAReport.multipleTimeAnswers[i][j].connectionId)
                                await model.insertOrReplaceMultipleTimeMeasurement(
                                    editedQAReport.multipleTimeAnswers[i][j].id,
                                    editedQAReport.multipleTimeAnswers[i][j].answer,
                                    editedQAReport.qaReportId,
                                    username,
                                )
                            }
                        }
                    }
                }

                if (badValuesPresent) {
                    return { response: 2, message: "Only some data was saved. There were mistakes in input types. Make sure numbers with a decimal point are with a '.' and not a ','" }

                } else {
                    return { response: 1, message: "Data saved successfully" }
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

function isNumeric(str) {
    if (typeof str != "string") {
        return false // we only process strings!  
    } else {
        return !isNaN(str) && !isNaN(parseFloat(str))
    }
}

module.exports.completeQAReport = async (editedQAReport, username) => {

    if (
        editedQAReport &&
        editedQAReport.oneTimeControlPoints &&
        editedQAReport.oneTimeControlPoints.length != 0 &&
        editedQAReport.multipleTimeAnswers &&
        editedQAReport.multipleTimeAnswers.length != 0
    ) {

        let qaReportIsFinished = true;

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