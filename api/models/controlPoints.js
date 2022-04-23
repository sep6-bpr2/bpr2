const { mssql, konfairDB, localDB } = require('../connections/MSSQLConnection')

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
        .query(`SELECT id, language, description FROM Description WHERE Description.controlPointId=@id`)
    return result.recordset
}

