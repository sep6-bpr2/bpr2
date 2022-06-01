const controlPointModel = require("../models/controlPoints")
const itemCategoryModel = require("../models/itemCategory")

const mssql = require("../connections/MSSQLConnection");
const fs = require('fs')
const frequency = require("../../shared/frequency");

const typeSwitchToText = (value) => {
    switch (value) {
        case 3:
            return "number"
        case 1:
            return "text"
        case 0:
            return "options"
    }
}
const typeSwitchToNumber = (value) => {
    switch (value) {
        case "number":
            return 3
        case "text":
            return 1
        case "options":
            return 0
    }
}

const deletePicture = (pictureName) => {
	let path = __dirname.split('\\')
	let localPath = ""
	for (let i = 0; i < path.length - 1; i++) {
		localPath += path[i] + "\\"
	}
	localPath += `pictures\\${pictureName}`
	try {
		fs.unlinkSync(localPath)
	} catch(err) {
		console.error(err)
	}
}


module.exports.getTypes = async () => {
    const allTypes = await controlPointModel.getAllTypes()
    return allTypes.map(obj => {
        return typeSwitchToText(obj.type)
    })
}

module.exports.getAttributes = async () => {
    return controlPointModel.getAllAttributesNames()
}

module.exports.deleteControlPoint = async (controlPointNumber) => {
	let mainInformation = await controlPointModel.getControlMainInformation(controlPointNumber)
	if(mainInformation.length === 0){
		return {message: `control point with id: ${controlPointNumber} does not exist in database`}
	}

	if(mainInformation[0].frequencyid != null){
        await itemCategoryModel.expireOldFrequency(mainInformation[0].frequencyId)
	}

    await controlPointModel.expireControlPoint(controlPointNumber)
    await controlPointModel.expireDescriptionsForControlPoint(controlPointNumber)
    await controlPointModel.expireAttributesForControlPoint(controlPointNumber)
    await controlPointModel.expireOptionsForControlPoint(controlPointNumber)
    await controlPointModel.expireCategoryCodesForControlPoint(controlPointNumber)

	return {}
}

module.exports.getControlPointData = async (controlPointNumber, username) => {
    let mainInformation = await controlPointModel.getControlMainInformation(parseInt(controlPointNumber))
    if (mainInformation.length === 0) {
        return { message: `control point with id: ${controlPointNumber} does not exist in database` }
    }

    mainInformation = mainInformation[0]
		mainInformation.inputtype = typeSwitchToText(mainInformation.inputtype)

    const descriptions = await controlPointModel.getControlPointDescriptions(parseInt(controlPointNumber))
    let attributes = await controlPointModel.getControlPointAttributes(parseInt(controlPointNumber))
    const categoryCodes = await controlPointModel.getControlPointItemCategoryCodes(parseInt(controlPointNumber))
    const optionValues = await controlPointModel.getControlPointOptionValues(parseInt(controlPointNumber))
    const frequencies = await controlPointModel.getFrequenciesOfControlPoint(parseInt(controlPointNumber))

    for(let i = 0; i< attributes.length; i++){
        let date = await controlPointModel.getAttributeType(attributes[i].attributeId)
        attributes[i].type = date[0].type
    }

	let cpData = {
		allMeasurementTypes: [{name: "one time", value: 1}, {name: "multiple times", value: 0}],
		defaultFrequency: frequency.defaultFrequency(),
		frequencies: null,
		descriptions: [{lang: "English", value: ""}, {lang: "Danish", value: ""}, {lang: "Lithuanian", value: ""}],
		measurementType: null,
		frequencyNumber:0,
		type: null,
		upperTolerance: null,
		lowerTolerance: null,
		optionValues: mainInformation.inputtype === "options" ? [] : [{value: null}, {value: null}],// {value: '',}
		attributes: [],//{id: '', minValue: 0, maxValue: 0}
		codes: [],
		image: null,
		imagePreview: null,
	}

	cpData.frequencies = frequencies[0]
	let eng = descriptions.find(o => o.language.toLowerCase() === "english")
	cpData.descriptions[0].value = eng.description
	let dk = descriptions.find(o => o.language.toLowerCase() === "danish")
	cpData.descriptions[1].value = dk.description
	let lt = descriptions.find(o => o.language.toLowerCase() === "lithuanian")
	cpData.descriptions[2].value = lt.description


	// main info
	cpData.controlPointNumber = mainInformation.controlPointNumber
	cpData.measurementType =  mainInformation.measurementtype
	cpData.frequencyNumber = mainInformation.frequencyNumber

	if (mainInformation.image != null) {
		cpData.imagePreview = `http://localhost:3000/api/controlPoints/picture/${username}/${mainInformation.image}`
		cpData.image = mainInformation.image
	}

	//type and values based on options
	cpData.type = mainInformation.inputtype
	if (mainInformation.inputtype === "options") {
		for (let i = 0; i < optionValues.length; i++) {
			cpData.optionValues.push({value: null})
			cpData.optionValues[i].value =  optionValues[i].value
		}
	} else if (mainInformation.inputtype === "number") {
		cpData.upperTolerance = mainInformation.uppertolerance
		cpData.lowerTolerance = mainInformation.lowertolerance
	}
	console.log(attributes)
	//attributes
	let att = attributes
	if (att.length > 0) {
		for (let i = 0; i < att.length; i++) {
			cpData.attributes.push({id: '', minValue: null, maxValue: null})
			cpData.attributes[i].id = att[i].attributeId
			cpData.attributes[i].minValue = att[i].minValue
			cpData.attributes[i].maxValue = att[i].maxValue
			cpData.attributes[i].type = att[i].type
		}
	}
	console.log(cpData.attributes)
	//codes
	categoryCodes.forEach(o => cpData.codes.push({value: o.itemCategoryCode}))

	return cpData
}

