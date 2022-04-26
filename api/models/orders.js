const { mssql, konfairDB, localDB } = require('../connections/MSSQLConnection')

module.exports.getReleasedOrders = async (location) => {
    const result = await konfairDB()
        .request()
        .input("location", mssql.NVarChar(40), location)
        .query(`
            SELECT item.[No_] as id, item.[Item Category Code] as categoryCode, pOrder.[Quantity] as quantity, pOrder.[Due Date] as deadline FROM [KonfAir DRIFT$Item] item
            INNER JOIN [KonfAir DRIFT$Production Order] pOrder ON item.No_ = pOrder.[Source No_]
            WHERE pOrder.[Location Code] = @location AND pOrder.status = 3
        `)
    return result.recordset
}

module.exports.getReleasedOrderInformation = async (id) => {
    const result = await konfairDB()
        .request()
        .input("id", mssql.NVarChar(40), id)
        .query(`
            SELECT item.No_ as id, item.Description as description, item.[Item Category Code] as categoryCode, pOrder.status, pOrder.[Due Date] as deadline, pOrder.[Location Code] as location, pOrder.Quantity as quantity FROM [KonfAir DRIFT$Item] item
            INNER JOIN [KonfAir DRIFT$Production Order] pOrder ON item.No_ = pOrder.[Source No_]
            WHERE item.[No_] = @id AND pOrder.status = 3
        `)
    return result.recordset
}

module.exports.getReleasedOrderControlPoints = async (id) => {
    const result = await localDB()
        .request()
        .input("id", mssql.Int, id)
        .query(`
            SELECT point.id, point.frequencyId, point.image, point.type, point.lowerTolerance, point.upperTolerance FROM [QAReportControlPoint] connection
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
            SELECT Description.id, Description.language, Description.description from ControlPoint
            INNER JOIN Description on ControlPoint.id = Description.controlPointId
            WHERE ControlPoint.id = @id
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
            WHERE id = @id
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

module.exports.getSpecificControlPoints = async (attributeIds, categoryCode) => {
    const result = await localDB()
        .request()
        .input("categoryCode", mssql.Int, categoryCode)
        .query(`
            SELECT DISTINCT ControlPoint.id, ControlPoint.frequencyId, ControlPoint.image, ControlPoint.type, ControlPoint.lowerTolerance, ControlPoint.upperTolerance  FROM [ControlPoint]
            INNER JOIN AttributeControlPoint ACP on ControlPoint.id = ACP.ControlPointId
            INNER JOIN ItemCategoryControlPoint ICCP on ControlPoint.id = ICCP.ControlPointId
            WHERE ACP.attributeId in (${attributeIds}) AND ICCP.ItemCategoryCode = @categoryCode
        `)
    return result.recordset
}


module.exports.getReleasedOrderAttributes = async (id) => {
    const result = await konfairDB()
        .request()
        .input("id", mssql.Int, id)
        .query(`
            SELECT attribute.[Name] as name, attribute.[Type] as type, attribute.[Unit of Measure] as units, value.[Value] as value, attribute.[ID] as id FROM [KonfAir DRIFT$Item Attribute Value Mapping] mapping
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
            SELECT attributeId as id, maxValue, minValue FROM [AttributeControlPoint]
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
            INSERT INTO QAReport (itemId, status) VALUES (@id, 0)
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
            INSERT INTO QAReportControlPoint (QAReportId, ControlPointId, value) values(@qaReportId, @controlPointId, null)
        `)
    return result.recordset
}

module.exports.getByCategory = async (categoryCode) => {
    const result = await localDB()
        .request()
        .input("categoryCode", mssql.Int, categoryCode)
        .query(`
            SELECT DISTINCT ControlPoint.id FROM [ControlPoint]
            INNER JOIN ItemCategoryControlPoint ICCP on ControlPoint.id = ICCP.ControlPointId
            where ICCP.ItemCategoryCode = @categoryCode
        `)
    return result.recordset
}

module.exports.getByAttribute = async (attributeIds) => {
    const result = await localDB()
        .request()
        .query(`
            SELECT DISTINCT ControlPoint.id FROM [ControlPoint]
            INNER JOIN AttributeControlPoint ACP on ControlPoint.id = ACP.ControlPointId
            where ACP.attributeId in (${attributeIds})
        `)
    return result.recordset
}