const {mssql, konfairDB, localDB} = require('../connections/MSSQLConnection')
// need to take this to some static file

module.exports.getAllTypes = async () => {
	const result = await konfairDB()
		.request()
		.query(`SELECT type
				from [KonfAir DRIFT$Item Attribute]
				GROUP BY type`)
	return result.recordset
}
module.exports.getFrequenciesOfControlPoint = async (controlPointNumber) => {
	const result = await localDB()
		.request()
        .input("controlPointNumber", mssql.Int, controlPointNumber)
		.query(`
            select [to25], [to50], [to100], [to200], [to300], [to500],
					[to700], [to1000], [to1500], [to2000], [to3000], [to4000],
					[to5000]
            from [dbo].[ControlPoint] C 
            JOIN [dbo].[Frequency] F on C.frequencyId = F.id
            where C.controlPointNumber = @controlPointNumber AND F.validFrom < GETDATE() AND F.validTo IS NULL
		`)
	return result.recordset
}


module.exports.getAllAttributesNames = async () => {
	const result = await konfairDB()
		.request()
		.query(`SELECT id, name
				from [KonfAir DRIFT$Item Attribute]`)
	return result.recordset
}

module.exports.getControlMainInformation = async (controlPointNumber) => {
	const result = await localDB()
		.request()
		.input('controlPointNumber', mssql.Int, controlPointNumber)
		.query(`
            SELECT 
            frequencyid, 
            controlPointNumber,
            image, 
            uppertolerance, 
            lowertolerance, 
            inputtype, 
            measurementtype
			FROM ControlPoint
			WHERE controlPointNumber = @controlPointNumber AND validFrom < GETDATE() AND validTo IS NULL 
        `)

	return result.recordset
}


module.exports.getControlPointDescriptions = async (controlPointNumber) => {
	const result = await localDB()
		.request()
		.input('controlPointNumber', mssql.Int, controlPointNumber)
		.query(`
            SELECT language, description
            FROM Description
            WHERE Description.controlPointId = @controlPointNumber AND validFrom < GETDATE() AND validTo IS NULL 
        `)

	return result.recordset
}

module.exports.getControlPointOptionValues = async (controlPointNumber) => {
	const result = await localDB()
		.request()
		.input('controlPointNumber', mssql.Int, controlPointNumber)
		.query(`
            SELECT value
            FROM [Option]
            WHERE [Option].controlPointId = @controlPointNumber AND validFrom < GETDATE() AND validTo IS NULL 
        `)

	return result.recordset
}

module.exports.getControlPointAttributes = async (controlPointNumber) => {
	const result = await localDB()
		.request()
		.input('controlPointNumber', mssql.Int, controlPointNumber)
		.query(`
            SELECT attributeId, minValue, maxValue
            FROM [dbo].[AttributeControlPoint]
            WHERE controlPointId = @controlPointNumber AND validFrom < GETDATE() AND validTo IS NULL 
            `)

	return result.recordset
}

module.exports.getControlPointItemCategoryCodes = async (controlPointNumber) => {
	const result = await localDB()
		.request()
		.input('controlPointNumber', mssql.Int, controlPointNumber)
		.query(`
            SELECT itemCategoryCode
            FROM [dbo].[ItemCategoryControlPoint]
            WHERE controlPointId = @controlPointNumber AND validFrom < GETDATE() AND validTo IS NULL
        `)

	return result.recordset
}

module.exports.updateControlMainInformation = async (data) => {
	const result = await localDB()
		.request()
		.input('CpId', mssql.Int, data.controlPointId)
		.input('image', mssql.NVarChar, data.image)
		.input('upperTolerance', mssql.Int, data.upperTolerance)
		.input('lowerTolerance', mssql.Int, data.lowerTolerance)
		.input('inputType', mssql.Int, data.type)
		.input('measurementType', mssql.Int, data.measurementType)
		.query(`UPDATE ControlPoint
				SET image           = @image,
					uppertolerance  = @upperTolerance,
					lowertolerance  = @lowerTolerance,
					inputtype       = @inputType,
					measurementtype = @measurementType
				WHERE id = @CpId`)

	return result.recordset
}

module.exports.insertControlPointNEW = async (controlPointNumber, frequencyId, image, upperTolerance, lowerTolerance, inputType, measurementType) => {
	const result = await localDB()
		.request()
		.input('controlPointNumber', mssql.Int, controlPointNumber)
		.input('frequencyId', mssql.Int, frequencyId)
		.input('image', mssql.NVarChar, image)
		.input('upperTolerance', mssql.Int, upperTolerance)
		.input('lowerTolerance', mssql.Int, lowerTolerance)
		.input('inputType', mssql.Int, inputType)
		.input('measurementType', mssql.Int, measurementType)
		.query(`
            insert into ControlPoint 
            (controlPointNumber, validFrom, frequencyId, image, inputType, upperTolerance, lowerTolerance, measurementType) 
            values 
            (@controlPointNumber ,GETDATE(), @frequencyId, @image, @inputType, @upperTolerance, @lowerTolerance, @measurementType)
        `)

	return result.recordset
}

