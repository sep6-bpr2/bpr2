const { mssql, konfairDB, localDB } = require('../connections/MSSQLConnection')

module.exports.getReleasedOrders = async (location) => {
    const result = await konfairDB()
        .request()
        .input("location", mssql.NVarChar(40), location)
        .query(`
            SELECT item.[No_] as id, item.[Item Category Code] as categoryCode, pOrder.[Quantity] as quantity, pOrder.[Due Date] as deadline 
            FROM [KonfAir DRIFT$Item] item
            INNER JOIN [KonfAir DRIFT$Production Order] pOrder ON item.No_ = pOrder.[Source No_]
            WHERE pOrder.[Location Code] = @location AND pOrder.status = 3
        `)
    return result.recordset
}

module.exports.getOrders = async (location) => {
    const result = await konfairDB()
        .request()
        .input("location", mssql.NVarChar(40), location)
        .query(`
            SELECT item.[No_] as id, item.[Item Category Code] as categoryCode, pOrder.[Quantity] as quantity, pOrder.[Due Date] as deadline FROM [KonfAir DRIFT$Item] item
            INNER JOIN [KonfAir DRIFT$Production Order] pOrder ON item.No_ = pOrder.[Source No_]
            WHERE pOrder.[Location Code] = @location
        `)
    return result.recordset
}

module.exports.getOrderInformation = async (id) => {
    const result = await konfairDB()
        .request()
        .input("id", mssql.NVarChar(40), id)
        .query(`
            SELECT 
            item.No_ as id, 
            item.Description as description, 
            item.[Item Category Code] as categoryCode, 
            pOrder.status, 
            pOrder.[Due Date] as deadline, 
            pOrder.[Location Code] as location, 
            pOrder.Quantity as quantity
            FROM [KonfAir DRIFT$Item] item
            INNER JOIN [KonfAir DRIFT$Production Order] pOrder ON item.No_ = pOrder.[Source No_]
            WHERE item.[No_] = @id
        `)
    return result.recordset
}

module.exports.getReleasedOrderControlPoints = async (id) => {
    // The max statements are to help group by
    const result = await localDB()
        .request()
        .input("id", mssql.Int, id)
        .query(`
            SELECT 
            DISTINCT
            point.id, 
            MAX(point.image) as image,
            MAX(point.frequencyId) as frequencyId, 
            MAX(point.inputType) as inputType, 
            MAX(point.lowerTolerance) as lowerTolerance,
            MAX(point.upperTolerance) as upperTolerance, 
            MAX(point.measurementType) as measurementType, 
            MAX(CASE WHEN connection.author IS NULL THEN '' WHEN connection.author = ''THEN '' ELSE 'taken' END) as author,
            MAX(connection.id) as connectionId, 
            MAX(connection.value) as answer
            FROM [QAReportControlPointValue] connection
            INNER JOIN [ControlPoint] point ON connection.[controlPointId] = point.[id]
            WHERE connection.[qaReportId] = @id
            Group by point.id
        `)
    return result.recordset
}

module.exports.getReleasedOrderControlPointsAuthors = async (id) => {
    // The max statements are to help group by
    const result = await localDB()
        .request()
        .input("id", mssql.Int, id)
        .query(`
            SELECT 
            DISTINCT
            point.id, 
            MAX(point.image) as image,
            MAX(point.frequencyId) as frequencyId, 
            MAX(point.inputType) as inputType, 
            MAX(point.lowerTolerance) as lowerTolerance,
            MAX(point.upperTolerance) as upperTolerance, 
            MAX(point.measurementType) as measurementType, 
            MAX(connection.author) as author,
            MAX(connection.id) as connectionId, 
            MAX(connection.value) as answer
            FROM [QAReportControlPointValue] connection
            INNER JOIN [ControlPoint] point ON connection.[controlPointId] = point.[id]
            WHERE connection.[qaReportId] = @id
            Group by point.id
        `)
    return result.recordset
}


module.exports.getReleasedOrderControlPointsDescriptions = async (id) => {
    const result = await localDB()
        .request()
        .input("id", mssql.Int, id)
        .query(`
            SELECT 
            Description.id, 
            Description.language, 
            Description.description from ControlPoint
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

module.exports.getFrequenciesForCategory = async (code) => {
    const result = await localDB()
        .request()
        .input("code", mssql.NVarChar(40), code)
        .query(`
            SELECT * FROM [ItemCategoryFrequency]
            INNER JOIN [Frequency] ON [Frequency].id = [ItemCategoryFrequency].frequencyId
            WHERE [ItemCategoryFrequency].code = @code
        `)
    return result.recordset
}

module.exports.getFrequencies = async (id) => {
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
            SELECT DISTINCT 
            ControlPoint.id, 
            ControlPoint.frequencyId, 
            ControlPoint.image, 
            ControlPoint.inputType, 
            ControlPoint.lowerTolerance, 
            ControlPoint.upperTolerance  
            FROM [ControlPoint]
            INNER JOIN AttributeControlPoint ACP on ControlPoint.id = ACP.controlPointId
            INNER JOIN ItemCategoryControlPoint ICCP on ControlPoint.id = ICCP.controlPointId
            WHERE ACP.attributeId in (${attributeIds}) AND ICCP.itemCategoryCode = @categoryCode
        `)
    return result.recordset
}


module.exports.getReleasedOrderAttributes = async (id) => {
    const result = await konfairDB()
        .request()
        .input("id", mssql.Int, id)
        .query(`
            SELECT 
            attribute.[Name] as name, 
            attribute.[Type] as type, 
            attribute.[Unit of Measure] as units, 
            value.[Value] as value, attribute.[ID] as id 
            FROM [KonfAir DRIFT$Item Attribute Value Mapping] mapping
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
            SELECT 
            attributeId as id, 
            maxValue, 
            minValue 
            FROM [AttributeControlPoint]
            WHERE controlPointId = @id
        `)
    return result.recordset
}

