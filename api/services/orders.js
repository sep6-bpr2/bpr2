const model = require("../models/orders")

module.exports.releasedOrders = async (location) => {
    return model.getReleasedOrders(location)
}

module.exports.releasedOrderFull = async (id, language) => {
    // Get general order from the konfair database
    let info = await model.getReleasedOrderInformation(id)
    info = info[0]

    // Check if there exists a QA report for this order
    const qaReport = await model.getReleasedOrderReport(id)

    if (qaReport.length == 0) {
        // Get all control points in the system 

        // Get all the attributes with the values of the order

        // Get all control poins based on the category id and attribute i
        let attibutes = await model.getReleasedOrderAttributes(id)

        // let controlPointsCategory = await model.getByCategory(parseInt(info["Item Category Code"]))
        // let controlPointsCategory = await model.getByCategory(parseInt(info["Item Category Code"]))
        /// IMPROVEMENT - get onlu the control points that already have the attribute connection to the attribute or the item category connection
        let controlPoints = await model.getAllControlPoints()

        // Get all the attributes and item categories of these control points 
        for (let i = 0; i < controlPoints.length; i++) {
            controlPoints[i].attributes = await model.getControlPointAttributes(controlPoints[i].id)
            controlPoints[i].itemCategories = await model.getControlPointCategories(controlPoints[i].id)
        }

        let added = []
        for (let i = 0; i < controlPoints.length; i++) {
            let pass = false

            // All control points should have a item category code
            for (let j = 0; j < controlPoints[i].itemCategories.length; j++) {

                if (controlPoints[i].itemCategories[j].ItemCategoryCode == parseInt(info["Item Category Code"])) {
                    pass = true
                    break;
                }
            }

            if (!pass) {
                continue;
            }

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

        }

        console.log("Hello there")
    }






    // If qa report already exists
    let controlPoints = await model.getReleasedOrderControlPoints(id)

    for (let i = 0; i < controlPoints.length; i++) {
        let descriptions = await model.getReleasedOrderControlPointsDescriptions(id)

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

        controlPoints[i].frequency = await model.getReleasedOrderControlPointsFrequencies(id)
        if (controlPoints[i].type == "option") {
            controlPoints[i].options = await model.getReleasedOrderControlPointsOptions(id)
        }
    }

    info.controlPoints = controlPoints
    return info
}