module.exports.expireControlPoint = async (controlPointNumber) => {
    await localDB()
        .request()
        .input("controlPointNumber", mssql.Int, controlPointNumber)
        .query(`
            update [dbo].[ControlPoint] 
            set validTo = GETDATE()
            where controlPointNumber = @controlPointNumber and validTo IS NULL
        `)
}

module.exports.expireDescriptionsForControlPoint = async (controlPointNumber) => {
    await localDB()
        .request()
        .input("controlPointNumber", mssql.Int, controlPointNumber)
        .query(`
            update [dbo].[Description] 
            set validTo = GETDATE()
            where controlPointId = @controlPointNumber and validTo IS NULL
        `)
}

module.exports.expireOptionsForControlPoint = async (controlPointNumber) => {
    await localDB()
        .request()
        .input("controlPointNumber", mssql.Int, controlPointNumber)
        .query(`
            update [dbo].[Option] 
            set validTo = GETDATE()
            where controlPointId = @controlPointNumber and validTo IS NULL
        `)
}

module.exports.expireAttributesForControlPoint = async (controlPointNumber) => {
    await localDB()
        .request()
        .input("controlPointNumber", mssql.Int, controlPointNumber)
        .query(`
            update [dbo].[AttributeControlPoint]
            set validTo = GETDATE()
            where controlPointId = @controlPointNumber and validTo IS NULL
        `)
}

module.exports.expireCategoryCodesForControlPoint = async (controlPointNumber) => {
    await localDB()
        .request()
        .input("controlPointNumber", mssql.Int, controlPointNumber)
        .query(`
            update [dbo].[ItemCategoryControlPoint]
            set validTo = GETDATE()
            where controlPointId = @controlPointNumber and validTo IS NULL
        `)
}

module.exports.updateControlPointFrequency = async (cpId, data) => {
	const result = await localDB()
		.request()
		.input('cpId', mssql.Int, cpId)
		.input('to25', mssql.Int, data[0].value)
		.input('to50', mssql.Int, data[1].value)
		.input('to100', mssql.Int, data[2].value)
		.input('to200', mssql.Int, data[3].value)
		.input('to300', mssql.Int, data[4].value)
		.input('to500', mssql.Int, data[5].value)
		.input('to700', mssql.Int, data[6].value)
		.input('to1000', mssql.Int, data[7].value)
		.input('to1500', mssql.Int, data[8].value)
		.input('to2000', mssql.Int, data[9].value)
		.input('to3000', mssql.Int, data[10].value)
		.input('to4000', mssql.Int, data[11].value)
		.input('to5000', mssql.Int, data[12].value)
		.query(`UPDATE Frequency
				SET to25   = @to25,
					to50   = @to50,
					to100  = @to100,
					to200  = @to200,
					to300  = @to300,
					to500  = @to500,
					to700  = @to700,
					to1000 = @to1000,
					to1500 = @to1500,
					to2000 = @to2000,
					to3000 = @to3000,
					to4000 = @to4000,
					to5000 = @to5000 FROM Frequency f
 					JOIN ControlPoint c
				ON c.frequencyId = f.id
				WHERE c.id = @cpId`)

	return result.recordset
}

module.exports.getFrequencyId = async (cpId) => {
        const result = await localDB()
            .request()
            .input('cpId', mssql.Int, cpId)
            .query(`select frequencyId from ControlPoint WHERE id = @cpId`)
    
        return result.recordset
    }

