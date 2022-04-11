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
		.query(`insert into SystemUser(username,role) values ('${user.username}','${user.role}')`)

	const result = await localDB()
		.request()
		.query(`select * from SystemUser where SystemUser.username= '${user.username}'`)

	return result.recordset
}
