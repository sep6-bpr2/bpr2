const controlPointModel = require("../models/controlPoints")
const mssql = require("../connections/MSSQLConnection");
const fs = require('fs')

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


module.exports.getTypes = async () => {
	const allTypes = await controlPointModel.getAllTypes()
	return allTypes.map(obj => {
		return typeSwitchToText(obj.type)
	})
}

module.exports.getAttributes = async () => {
	return await controlPointModel.getAllAttributesNames()
}

module.exports.getControlPointData = async (cpId) => {
	let mainInformation = await controlPointModel.getControlMainInformation(cpId)
	if(mainInformation.length === 0){
		return {message: `control point with id: ${cpId} does not exist in database`}
	}
	mainInformation = mainInformation[0]
	mainInformation.inputtype = typeSwitchToText(mainInformation.inputtype)

	const descriptions = await controlPointModel.getControlPointDescriptions(cpId)
	const attributes = await controlPointModel.getControlPointAttributes(cpId)
	const categoryCodes = await controlPointModel.getControlPointItemCategoryCodes(cpId)
	const optionValues = await controlPointModel.getControlPointOptionValues(cpId)
	const frequencies = await controlPointModel.getFrequenciesOfControlPoint(cpId)

	const frequency = await controlPointModel.getControlPointFrequency(mainInformation.frequencyId)
	const result = {
		mainInformation: mainInformation,
		descriptions: descriptions,
		optionValues: optionValues,
		attributes: attributes,
		categoryCodes: categoryCodes,
		frequencies
	}
	return result
}

module.exports.updateControlPoint = async (data) => {
	let mainInformation = await controlPointModel.getControlMainInformation(data.controlPointId)
	if(mainInformation.length === 0){
		return {message: `control point with id: ${cpId} does not exist in database`}
	}

	data.type = typeSwitchToNumber(data.type)
	if (data.image != null && !data.image.includes('File')) {
		if(mainInformation[0].image!=null){
			let path = __dirname.split('\\')
			let localPath = ""
			for (let i = 0; i < path.length - 1; i++) {
				localPath += path[i] + "\\"
			}
			localPath += `pictures\\${mainInformation[0].image}`
			try {
				fs.unlinkSync(localPath)
			} catch(err) {
				console.error(err)
			}
		}
		data.image = saveImage(data.image)
	}
	await controlPointModel.updateControlMainInformation(data)

	await controlPointModel.updateControlPointFrequency(data.controlPointId, data.frequencies)

	data.descriptions.forEach(async desc => {
		await controlPointModel.updateControlPointDescription(data.controlPointId, desc.lang.toLowerCase(), desc.value)
	})

	//options
	await controlPointModel.deleteControlPointOptionValues(data.controlPointId)
	data.optionValues.forEach(async obj => {
		await controlPointModel.insertControlPointOptionValue(data.controlPointId, obj.value)
	})
	//attributes
	await controlPointModel.deleteControlPointAttributes(data.controlPointId)
	data.attributes.forEach(async obj => {
		await controlPointModel.insertControlPointAttributes(data.controlPointId, obj.id, obj.minValue, obj.maxValue)
	})
	//codes
	await controlPointModel.deleteControlPointItemCategoryCodes(data.controlPointId)
	data.codes.forEach(async obj => {
		await controlPointModel.insertControlPointItemCategoryCodes(data.controlPointId, obj.value)
	})

	return {}
}

module.exports.submitControlPoint = async (cp) => {
	if (cp.image != null) {
		cp.image = saveImage(cp.image)
	}
	const nVarchar = mssql.mssql.NVarChar(1000)
	const con = await mssql.localDB().request()
	let sqlString = `
	BEGIN TRANSACTION
		DECLARE @FreqID int;
		INSERT INTO [dbo].[Frequency] VALUES (@val0,@val1,@val2,@val3,@val4,@val5,@val6,@val7,@val8,@val9,@val10,@val11,@val12);
    	SELECT @FreqID = scope_identity();
    	DECLARE @CpID int;
    	INSERT INTO ControlPoint VALUES (@FreqID, @image, @upperTolerance, @lowerTolerance, @type, @measurementType );
    	SELECT @CpID = scope_identity();
    	INSERT INTO Description VALUES (@CpID,'english', @engDescription)
    	INSERT INTO Description VALUES (@CpID,'danish', @dkDescription)
    	INSERT INTO Description VALUES (@CpID,'lithuanian', @ltDescription) `

	cp.frequencies.forEach((entry, index) => {
		con.input(`val${index}`, mssql.mssql.Int, entry.value)
	})

	cp.type = typeSwitchToNumber(cp.type)
	con.input('type', mssql.mssql.Int, cp.type)
	con.input('measurementType', mssql.mssql.Int, cp.measurementType)

	con.input('upperTolerance', mssql.mssql.Int, cp.upperTolerance)
	con.input('lowerTolerance', mssql.mssql.Int, cp.lowerTolerance)
	con.input('image', mssql.mssql.NVarChar, cp.image)

	con.input('engDescription', nVarchar, cp.descriptions[0].value)
	con.input('dkDescription', nVarchar, cp.descriptions[1].value)
	con.input('ltDescription', nVarchar, cp.descriptions[2].value)
	if (cp.type == 0) {
		cp.optionValues.forEach((item, index) => {
			sqlString += `INSERT INTO [Option] (controlPointId, value )
						  VALUES (@CpID, @option${index}); `
			con.input('option' + index, nVarchar, item.value)
		})
	}

	cp.attributes.forEach((item, index) => {
		sqlString += `INSERT INTO AttributeControlPoint
					  VALUES (@id${index}, @CpID, @min${index}, @max${index}) `
		con.input(`id${index}`, nVarchar, item.id)
		con.input(`min${index}`, nVarchar, item.minValue)
		con.input(`max${index}`, nVarchar, item.maxValue)
	})

	cp.codes.forEach((item, index) => {
		sqlString += `INSERT INTO ItemCategoryControlPoint
					  VALUES (@code${index}, @CpID) `
		con.input('code' + index, nVarchar, item.value)
	})

	sqlString += ` COMMIT`
	return await controlPointModel.insertControlPoint(sqlString, con)
}

module.exports.getFrequenciesOfControlPoint = async (cpId) => {
	return await controlPointModel.getFrequenciesOfControlPoint(cpId)
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

module.exports.controlPointsMinimal = async (language, offset, limit) => {
	return controlPointModel.getControlPointsMinimal(language, offset, limit)
}
