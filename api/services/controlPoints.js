const model = require("../models/controlPoints")

module.exports.controlPointsMinimal = async (language) => {
    let controlPoints = await model.getControlPointsMinimal()

    for (let i = 0; i < controlPoints.length; i++) {
        const descriptions = await model.getDescriptionsByControlPointId(controlPoints[i].id)
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

        // Backup of english
        if (controlPoints[i].description == null && englishIndex != -1) {
            controlPoints[i].description = descriptions[englishIndex].description
        }
    }
    return controlPoints
}