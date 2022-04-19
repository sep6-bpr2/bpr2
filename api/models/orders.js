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

module.exports.getReleasedOrderInformation = async (id) => {
    const result = await konfairDB()
        .request()
        .input("id", mssql.NVarChar(40), id)
        // .query(`
        //     SELECT * FROM [KonfAir DRIFT$Item] item
        //     -- INNER JOIN [KonfAir DRIFT$Production Order] pOrder ON item.No_ = pOrder.[Source No_]
        //     WHERE item.[No_] = @id
        // `)
        .query(`
            SELECT * FROM [KonfAir DRIFT$Item] item
            WHERE item.[No_] = @id
        `)
    return result.recordset
}

module.exports.getReleasedOrderControlPoints = async (id) => {
    const result = await localDB()
        .request()
        .input("id", mssql.Int, id)
        .query(`
            SELECT * FROM [QAReportControlPoint] connection
            INNER JOIN [ControlPoint] point ON connection.[ControlPointId] = point.[id]
            WHERE connection.[QAReportId] = @id
        `)
    return result.recordset
}

module.exports.getReleasedOrderControlPointsDescriptions = async (id) => {
    const result = await localDB()
        .request()
        .input("id", mssql.Int, id)
        .query(`
            SELECT * FROM [QAReportControlPoint] connection
            INNER JOIN [ControlPoint] point ON connection.[ControlPointId] = point.[id]
            WHERE connection.[QAReportId] = @id
        `)
    return result.recordset
}

module.exports.getReleasedOrderControlPointsOptions = async (id) => {
    const result = await localDB()
        .request()
        .input("id", mssql.Int, id)
        .query(`
            SELECT * FROM [Option] 
            WHERE controlPointId = @id
        `)
    return result.recordset
}

module.exports.getReleasedOrderControlPointsFrequencies = async (id) => {
    const result = await localDB()
        .request()
        .input("id", mssql.Int, id)
        .query(`
            SELECT * FROM [Frequency]
            WHERE controlPointId = @id
        `)
    return result.recordset
}

module.exports.getReleasedOrderReport = async (id) => {
    const result = await localDB()
        .request()
        .input("id", mssql.Int, id)
        .query(`
            SELECT * FROM [QAReport]
            WHERE itemId = @id
        `)
    return result.recordset
}

module.exports.getAllControlPoints = async () => {
    const result = await localDB()
        .request()
        .query(`
            SELECT * FROM [ControlPoint] 
        `)
    return result.recordset
}


module.exports.getReleasedOrderAttributes = async (id) => {
    const result = await konfairDB()
        .request()
        .input("id", mssql.Int, id)
        .query(`
            SELECT attribute.[Name], attribute.[Type], attribute.[Unit of Measure], value.[Value], attribute.[ID] FROM [KonfAir DRIFT$Item Attribute Value Mapping] mapping
            INNER JOIN [KonfAir DRIFT$Item Attribute] attribute ON mapping.[Item Attribute ID] = attribute.[ID]
            INNER JOIN [KonfAir DRIFT$Item Atrribute Value] value ON mapping.[Item Attribute Value ID] = value.[ID]
            WHERE mapping.[No_] = @id
        `)
    return result.recordset
}

module.exports.getControlPointAttributes = async (id) => {
    const result = await localDB()
        .request()
        .input("id", mssql.Int, id)
        .query(`
            SELECT attributeId, maxValue, minValue FROM [AttributeControlPoint]
            WHERE ControlPointId = @id
        `)
    return result.recordset
}

module.exports.getControlPointCategories = async (id) => {
    const result = await localDB()
        .request()
        .input("id", mssql.Int, id)
        .query(`
            SELECT ItemCategoryCode FROM [ItemCategoryControlPoint]
            WHERE ControlPointId = @id
        `)
    return result.recordset
}

module.exports.createQAReport = async (id) => {
    await localDB()
        .request()
        .input("id", mssql.Int, id)
        .query(`
            INSERT INTO QAReport values(0, @id)
        `)

    const result = await localDB()
        .request()
        .input("id", mssql.Int, id)
        .query(`
            SELECT * FROM QAReport WHERE itemId = @id
        `)
    return result.recordset
}

module.exports.insertControlPointConnection = async (controlPointId, qaReportId) => {
    const result = await localDB()
        .request()
        .input("controlPointId", mssql.Int, controlPointId)
        .input("qaReportId", mssql.Int, qaReportId)
        .query(`
            INSERT INTO QAReportControlPoint values(@qaReportId, @controlPointId, null)
        `)
    return result.recordset
}