module.exports.updateControlPoint = async (data) => {

    let mainInformation = await controlPointModel.getControlMainInformation(data.controlPointNumber)
    if (mainInformation.length === 0) {
        return { message: `control point with id: ${data.controlPointNumber} does not exist in database` }
    }

    data.type = typeSwitchToNumber(data.type)
    if (data.image != null && !data.image.includes('File')) {
        if (mainInformation[0].image != null) {
            let path = __dirname.split('\\')
            let localPath = ""
            for (let i = 0; i < path.length - 1; i++) {
                localPath += path[i] + "\\"
            }
            localPath += `pictures\\${mainInformation[0].image}`
            try {
                fs.unlinkSync(localPath)
            } catch (err) {
                console.error(err)
            }
        }
        data.image = saveImage(data.image)
    }

    // Expire old frequency
    // Insert new frequency
    let oldControlPoint = await controlPointModel.getControlMainInformation(data.controlPointNumber)
    oldControlPoint = oldControlPoint[0]

    if(data.frequencies == null && oldControlPoint.frequencyId != null){
        await itemCategoryModel.expireOldFrequency(oldControlPoint.frequencyId)
    }else if(data.frequencies != null && oldControlPoint.frequencyId != null && oldControlPoint.frequencyId == data.frequencyId) {
		await itemCategoryModel.expireOldFrequency(data.frequencyId)
        await itemCategoryModel.insertFrequency({
			frequencyNumber: data.frequencyId,
			to25: data.frequencies.to25,
			to50: data.frequencies.to50,
			to100: data.frequencies.to100,
			to200: data.frequencies.to200,
			to300: data.frequencies.to300,
			to500: data.frequencies.to500,
			to700: data.frequencies.to700,
			to1000: data.frequencies.to1000,
			to1500: data.frequencies.to1500,
			to2000: data.frequencies.to2000,
			to3000: data.frequencies.to3000,
			to4000: data.frequencies.to4000,
			to5000: data.frequencies.to5000
        })
    }else if(data.frequencyId == null && oldControlPoint.frequencyId == null && data.frequencies != null){
        const latestFrequencyNumber = await itemCategoryModel.getLatestFrequencyNumber()
        data.frequencyId = latestFrequencyNumber
        await itemCategoryModel.insertFrequency({
            frequencyNumber: data.frequencyId,
            to25: data.frequencies.to25,
            to50: data.frequencies.to50,
            to100: data.frequencies.to100,
            to200: data.frequencies.to200,
            to300: data.frequencies.to300,
            to500: data.frequencies.to500,
            to700: data.frequencies.to700,
            to1000: data.frequencies.to1000,
            to1500: data.frequencies.to1500,
            to2000: data.frequencies.to2000,
            to3000: data.frequencies.to3000,
            to4000: data.frequencies.to4000,
            to5000: data.frequencies.to5000
        })
    }

    // Expire control point
    await controlPointModel.expireControlPoint(data.controlPointNumber)
    // Insert new control point
    await controlPointModel.insertControlPointNEW(
        data.controlPointNumber,
        data.frequencyId,
        data.image,
        data.upperTolerance,
        data.lowerTolerance,
        data.type,
        data.measurementType
    )

    // Expire all descriptions for this
    await controlPointModel.expireDescriptionsForControlPoint(data.controlPointNumber)
    // Insert new descriptions
    data.descriptions.forEach(async desc => {
        await controlPointModel.insertDescription(data.controlPointNumber, desc.lang.toLowerCase(), desc.value)
    })

    //options
    // expire all options
    await controlPointModel.expireOptionsForControlPoint(data.controlPointNumber)
    // insert new options
    data.optionValues.forEach(async obj => {
        await controlPointModel.insertOption(data.controlPointId, obj.value)
    })

    //attributes
    //Epxire all attributes
    await controlPointModel.expireAttributesForControlPoint(data.controlPointNumber)
    // Insert new attributes
    // await controlPointModel.deleteControlPointAttributes(data.controlPointId)
    data.attributes.forEach(async obj => {
        await controlPointModel.insertControlPointAttribute(data.controlPointId, obj.id, obj.minValue, obj.maxValue)
    })

    //codes
    // Expire all codes
    await controlPointModel.expireCategoryCodesForControlPoint(data.controlPointNumber)
    // Insert new codes
    // await controlPointModel.deleteControlPointItemCategoryCodes(data.controlPointId)
    data.codes.forEach(async obj => {
        await controlPointModel.insertControlPointItemCategoryCode(data.controlPointId, obj.value)
    })

    return {}
}

