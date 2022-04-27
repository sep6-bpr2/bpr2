const { mssql, konfairDB, localDB } = require('../connections/MSSQLConnection')
// need to take this to some static file
const defaultFrequencyValue = [{"id":0,"to25":2,"to50":3,"to100":4,"to200":7,"to300":10,"to500":16,"to700":22,"to1000":30,"to1500":40,"to2000":50,"to3000":60,"to4000":65,"to5000":70}]

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

