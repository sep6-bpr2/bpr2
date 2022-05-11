const {konfairDB} = require("../connections/MSSQLConnection");

module.exports.getAllLocations = async () => {
	const result = await konfairDB()
		.request()
		.query('select distinct [Location Code] from [KonfAir DRIFT$Production Order]')

	return result.recordset
}