module.exports.submitControlPoint = async (cp) => {
    if (cp.image != null) {
        cp.image = saveImage(cp.image)
    }

    let insertFrequencyString = ''
	const con = await (await mssql.localDB()).request()
	if(cp.frequencies !== null){
		Object.entries(cp.frequencies).forEach((frequency,index) => {
			let value = frequency[1]
			con.input(`val${index}`, mssql.mssql.Int, value)
		})

		insertFrequencyString=`
            INSERT INTO [dbo].[Frequency]
            (frequencyNumber, to25, to50, to100, to200, to300, to500, to700, to1000, to1500, to2000, to3000, to4000, to5000, validFrom)
            VALUES
            (@frequencyNumber, @val0,@val1,@val2,@val3,@val4,@val5,@val6,@val7,@val8,@val9,@val10,@val11,@val12, GETDATE());
        `
	}

    const latestControlPointNumber = await controlPointModel.getLatestControlPointNumber()
    const latestFrequencyNumber = await itemCategoryModel.getLatestFrequencyNumber()

    let sqlString = `
    BEGIN TRANSACTION
        ${insertFrequencyString}

        INSERT INTO [Description] (controlPointId, language, description, validFrom) values (@controlPointNumber,'english', @engDescription, GETDATE())
        INSERT INTO [Description] (controlPointId, language, description, validFrom) values (@controlPointNumber,'danish', @dkDescription, GETDATE())
        INSERT INTO [Description] (controlPointId, language, description, validFrom) values (@controlPointNumber,'lithuanian', @ltDescription, GETDATE())

        INSERT INTO ControlPoint
        (frequencyid, controlPointNumber, image, upperTolerance, lowerTolerance, inputType, measurementType, validFrom)
        VALUES (@frequencyNumber, @controlPointNumber, @image, @upperTolerance, @lowerTolerance, @type, @measurementType, GETDATE());
    `

    cp.type = typeSwitchToNumber(cp.type)
    con.input('type', mssql.mssql.Int, cp.type)
    con.input('measurementType', mssql.mssql.Int, cp.measurementType)
    con.input('upperTolerance', mssql.mssql.Float, cp.upperTolerance)
    con.input('lowerTolerance', mssql.mssql.Float, cp.lowerTolerance)
    con.input('image', mssql.mssql.NVarChar, cp.image)
    con.input('controlPointNumber', mssql.mssql.Int, latestControlPointNumber)
    if(cp.frequencies !== null){
        con.input('frequencyNumber', mssql.mssql.Int, latestFrequencyNumber)
    }else{
        con.input('frequencyNumber', mssql.mssql.Int, null)
    }

    con.input('engDescription', mssql.mssql.NVarChar, cp.descriptions[0].value)
    con.input('dkDescription', mssql.mssql.NVarChar, cp.descriptions[1].value)
    con.input('ltDescription', mssql.mssql.NVarChar, cp.descriptions[2].value)
    if (cp.type == 0) {
        cp.optionValues.forEach((item, index) => {
            sqlString += `INSERT INTO [Option] (controlPointId, value, validFrom )
						  VALUES (@controlPointNumber, @option${index}, GETDATE()); `
            con.input('option' + index, mssql.mssql.NVarChar, item.value)
        })
    }

    cp.attributes.forEach((item, index) => {
        sqlString += `INSERT INTO AttributeControlPoint (attributeId, controlPointId, minValue, maxValue, validFrom)
					  VALUES (@id${index}, @controlPointNumber, @min${index}, @max${index}, GETDATE()); `
        con.input(`id${index}`, mssql.mssql.NVarChar, item.id)
        con.input(`min${index}`, mssql.mssql.NVarChar, item.minValue)
        con.input(`max${index}`, mssql.mssql.NVarChar, item.maxValue)
    })

    cp.codes.forEach((item, index) => {
        sqlString += `INSERT INTO ItemCategoryControlPoint (itemCategoryCode, controlPointId, validFrom)
					  VALUES (@code${index}, @controlPointNumber, GETDATE()); `
        con.input('code' + index, mssql.mssql.NVarChar, item.value)
    })
    sqlString += ' COMMIT'
    return controlPointModel.insertControlPoint(sqlString, con)
}

module.exports.getFrequenciesOfControlPoint = async (cpId) => {
    return controlPointModel.getFrequenciesOfControlPoint(cpId)
}

function saveImage(baseImage) {
    /*path of the folder where your project is saved. (In my case i got it from config file, root path of project).*/
    let path = __dirname.split('\\')
    let localPath = ""

    if(process.env.PICTURE_STORAGE_LOCATION == null) {
        for (let i = 0; i < path.length - 1; i++) {
            localPath += path[i] + "\\"
        }
        localPath += "pictures\\"
    }else{
        localPath = process.env.PICTURE_STORAGE_LOCATION + "\\"
    }

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

module.exports.controlPointsMinimal = async (language, offset, limit) => {
    return controlPointModel.getControlPointsMinimal(language, offset, limit)
}
