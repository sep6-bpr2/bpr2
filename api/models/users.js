const { mssql, konfairDB, localDB } = require('../connections/MSSQLConnection')

module.exports.getUserByUsername = async (username) => {
    const result = await ( await localDB())
        .request()
        .input("username", mssql.NVarChar(1000), username)
        .query(`
            select *
            from SystemUser
            WHERE SystemUser.username = @username AND SystemUser.validFrom < GETDATE() AND SystemUser.validTo IS NULL `)
    return result.recordset
}

module.exports.getAllUsers = async (offset, limit) => {
	const result = await ( await localDB())
		.request()
        .input("offset", mssql.Int, offset)
        .input("limit", mssql.Int, limit)
		.query(`
            SELECT *
            FROM SystemUser
            WHERE validFrom < GETDATE() AND validTo IS NULL
            ORDER BY id ASC
            OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY
        `)

	return result.recordset
}


module.exports.getAllUsersWithUser = async (user) => {
	const result = await ( await localDB())
		.request()
		.input("username", mssql.NVarChar(1000), user.username)
		.query(`select * from SystemUser where SystemUser.username= @username and validFrom < GETDATE() AND validTo IS NULL`)

	return result.recordset
}


module.exports.getAllQAUsers = async () => {
	const result = await ( await localDB())
		.request()
		.query('SELECT DISTINCT author FROM QAReportControlPointValue')

	return result.recordset
}



module.exports.addUser = async (user) => {
    await ( await localDB())
        .request()
        .query(`insert into SystemUser (username, role, validFrom) values ('${user.username}','${user.role}', GETDATE())`)

    const result = await ( await localDB())
        .request()
        .query(`
            select *
            from SystemUser
            where SystemUser.username= '${user.username}' AND SystemUser.validFrom < GETDATE() AND SystemUser.validTo IS NULL`)

    return result.recordset
}

module.exports.removeUser = async (user) => {
	await ( await localDB())
		.request()
		.input("username", mssql.NVarChar(1000), user.username)
		.query(`delete from SystemUser where username = @username`)
}

module.exports.expireUser = async (username) => {
	await ( await localDB())
		.request()
		.input("username", mssql.NVarChar(1000), username)
        // .input("id", mssql.Int, id)
		.query(`
            update [dbo].[SystemUser]
            set validTo = GETDATE()
            where username = @username AND validTo IS NULL
        `)
}