module.exports.getControlPointCategories = async (id) => {
    const result = await localDB()
        .request()
        .input("id", mssql.Int, id)
        .query(`
            SELECT 
            ItemCategoryCode 
            FROM [ItemCategoryControlPoint]
            WHERE controlPointId = @id
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
            INSERT INTO QAReportControlPointValue (qaReportId, controlPointId, value) values(@qaReportId, @controlPointId, '')
        `)
    return result.recordset
}

module.exports.getByCategory = async (categoryCode) => {
    const result = await localDB()
        .request()
        .input("categoryCode", mssql.Int, categoryCode)
        .query(`
            SELECT DISTINCT 
            ControlPoint.id 
            FROM [ControlPoint]
            INNER JOIN ItemCategoryControlPoint ICCP on ControlPoint.id = ICCP.controlPointId
            where ICCP.itemCategoryCode = @categoryCode
        `)
    return result.recordset
}

module.exports.getByAttribute = async (attributeIds) => {
    const result = await localDB()
        .request()
        .query(`
            SELECT DISTINCT 
            ControlPoint.id 
            FROM [ControlPoint]
            INNER JOIN AttributeControlPoint ACP on ControlPoint.id = ACP.controlPointId
            where ACP.attributeId in (${attributeIds})
        `)
    return result.recordset
}

module.exports.insertMultipleTimeMeasurement = async (controlPointId, value, qaReportId, author) => {
    const result = await localDB()
        .request()
        .input("controlPointId", mssql.Int, controlPointId)
        .input("qaReportId", mssql.Int, qaReportId)
        .input("value", mssql.NVarChar, value)
        .input("author", mssql.NVarChar, author)
        .query(`
            INSERT INTO QAReportControlPointValue (qaReportId, controlPointId, value, author) values(@qaReportId, @controlPointId, @value, @author);
            SELECT SCOPE_IDENTITY() AS id
        `)
    return result.recordset
}

module.exports.alterMeasurement = async (connectionId, controlPointId, value, qaReportId, author) => {
    const result = await localDB()
        .request()
        .input("id", mssql.Int, connectionId)
        .input("controlPointId", mssql.Int, controlPointId)
        .input("qaReportId", mssql.Int, qaReportId)
        .input("value", mssql.NVarChar, value)
        .input("author", mssql.NVarChar, author)
        .query(`
            UPDATE [QAReportControlPointValue]
            SET [value] = @value, [author] = @author
            WHERE qaReportId = @qaReportId AND controlPointId = @controlPointId AND id = @id; 
        `)
    return result.recordset
}

module.exports.deleteQAReportConnection = async (connectionId) => {
    const result = await localDB()
        .request()
        .input("connectionId", mssql.Int, connectionId)
        .query(`
            DELETE FROM QAReportControlPointValue WHERE id = @connectionId
        `)
    return result.recordset
}

module.exports.qaReportControlPointResults = async (qaReportId, listOfControlPointIds) => {
    const result = await localDB()
        .request()
        .input("qaReportId", mssql.Int, qaReportId)
        .query(`
            SELECT 
            connection.value as answer, 
            connection.id as connectionId, 
            connection.controlPointId,
            connection.qaReportId,
            (CASE WHEN connection.author = null or connection.author = '' THEN '' ELSE 'taken' END) as author 
            FROM [QAReportControlPointValue] connection
            WHERE connection.[qaReportId] = @qaReportId AND connection.[controlPointId] in (${listOfControlPointIds})
        `)
    return result.recordset
}

module.exports.qaReportControlPointResultsAuthors = async (qaReportId, listOfControlPointIds) => {
    const result = await localDB()
        .request()
        .input("qaReportId", mssql.Int, qaReportId)
        .query(`
            SELECT 
            connection.value as answer, 
            connection.id as connectionId, 
            connection.controlPointId,
            connection.qaReportId,
            connection.author
            FROM [QAReportControlPointValue] connection
            WHERE connection.[qaReportId] = @qaReportId AND connection.[controlPointId] in (${listOfControlPointIds})
        `)
    return result.recordset
}

module.exports.getMultipleQAReports = async (stringList) => {

    const result = await localDB()
        .request()
        .query(`
            Select * from QAReport WHERE itemId in (${stringList});
        `)
    return result.recordset
}

module.exports.getOrdersByIdList = async (location, stringList) => {

    const result = await konfairDB()
        .request()
        .input("location", mssql.NVarChar(40), location)
        .query(`
            SELECT item.[No_] as id, item.[Item Category Code] as categoryCode, pOrder.[Quantity] as quantity, pOrder.[Due Date] as deadline FROM [KonfAir DRIFT$Item] item
            INNER JOIN [KonfAir DRIFT$Production Order] pOrder ON item.No_ = pOrder.[Source No_]
            WHERE pOrder.[Location Code] = @location AND item.[No_] in (${stringList})
        `)
        
    return result.recordset
}

module.exports.getCompletedQAReports = async () => {
    const result = await localDB()
        .request()
        .query(`
            Select * from QAReport WHERE status = 1;
        `)
    return result.recordset
}

module.exports.setQaReportStatusToFinished = async (itemId) => {
    const result = await localDB()
        .request()
        .input("itemId", mssql.NVarChar, itemId)
        .query(`
            UPDATE [QAReport]
            SET status = 1
            WHERE itemId = @itemId; 
        `)
    return result.recordset
}
