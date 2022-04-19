const model = require("../models/orders")

module.exports.releasedOrders = async (location) => {
    return model.getReleasedOrders(location)
}

module.exports.releasedOrderFull = async (id, language) => {
    // Get general order from the konfair database
    let info = await model.getReleasedOrderInformation(id)
    info = info[0]

    // Check if there exists a QA report for this order
    let qaReport = await model.getReleasedOrderReport(id)

    if (qaReport.length == 0) {
        // Get all the attributes with the values of the order
        let attibutes = await model.getReleasedOrderAttributes(id)

        let attributeListStringForm = ""
        for (let i = 0; i < attibutes.length; i++) {
            if ((attibutes.length - 1) == i) {
                attributeListStringForm = attributeListStringForm + attibutes[i].ID.toString()
            } else {
                attributeListStringForm = attributeListStringForm + attibutes[i].ID.toString() + ","
            }
        }

        let controlPoints = await model.getSpecificControlPoints(attributeListStringForm, parseInt(info["Item Category Code"]))

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
                for (let k = 0; k < attibutes.length; k++) {
                    // The control point must be linked to at least one attribute
                    if (attibutes[k].ID == controlPoints[i].attributes[j].attributeId) {
                        // Control point without a range 
                        if (controlPoints[i].attributes[j].maxValue == null && controlPoints[i].attributes[j].minValue == null) {
                            added.push(controlPoints[i])
                            // Break out of both loops using the label
                            break attributes;
                        }

                        // Control point with range which attribute value has to meet
                        if (controlPoints[i].attributes[j].maxValue >= parseFloat(attibutes[k].Value) &&
                            controlPoints[i].attributes[j].minValue <= parseFloat(attibutes[k].Value)) {
                            added.push(controlPoints[i])
                            break attributes;
                        }
                    }
                }
            }
        }

        if (added.length != 0) {
            // Add qa report 
            let report = await model.createQAReport(id)
            report = report[0]
            // Add the connections between control point and qa report
            for (let i = 0; i < added.length; i++) {
                await model.insertControlPointConnection(added[i].id, report.id)
            }

            qaReport = await model.getReleasedOrderReport(id)

        } else {
            return null
        }
    }

    qaReport = qaReport[0]

    // Once qa report already exists
    let controlPoints = await model.getReleasedOrderControlPoints(qaReport.id)

    for (let i = 0; i < controlPoints.length; i++) {
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

        controlPoints[i].frequency = await model.getReleasedOrderControlPointsFrequencies(controlPoints[i].frequencyId)
        if (controlPoints[i].type == 0) {
            controlPoints[i].options = await model.getReleasedOrderControlPointsOptions(controlPoints[i].id)
        }
    }

    info.qaReportId = qaReport.id
    info.controlPoints = controlPoints
    return info
}