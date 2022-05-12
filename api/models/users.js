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

module.exports.addUser = async (user) => {
    await localDB()
        .request()
		.input("username", mssql.NVarChar(1000), user.username)
        .query(`insert into SystemUser(username,role) values ('${user.username}','${user.role}')`)

    const result = await localDB()
        .request()
		.input("username", mssql.NVarChar(1000), user.username)
        .query(`select * from SystemUser where SystemUser.username= '${user.username}'`)

    return result.recordset
}

module.exports.removeUser = async (user) => {
	await localDB()
		.request()
		.input("username", mssql.NVarChar(1000), user.username)
		.query(`delete from SystemUser where username = @username`)

	const result = await localDB()
		.request()
		.query(`select * from SystemUser`)

	return result.recordset
}
