const { mssql, konfairDB, localDB } = require('../connections/MSSQLConnection')
// need to take this to some static file

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
		// result.recordset = defaultFrequencyValue
	}
	return result.recordset
}


module.exports.getAllAttributesNames = async () => {
	const result = await konfairDB()
		.request()
		.query(`SELECT id, name from [KonfAir DRIFT$Item Attribute]`)
	return result.recordset
}

module.exports.insertControlPoint = async (sqlString,con) => {
	con.query(sqlString)
		.catch(err => (console.error(err)))
}

module.exports.getControlPointsMinimal = async () => {
    const result = await localDB()
        .request()
        .query(`SELECT id FROM ControlPoint`)
    return result.recordset
}

module.exports.getDescriptionsByControlPointId = async (id) => {
    const result = await localDB()
        .request()
        .input("id", mssql.Int, id)
        .query(`SELECT id, language, description FROM Description WHERE Description.controlPointId=id`)
    return result.recordset
}

