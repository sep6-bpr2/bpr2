import { mssql, konfairDB, localDB } from '../../connections/MSSQLConnection'


// module.exports.getConnections = async () =>{
//     console.log('Sdasd')
// }
module.exports.getLogin = async (username) => {
    // console.log(username)
    const result = await localDB()
    .request()
    .input("username", mssql.NVarChar(1000), username)
    .query(`select * from SystemUser WHERE SystemUser.username=@username`)
    return result.recordset
}

