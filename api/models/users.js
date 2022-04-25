import { mssql,localDB } from '../../connections/MSSQLConnection'

module.exports.getAllUsers = async () => {
	const result = await localDB()
		.request()
		.query(`select * from SystemUser`)

	return result.recordset
}

module.exports.addUser = async (user) => {
	 await localDB()
		.request()
		 .input("username", mssql.NVarChar(1000), user.username)
		 .input("role", mssql.NVarChar(1000), user.role)
		.query(`insert into SystemUser(username,role) values (@username,@role)`)

	const result = await localDB()
		.request()
		.input("username", mssql.NVarChar(1000), user.username)
		.query(`select * from SystemUser where SystemUser.username= username`)

	return result.recordset
}
