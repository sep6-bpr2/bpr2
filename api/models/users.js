const { mssql, konfairDB, localDB } = require('../connections/MSSQLConnection')

module.exports.getUserByUsername = async (username) => {
    const result = await localDB()
        .request()
        .input("username", mssql.NVarChar(1000), username)
        .query(`select * from SystemUser WHERE SystemUser.username=@username`)
    return result.recordset
}

module.exports.getAllUsers = async () => {
	const result = await localDB()
		.request()
		.query('SELECT * FROM SystemUser')

	return result.recordset
}


module.exports.getAllUsersWithUser = async (user) => {
	const result = await localDB()
		.request()
		.input("username", mssql.NVarChar(1000), user.username)
		.query(`select * from SystemUser where SystemUser.username= @username`)

	return result.recordset
}


module.exports.getAllQAUsers = async () => {
	const result = await localDB()
		.request()
		.query('SELECT DISTINCT author FROM QAReportControlPointValue')

	return result.recordset
}



module.exports.addUser = async (user) => {
    await localDB()
        .request()
		.input("username", mssql.NVarChar(1000), user.username)
		.input("role", mssql.NVarChar(1000), user.role)
        .query(`insert into SystemUser(username,role) values (@username,@role)`)

}

module.exports.removeUser = async (user) => {
	await localDB()
		.request()
		.input("username", mssql.NVarChar(1000), user.username)
		.query(`delete from SystemUser where username = @username`)
}
