const { mssql, konfairDB, localDB } = require('../connections/MSSQLConnection')

module.exports.getReleasedOrders = async (location) => {
    const result = await konfairDB()
        .request()
        .input("location", mssql.NVarChar(40), location)
        .query(`
            SELECT item.[No_], item.[Item Category Code], pOrder.[Quantity], pOrder.[Due Date] FROM [KonfAir DRIFT$Item] item
            INNER JOIN [KonfAir DRIFT$Production Order] pOrder ON item.No_ = pOrder.[Source No_]
            WHERE pOrder.[Location Code] = @location
        `)
    return result.recordset
}