module.exports.updateControlPointFrequencyWhenFreqIdNotNull = async (cpId, data) => {

	const result = await localDB()
		.request()
		.input('cpId', mssql.Int, cpId)
		.input('to25', mssql.Int, data[Object.keys(data)[0]])
		.input('to50', mssql.Int, data[Object.keys(data)[1]])
		.input('to100', mssql.Int, data[Object.keys(data)[2]])
		.input('to200', mssql.Int, data[Object.keys(data)[3]])
		.input('to300', mssql.Int, data[Object.keys(data)[4]])
		.input('to500', mssql.Int, data[Object.keys(data)[5]])
		.input('to700', mssql.Int, data[Object.keys(data)[6]])
		.input('to1000', mssql.Int, data[Object.keys(data)[7]])
		.input('to1500', mssql.Int, data[Object.keys(data)[8]])
		.input('to2000', mssql.Int, data[Object.keys(data)[9]])
		.input('to3000', mssql.Int, data[Object.keys(data)[10]])
		.input('to4000', mssql.Int, data[Object.keys(data)[11]])
		.input('to5000', mssql.Int, data[Object.keys(data)[12]])
		.query(`UPDATE Frequency
				SET to25   = @to25,
					to50   = @to50,
					to100  = @to100,
					to200  = @to200,
					to300  = @to300,
					to500  = @to500,
					to700  = @to700,
					to1000 = @to1000,
					to1500 = @to1500,
					to2000 = @to2000,
					to3000 = @to3000,
					to4000 = @to4000,
					to5000 = @to5000 FROM Frequency f
 					JOIN ControlPoint c
				ON c.frequencyId = f.id
				WHERE c.id = @cpId`)

	return result.recordset
}

module.exports.updateControlPointFrequencyWhenFreqIdNull = async (cpId, data) => {

	const value = await localDB()
		.request()
		.input('cpId', mssql.Int, cpId)
		.input('to25', mssql.Int, data[Object.keys(data)[0]])
		.input('to50', mssql.Int, data[Object.keys(data)[1]])
		.input('to100', mssql.Int, data[Object.keys(data)[2]])
		.input('to200', mssql.Int, data[Object.keys(data)[3]])
		.input('to300', mssql.Int, data[Object.keys(data)[4]])
		.input('to500', mssql.Int, data[Object.keys(data)[5]])
		.input('to700', mssql.Int, data[Object.keys(data)[6]])
		.input('to1000', mssql.Int, data[Object.keys(data)[7]])
		.input('to1500', mssql.Int, data[Object.keys(data)[8]])
		.input('to2000', mssql.Int, data[Object.keys(data)[9]])
		.input('to3000', mssql.Int, data[Object.keys(data)[10]])
		.input('to4000', mssql.Int, data[Object.keys(data)[11]])
		.input('to5000', mssql.Int, data[Object.keys(data)[12]])
		.query(`INSERT INTO Frequency ([to25] ,[to50] ,[to100] ,[to200] ,[to300] ,[to500] ,
				[to700] ,[to1000] ,[to1500] ,[to2000] ,[to3000] ,[to4000] ,
				[to5000])
				VALUES (@to25,@to50,@to100,@to200,@to300,@to500,@to700,@to1000,@to1500,@to2000,@to3000,@to4000,@to5000);
				SELECT SCOPE_IDENTITY()
				`)

	return value.recordset
}

module.exports.updateControlPointFrequencyId = async (cpId,freqId) => {
	const result = await localDB()
		.request()
		.input('cpId', mssql.Int, cpId)
		.input('freqId', mssql.Int, freqId)
		.query(`UPDATE ControlPoint SET frequencyid = ${freqId} WHERE id = @cpId`)

	return result.recordset
}


module.exports.updateControlPointFrequencyWhenDataNull = async (cpId) => {
	const result = await localDB()
		.request()
		.input('cpId', mssql.Int, cpId)
		.query(`DELETE f FROM Frequency f
 					JOIN ControlPoint c
				ON c.frequencyId = f.id
				WHERE c.id = @cpId`)

	return result.recordset
}

module.exports.updateControlPointDescription = async (cpId, language, description) => {
	const result = await localDB()
		.request()
		.input('CpId', mssql.Int, cpId)
		.input('description', mssql.NVarChar, description)
		.input('language', mssql.NVarChar, language)
		.query(`UPDATE Description
				SET description = @description
				WHERE Description.controlPointId = @CpId
				  AND Description.language = @language`)

	return result.recordset
}


module.exports.insertDescription = async (controlPointId, language, description) => {
	const result = await localDB()
		.request()
		.input('controlPointId', mssql.Int, controlPointId)
		.input('description', mssql.NVarChar, description)
		.input('language', mssql.NVarChar, language)
		.query(`
            INSERT INTO Description 
            (controlPointId, language, description, validFrom) 
            VALUES 
            (@controlPointId, @language, @description, GETDATE())
        `)

	return result.recordset
}

module.exports.deleteControlPointOptionValues = async (cpId) => {
	const result = await localDB()
		.request()
		.input('cpId', mssql.Int, cpId)
		.query(`DELETE
				FROM [Option]
				WHERE controlPointId = @cpId`)

	return result.recordset
}

module.exports.insertOption = async (controlPointId, value) => {
	const result = await localDB()
		.request()
		.input('controlPointId', mssql.Int, controlPointId)
		.input('value', mssql.NVarChar, value)
		.query(`
            INSERT INTO [Option] 
            (controlPointId, value, validFrom)
            VALUES 
            (@controlPointId, @value, GETDATE())
        `)

	return result.recordset
}

