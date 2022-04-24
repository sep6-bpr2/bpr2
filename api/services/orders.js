const model = require("../models/orders")

module.exports.releasedOrders = async (location) => {
    // Get the konfair orders
    return model.getReleasedOrders(location)
}

module.exports.releasedOrderFull = async (id, language) => {
    // Get general order from the konfair database
    let itemData = await model.getReleasedOrderInformation(id)
    itemData = itemData[0]

    // Check if there exists a QA report for this order
    let qaReport = await model.getReleasedOrderReport(id)

    let controlPoints = null
    let attributes = null

    if (qaReport.length == 0) {
        // Get all the attributes with the values of the order
        attributes = await model.getReleasedOrderAttributes(id)

        let attributeListStringForm = ""
        for (let i = 0; i < attributes.length; i++) {
            if ((attributes.length - 1) == i) {
                attributeListStringForm = attributeListStringForm + attributes[i].id.toString()
            } else {
                attributeListStringForm = attributeListStringForm + attributes[i].id.toString() + ","
            }
        }

        controlPoints = await model.getSpecificControlPoints(attributeListStringForm, parseInt(itemData.categoryCode))

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

        controlPoints = await model.getReleasedOrderControlPoints(qaReport.id)

        // Get all the attributes and item categories of these control points 
        for (let i = 0; i < controlPoints.length; i++) {
            controlPoints[i].attributes = await model.getControlPointAttributes(controlPoints[i].id)
        }
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
        controlPoints[i].controlPointType = 1
    }
    itemData.attributes = attributes
    itemData.qaReportId = qaReport.id
    itemData.controlPoints = controlPoints

    return itemData
}