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
module.exports.getFrequenciesOfControlPoint = async (controlPointId) => {

	const result = await localDB()
		.request()
		.query(`select [to25], [to50], [to100], [to200], [to300], [to500],
					[to700], [to1000], [to1500], [to2000], [to3000], [to4000],
					[to5000]
				from [dbo].[ControlPoint] C JOIN [dbo].[Frequency] F
				on C.frequencyid = F.id
				where C.id = ${controlPointId}
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

module.exports.getControlMainInformation = async (cpId) => {
	const result = await localDB()
		.request()
		.input('CpId', mssql.Int, cpId)
		.query(`SELECT frequencyid, image, uppertolerance, lowertolerance, inputtype, measurementtype
				FROM ControlPoint
				WHERE id = @CpId`)

	return result.recordset
}


module.exports.getControlPointDescriptions = async (cpId) => {
	const result = await localDB()
		.request()
		.input('CpId', mssql.Int, cpId)
		.query(`SELECT language, description
				FROM Description
				WHERE Description.controlPointId=@CpId`)

	return result.recordset
}

module.exports.getControlPointOptionValues = async (cpId) => {
	const result = await localDB()
		.request()
		.input('CpId', mssql.Int, cpId)
		.query(`SELECT value
				FROM [Option]
				WHERE [Option].controlPointId=@CpId`)

	return result.recordset
}

module.exports.getControlPointAttributes = async (cpId) => {
	const result = await localDB()
		.request()
		.input('CpId', mssql.Int, cpId)
		.query(`SELECT attributeId, minValue, maxValue
				FROM [dbo].[AttributeControlPoint]
				WHERE controlPointId = @CpId`)

	return result.recordset
}

module.exports.getControlPointItemCategoryCodes = async (cpId) => {
	const result = await localDB()
		.request()
		.input('CpId', mssql.Int, cpId)
		.query(`SELECT itemCategoryCode
				FROM [dbo].[ItemCategoryControlPoint]
				WHERE controlPointId = @CpId`)

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

module.exports.deleteControlPointOptionValues = async (cpId) => {
	const result = await localDB()
		.request()
		.input('cpId', mssql.Int, cpId)
		.query(`DELETE
				FROM [Option]
				WHERE controlPointId = @cpId`)

	return result.recordset
}

module.exports.insertControlPointOptionValue = async (cpId, value) => {
	const result = await localDB()
		.request()
		.input('cpId', mssql.Int, cpId)
		.input('value', mssql.NVarChar, value)
		.query(`INSERT INTO [Option] (controlPointId, value)
				VALUES (@cpId, @value)`)

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

module.exports.insertControlPointAttributes = async (cpId, attributeId, minValue, maxValue) => {
	const result = await localDB()
		.request()
		.input('cpId', mssql.Int, cpId)
		.input('attributeId', mssql.Int, attributeId)
		.input('minValue', mssql.NVarChar(1000), minValue)
		.input('maxValue', mssql.NVarChar(1000), maxValue)
		.query(`INSERT INTO [dbo].[AttributeControlPoint] (attributeId, controlPointId, minValue, maxValue)
				VALUES (@attributeId, @cpId, @minValue, @maxValue)`)

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

module.exports.insertControlPointItemCategoryCodes = async (cpId, itemCategoryCode) => {
	const result = await localDB()
		.request()
		.input('cpId', mssql.Int, cpId)
		.input('itemCategoryCode', mssql.Int, itemCategoryCode)
		.query(`INSERT INTO [dbo].[ItemCategoryControlPoint] (controlPointId, itemCategoryCode)
				VALUES (@cpId, @itemCategoryCode)`)

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
            WHERE Description.language = @language
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