module.exports.deleteControlPointAttributes = async (cpId) => {
	const result = await localDB()
		.request()
		.input('CpId', mssql.Int, cpId)
		.query(`DELETE
				FROM [dbo].[AttributeControlPoint]
				WHERE controlPointId = @CpId`)

	return result.recordset
}

module.exports.insertControlPointAttribute = async (controlPointId, attributeId, minValue, maxValue) => {
	const result = await localDB()
		.request()
		.input('controlPointId', mssql.Int, controlPointId)
		.input('attributeId', mssql.Int, attributeId)
		.input('minValue', mssql.Float, minValue)
		.input('maxValue', mssql.Float, maxValue)
		.query(`
            INSERT INTO [dbo].[AttributeControlPoint] 
            (attributeId, controlPointId, minValue, maxValue, validFrom)
            VALUES 
            (@attributeId, @controlPointId, @minValue, @maxValue, GETDATE())
        `)

	return result.recordset
}

module.exports.deleteControlPointItemCategoryCodes = async (cpId) => {
	const result = await localDB()
		.request()
		.input('CpId', mssql.Int, cpId)
		.query(`DELETE
				FROM [dbo].[ItemCategoryControlPoint]
				WHERE controlPointId = @CpId`)

	return result.recordset
}

module.exports.deleteControlPoint = async (cpId) => {
	const result = await localDB()
		.request()
		.input('CpId', mssql.Int, cpId)
		.query(`DELETE
				FROM [dbo].[ControlPoint]
				WHERE id = @CpId`)

	return result.recordset
}

module.exports.deleteControlPointDescriptions = async (cpId) => {
	const result = await localDB()
		.request()
		.input('CpId', mssql.Int, cpId)
		.query(`DELETE
				FROM [dbo].[Description]
				WHERE controlPointId = @CpId`)

	return result.recordset
}

module.exports.deleteFrequency = async (id) => {
	const result = await localDB()
		.request()
		.input('id', mssql.Int, id)
		.query(`DELETE
				FROM [dbo].[Frequency]
				WHERE id = @id`)

	return result.recordset
}

module.exports.insertControlPointItemCategoryCode = async (controlPointId, itemCategoryCode) => {
	const result = await localDB()
		.request()
		.input('controlPointId', mssql.Int, controlPointId)
		.input('itemCategoryCode', mssql.Int, itemCategoryCode)
		.query(`
            INSERT INTO [dbo].[ItemCategoryControlPoint] 
            (controlPointId, itemCategoryCode, validFrom)
            VALUES 
            (@controlPointId, @itemCategoryCode, GETDATE())
        `)

	return result.recordset
}

module.exports.updateControlPointItemCategoryCodes = async (cpId) => {
	const result = await localDB()
		.request()
		.input('CpId', mssql.Int, cpId)
		.query(`SELECT itemCategoryCode
				FROM [dbo].[ItemCategoryControlPoint]
				WHERE controlPointId = @CpId`)

	return result.recordset
}


module.exports.insertControlPoint = async (sqlString, con) => {
	con.query(sqlString)
		.catch(err => (console.error(err)))
}

module.exports.getControlPointsMinimal = async (language, offset, limit) => {
	const result = await localDB()
		.request()
        .input("offset", mssql.Int, offset)
        .input("limit", mssql.Int, limit)
        .input("language", mssql.NVarChar(40), language)
		.query(`
            SELECT controlPointId as id, description
            FROM Description
            WHERE Description.language = @language AND validFrom < GETDATE() AND validTo IS NULL 
            Order By controlPointId DESC
            OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY
        `)
	return result.recordset
}

module.exports.getDescriptionsByControlPointId = async (id) => {
    const result = await localDB()
        .request()
        .input("id", mssql.Int, id)
        .query(`SELECT id, language, description FROM Description WHERE Description.controlPointId=@id`)
    return result.recordset
}

module.exports.getLatestControlPointNumber = async () => {
    const result = await localDB()
        .request()
        .query(`
            SELECT MAX(controlPointNumber) as controlPointNumber FROM [ControlPoint]
        `)

    if(result.recordset[0] == null){
        return 1
    }else{
        return result.recordset[0].controlPointNumber + 1
    }
}

module.exports.expireOldFrequency = async (controlPointNumber) => {
    await localDB()
        .request()
        .input("controlPointNumber", mssql.Int, controlPointNumber)
        .query(`
            update [dbo].[ControlPoint] 
            set validTo = GETDATE()
            where controlPointNumber = @controlPointNumber and validTo IS NULL
        `)
}
