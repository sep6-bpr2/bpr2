const model = require("../models/controlPoints")
const createControlPointModel = require("../models/createControlPoint")

const fs = require('fs')

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

function saveImage(baseImage) {
    /*path of the folder where your project is saved. (In my case i got it from config file, root path of project).*/
    let path = __dirname.split('\\')
    let localPath = ""
    for (let i = 0; i < path.length - 1; i++) {
        localPath += path[i] + "\\"
    }
    localPath += "pictures\\"

    //Find extension of file
    const ext = baseImage.substring(baseImage.indexOf("/") + 1, baseImage.indexOf(";base64"));
    const fileType = baseImage.substring("data:".length, baseImage.indexOf("/"));

    //Forming regex to extract base64 data of file.
    const regex = new RegExp(`^data:${fileType}\/${ext};base64,`, 'gi');

    //Extract base64 data.
    const base64Data = baseImage.replace(regex, "");
    const rand = Math.ceil(Math.random() * 1000);

    //Random photo name with timeStamp so it will not overide previous images.
    const filename = `File${Date.now()}${rand}.${ext}`;

    fs.writeFileSync(localPath + filename, base64Data, 'base64');
    return filename
}

module.exports.saveImage = async (base64) => {
    saveImage(base64)
}

module.exports.createConrolPoint = async (cp) => {
    cp.image = saveImage(cp.image)
    return await createControlPointModel.insertControlPoint(cp)
}