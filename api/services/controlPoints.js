const controlPointModel = require("../models/controlPoints")

module.exports.getTypes = async () => {
	const allTypes = await controlPointModel.getAllTypes()
	return allTypes.map(obj => {
		switch (obj.type) {
			case 1:
				return "number"
			case 2:
				return "text"
			case 3:
				return "options"
			default:
				return "unknown"
		}
	})
}

module.exports.getAttributes = async () => {
	return await controlPointModel.getAllAttributesNames()
}

module.exports.submitControlPoint = async (cp) => {
	return await controlPointModel.insertControlPoint(cp)
}

module.exports.getFrequenciesOfControlPoint = async (cpId) => {
	return await controlPointModel.getFrequenciesOfControlPoint(cpId)
}

module.exports.controlPointsMinimal = async (language) => {
    let controlPoints = await controlPointModel.getControlPointsMinimal()

    for (let i = 0; i < controlPoints.length; i++) {
        const descriptions = await controlPointModel.getDescriptionsByControlPointId(controlPoints[i].id)
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
