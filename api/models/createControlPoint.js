const { mssql, konfairDB, localDB } = require('../connections/MSSQLConnection')
const defaultFrequencyValue = [{"id":0,"to25":2,"to50":3,"to100":4,"to200":7,"to300":10,"to500":16,"to700":22,"to1000":30,"to1500":40,"to2000":50,"to3000":60,"to4000":65,"to5000":70}]

module.exports.getAllTypes = async () => {
	const result = await konfairDB()
		.request()
		.query(`SELECT type from [KonfAir DRIFT$Item Attribute] GROUP BY type`)
	return result.recordset
}
module.exports.getFrequenciesOfControlPoint = async (controlPointId) => {

	const result = await localDB()
		.request()
		.query(`select F.id,[to25] ,[to50] ,[to100] ,[to200] ,[to300] ,[to500] ,
				[to700] ,[to1000] ,[to1500] ,[to2000] ,[to3000] ,[to4000] ,
				[to5000] from [dbo].[ControlPoint] C JOIN [dbo].[Frequency] F
				on C.frequency = F.id where C.id = ${controlPointId}
`)
	if(result.recordset[0] == undefined){
		result.recordset = defaultFrequencyValue
	}
	return result.recordset
}


module.exports.getAllAttributesNames = async () => {
	const result = await konfairDB()
		.request()
		.query(`SELECT id, name from [KonfAir DRIFT$Item Attribute]`)
	return result.recordset
}

module.exports.insertControlPoint = async (cp) => {

	let newFrequencyId = null


	const con = await localDB().request()
	const nVarchar = mssql.NVarChar(1000)

	if(cp.frequencies != null){
		let item = cp.frequencies

		let idResult = await localDB()
			.request()
			.query(`insert into [dbo].[Frequency]([to25] ,[to50] ,[to100] ,[to200] ,[to300] ,[to500] ,
				[to700] ,[to1000] ,[to1500] ,[to2000] ,[to3000] ,[to4000] ,
				[to5000]) values (${item.to25},${item.to50},${item.to100},${item.to200},${item.to300},${item.to500},${item.to700},${item.to1000},${item.to1500},${item.to2000},${item.to3000},${item.to4000},${item.to5000}); SELECT SCOPE_IDENTITY()`)

		newFrequencyId = idResult.recordset[0][""]
	}

	let sqlString = `
	BEGIN TRANSACTION
    	DECLARE @CpID int;
    	INSERT INTO ControlPoint VALUES (@frequencyId, @type, @lowerTolerance, @upperTolerance, @image);
    	SELECT @CpID = scope_identity();
    	INSERT INTO Description VALUES (@CpID,'english', @engDescription)
    	INSERT INTO Description VALUES (@CpID,'danish', @dkDescription)
    	INSERT INTO Description VALUES (@CpID,'lithuanian', @ltDescription) `

	con.input('frequencyId', mssql.Int, newFrequencyId)
	con.input('type', nVarchar, cp.type)
	con.input('image', mssql.NVarChar, cp.image)

	con.input('engDescription', nVarchar, cp.descriptions.find(obj=>obj.lang==="English").value)
	con.input('dkDescription', nVarchar, cp.descriptions.find(obj=>obj.lang==="Danish").value)
	con.input('ltDescription', nVarchar, cp.descriptions.find(obj=>obj.lang==="Lithuanian").value)

	if(cp.type === "number"){
		con.input('lowerTolerance', nVarchar, cp.lowerTolerance)
		con.input('upperTolerance', nVarchar, cp.upperTolerance)
	}else {
		con.input('lowerTolerance', nVarchar, null)
		con.input('upperTolerance', nVarchar, null)
	}

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
	con.query(sqlString)
		.then( result => (console.log(result)))
		.catch(err => (console.error(err)))
}
