const { mssql, konfairDB, localDB } = require('../connections/MSSQLConnection')

module.exports.getUserByUsername = async (username) => {
    const result = await localDB()
        .request()
        .input("username", mssql.NVarChar(1000), username)
        .query(`select * from SystemUser WHERE SystemUser.username=@username`)
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
