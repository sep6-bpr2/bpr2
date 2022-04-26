const { mssql, konfairDB, localDB } = require('../connections/MSSQLConnection')

module.exports.getAllTypes = async () => {
	const result = await konfairDB()
		.request()
		.query(`SELECT type from [KonfAir DRIFT$Item Attribute] GROUP BY type`)
	return result.recordset
}

module.exports.getAllAttributesNames = async () => {
	const result = await konfairDB()
		.request()
		.query(`SELECT id, name from [KonfAir DRIFT$Item Attribute]`)
	return result.recordset
}

module.exports.insertControlPoint = async (cp) => {
	const con = await localDB().request()
	const nVarchar = mssql.NVarChar(1000)

	let sqlString = `
	BEGIN TRANSACTION
    	DECLARE @CpID int;
    	INSERT INTO ControlPoint VALUES (1, @type, 0, 999, @image);
    	SELECT @CpID = scope_identity();
    	INSERT INTO Description VALUES (@CpID,'english', @engDescription)
    	INSERT INTO Description VALUES (@CpID,'danish', @dkDescription)
    	INSERT INTO Description VALUES (@CpID,'lithuanian', @ltDescription) `

	con.input('type', nVarchar, cp.type)
	con.input('image', mssql.NVarChar, cp.image)

	con.input('engDescription', nVarchar, cp.descriptions.find(obj=>obj.lang==="English").value)
	con.input('dkDescription', nVarchar, cp.descriptions.find(obj=>obj.lang==="Danish").value)
	con.input('ltDescription', nVarchar, cp.descriptions.find(obj=>obj.lang==="Lithuanian").value)

	if(cp.type === "options"){
		cp.optionValues.forEach((item, index) => {
			sqlString+=`INSERT INTO [Option] VALUES (@option${index}, @CpID); `
			con.input('option'+index, nVarchar, item.value)
		})
	}else {
		sqlString+=`INSERT INTO QAReportControlPoint VALUES (1, @CpID, @value); `
		con.input('value', nVarchar, cp.value)
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
