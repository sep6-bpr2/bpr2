const controlPointModel = require("../models/controlPoints")
const mssql = require("../connections/MSSQLConnection");

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
	const nVarchar = mssql.mssql.NVarChar(1000)
	const con = await mssql.localDB().request()
	let sqlString = `
	BEGIN TRANSACTION
		DECLARE @FreqID int;
		INSERT INTO [dbo].[Frequency] VALUES (@val0,@val1,@val2,@val3,@val4,@val5,@val6,@val7,@val8,@val9,@val10,@val11,@val12);
    	SELECT @FreqID = scope_identity();
    	DECLARE @CpID int;
    	INSERT INTO ControlPoint VALUES (@FreqID, @type, @upperTolerance, @lowerTolerance, @image);
    	SELECT @CpID = scope_identity();
    	INSERT INTO Description VALUES (@CpID,'english', @engDescription)
    	INSERT INTO Description VALUES (@CpID,'danish', @dkDescription)
    	INSERT INTO Description VALUES (@CpID,'lithuanian', @ltDescription) `

	cp.frequencies.forEach((entry, index) => {
		con.input(`val${index}`, mssql.mssql.Int, entry.value)
	})
	con.input('upperTolerance', mssql.mssql.Int, cp.upperTolerance)

	con.input('type', nVarchar, cp.type)
	con.input('lowerTolerance', mssql.mssql.Int, cp.lowerTolerance)
	con.input('image', mssql.mssql.NVarChar, cp.image)

	con.input('engDescription', nVarchar, cp.descriptions[0].value)
	con.input('dkDescription', nVarchar, cp.descriptions[1].value)
	con.input('ltDescription', nVarchar, cp.descriptions[2].value)

	if(cp.type === "options"){
		cp.optionValues.forEach((item, index) => {
			sqlString+=`INSERT INTO [Option] VALUES (@option${index}, @CpID); `
			con.input('option'+index, nVarchar, item.value)
		})
	}

	cp.attributes.forEach((item, index) => {
		sqlString+=`INSERT INTO AttributeControlPoint VALUES (@id${index}, @CpID, @min${index}, @max${index}) `
		con.input(`id${index}`, nVarchar, item.id)
		con.input(`min${index}`, nVarchar, item.minValue)
		con.input(`max${index}`, nVarchar, item.maxValue)
	})

	cp.codes.forEach((item, index) => {
		sqlString+=`INSERT INTO ItemCategoryControlPoint VALUES (@code${index}, @CpID) `
		con.input('code'+index, nVarchar, item.value)
	})

	sqlString += `COMMIT`
	return await controlPointModel.insertControlPoint(sqlString, con)
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
