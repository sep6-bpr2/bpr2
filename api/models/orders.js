const { mssql, konfairDB, localDB } = require('../connections/MSSQLConnection')

module.exports.getReleasedOrders = async (location, offset, limit) => {
    const result = await ( await konfairDB())
        .request()
        .input("location", mssql.NVarChar(40), location)
        .input("offset", mssql.Int, offset)
        .input("limit", mssql.Int, limit)
        .query(`
            SELECT 
            item.[No_] as id, 
            item.[Item Category Code] as categoryCode, 
            pOrder.[Quantity] as quantity, 
            pOrder.[Due Date] as deadline,
            pOrder.[No_] as productionOrder 
            FROM [KonfAir DRIFT$Item] item
            INNER JOIN [KonfAir DRIFT$Production Order] pOrder ON item.No_ = pOrder.[Source No_]
            WHERE pOrder.[Location Code] = @location AND pOrder.status = 3  
            ORDER BY item.[No_] ASC 
            OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY
        `)
    return result.recordset
}

module.exports.getOrders = async (location) => {
    const result = await ( await konfairDB())
        .request()
        .input("location", mssql.NVarChar(40), location)
        .query(`
            SELECT 
            item.[No_] as id, 
            item.[Item Category Code] as categoryCode, 
            pOrder.[Quantity] as quantity, 
            pOrder.[Due Date] as deadline, 
            pOrder.[No_] as productionOrder 
            FROM [KonfAir DRIFT$Item] item
            INNER JOIN [KonfAir DRIFT$Production Order] pOrder ON item.No_ = pOrder.[Source No_]
            WHERE pOrder.[Location Code] = @location
        `)
    return result.recordset
}

module.exports.getOrderInformation = async (id) => {
    const result = await ( await konfairDB())
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
            pOrder.Quantity as quantity,
            pOrder.[No_] as productionOrder 
            FROM [KonfAir DRIFT$Item] item
            INNER JOIN [KonfAir DRIFT$Production Order] pOrder ON item.No_ = pOrder.[Source No_]
            WHERE item.[No_] = @id
        `)
    return result.recordset
}

module.exports.getReleasedOrderControlPoints = async (id, language, date) => {
    // The max statements are to help group by
    const result = await ( await localDB())
        .request()
        .input("id", mssql.Int, id)
        .input("language", mssql.NVarChar(40), language)
        .input("date", mssql.DateTime, date)
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
            MAX(CASE WHEN connection.author IS NULL THEN '' WHEN connection.author = '' THEN '' ELSE 'taken' END) as author,
            MAX(connection.id) as connectionId, 
            MAX(connection.value) as answer,
            MAX(description.description) as description
            FROM [QAReportControlPointValue] connection
            INNER JOIN [ControlPoint] point ON connection.[controlPointId] = point.[id]
            INNER JOIN [Description] description ON connection.[controlPointId] = description.[controlPointId]
            WHERE 
                connection.[qaReportId] = @id AND 
                description.language = @language AND 
                point.validFrom < @date AND 
                ( point.validTo > @date OR point.validTo IS NULL) AND 
                description.validFrom < @date AND 
                ( description.validTo > @date OR description.validTo IS NULL)
            Group by point.id
        `)
    return result.recordset
}

module.exports.getReleasedOrderControlPointsAuthors = async (id, language, date) => {
    // The max statements are to help group by
    const result = await ( await localDB())
        .request()
        .input("id", mssql.Int, id)
        .input("language", mssql.NVarChar(40), language)
        .input("date", mssql.DateTime, date)
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
            MAX(connection.value) as answer,
            MAX(description.description) as description
            FROM [QAReportControlPointValue] connection
            INNER JOIN [ControlPoint] point ON connection.[controlPointId] = point.[id]
            INNER JOIN [Description] description ON connection.[controlPointId] = description.[controlPointId]
            WHERE 
                connection.[qaReportId] = @id AND 
                description.language = @language AND 
                point.validFrom < @date AND 
                ( point.validTo > @date OR point.validTo IS NULL) AND 
                description.validFrom < @date AND 
                ( description.validTo > @date OR description.validTo IS NULL)
            Group by point.id
        `)
    return result.recordset
}


module.exports.getReleasedOrderControlPointsDescriptions = async (id) => {
    const result = await ( await localDB())
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

module.exports.getReleasedOrderControlPointsOptions = async (id, date) => {
    const result = await ( await localDB())
        .request()
        .input("id", mssql.Int, id)
        .input("date", mssql.DateTime, date)
        .query(`
            SELECT * FROM [Option]
            WHERE controlPointId = @id AND 
            validFrom < @date AND 
            ( validTo > @date OR validTo IS NULL)
        `)
    return result.recordset
}

module.exports.getFrequenciesForCategory = async (code, date) => {
    const result = await ( await localDB())
        .request()
        .input("code", mssql.NVarChar(40), code)
        .input("date", mssql.DateTime, date)
        .query(`
            SELECT *
            FROM [ItemCategoryFrequency]
            INNER JOIN [Frequency] ON [Frequency].frequencyNumber = [ItemCategoryFrequency].frequencyId
            WHERE [ItemCategoryFrequency].code = @code AND Frequency.validFrom < @date AND ( Frequency.validTo > @date OR Frequency.validTo IS NULL)
        `)
    return result.recordset
}

module.exports.getFrequencies = async (id, date) => {
    const result = await ( await localDB())
        .request()
        .input("id", mssql.Int, id)
        .input("date", mssql.DateTime, date)
        .query(`
            SELECT * FROM [Frequency]
            WHERE frequencyNumber = @id AND 
            validFrom < @date AND 
            ( validTo > @date OR validTo IS NULL)
        `)
    return result.recordset
}

module.exports.getReleasedOrderReport = async (id) => {
    const result = await ( await localDB())
        .request()
        .input("id", mssql.Int, id)
        .query(`
            SELECT * FROM [QAReport]
            WHERE itemId = @id
        `)
    return result.recordset
}

module.exports.getSpecificControlPoints = async (attributeIds, categoryCode) => {
    const result = await ( await localDB())
        .request()
        .input("categoryCode", mssql.Int, categoryCode)
        .query(`
            SELECT DISTINCT 
            ControlPoint.id, 
            ControlPoint.controlPointNumber, 
            ControlPoint.frequencyId, 
            ControlPoint.image, 
            ControlPoint.inputType, 
            ControlPoint.lowerTolerance, 
            ControlPoint.upperTolerance  
            FROM [ControlPoint]
            INNER JOIN AttributeControlPoint ACP on ControlPoint.id = ACP.controlPointId
            INNER JOIN ItemCategoryControlPoint ICCP on ControlPoint.id = ICCP.controlPointId
            WHERE ACP.attributeId in (${attributeIds}) AND ICCP.itemCategoryCode = @categoryCode AND ControlPoint.validFrom < GETDATE() AND ControlPoint.validTo IS NULL 
        `)
    return result.recordset
}

module.exports.getControlPointsCategoryNoAtrributes = async (categoryCode) => {
    const result = await ( await localDB())
        .request()
        .input("categoryCode", mssql.Int, categoryCode)
        .query(`
            SELECT DISTINCT 
            ControlPoint.id, 
            ControlPoint.controlPointNumber, 
            ControlPoint.frequencyId, 
            ControlPoint.image, 
            ControlPoint.inputType, 
            ControlPoint.lowerTolerance, 
            ControlPoint.upperTolerance  
            FROM [ControlPoint]
            LEFT OUTER JOIN AttributeControlPoint ACP on ControlPoint.id = ACP.controlPointId
            INNER JOIN ItemCategoryControlPoint ICCP on ControlPoint.id = ICCP.controlPointId
            WHERE ACP.attributeId IS NULL AND ICCP.itemCategoryCode = @categoryCode AND ControlPoint.validFrom < GETDATE() AND ControlPoint.validTo IS NULL 
        `)
    return result.recordset
}

module.exports.getReleasedOrderAttributes = async (id) => {
    const result = await ( await konfairDB())
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

module.exports.getControlPointAttributes = async (id, date) => {
    const result = await ( await localDB())
        .request()
        .input("id", mssql.Int, id)
        .input("date", mssql.DateTime, date)
        .query(`
            SELECT 
            attributeId as id, 
            maxValue, 
            minValue 
            FROM [AttributeControlPoint]
            WHERE controlPointId = @id AND 
            validFrom < @date AND 
            ( validTo > @date OR validTo IS NULL)
        `)
    return result.recordset
}

module.exports.getControlPointAttributesLatest = async (id) => {
    const result = await ( await localDB())
        .request()
        .input("id", mssql.Int, id)
        .query(`
            SELECT 
            attributeId as id, 
            maxValue, 
            minValue 
            FROM [AttributeControlPoint]
            WHERE controlPointId = @id AND AttributeControlPoint.validFrom < GETDATE() AND AttributeControlPoint.validTo IS NULL 
        `)
    return result.recordset
}


module.exports.getControlPointCategories = async (id) => {
    const result = await ( await localDB())
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
    await ( await localDB())
        .request()
        .input("id", mssql.Int, id)
        .query(`
            INSERT INTO QAReport (itemId, status, createdDate) VALUES (@id, 0, GETDATE())
        `)

    const result = await ( await localDB())
        .request()
        .input("id", mssql.Int, id)
        .query(`
            SELECT * FROM QAReport WHERE itemId = @id
        `)
    return result.recordset
}

module.exports.insertControlPointConnection = async (controlPointId, qaReportId) => {
    const result = await ( await localDB())
        .request()
        .input("controlPointId", mssql.Int, controlPointId)
        .input("qaReportId", mssql.Int, qaReportId)
        .query(`
            INSERT INTO QAReportControlPointValue (qaReportId, controlPointId, value) values(@qaReportId, @controlPointId, '')
        `)
    return result.recordset
}

module.exports.getByCategory = async (categoryCode) => {
    const result = await ( await localDB())
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
    const result = await ( await localDB())
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
    const result = await ( await localDB())
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
    const result = await ( await localDB())
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
    const result = await ( await localDB())
        .request()
        .input("connectionId", mssql.Int, connectionId)
        .query(`
            DELETE FROM QAReportControlPointValue WHERE id = @connectionId
        `)
    return result.recordset
}

module.exports.qaReportControlPointResults = async (qaReportId, listOfControlPointIds) => {
    const result = await ( await localDB())
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
    const result = await ( await localDB())
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

    const result = await ( await localDB())
        .request()
        .query(`
            Select * from QAReport WHERE itemId in (${stringList});
        `)
    return result.recordset
}

module.exports.getOrdersByIdList = async (location, stringList, offset, limit) => {

    const result = await ( await konfairDB())
        .request()
        .input("location", mssql.NVarChar(40), location)
        .input("offset", mssql.Int, offset)
        .input("limit", mssql.Int, limit)
        .query(`
            SELECT 
            item.[No_] as id, 
            item.[Item Category Code] as categoryCode, 
            pOrder.[Quantity] as quantity, 
            pOrder.[Due Date] as deadline,
            pOrder.[No_] as productionOrder 
            FROM [KonfAir DRIFT$Item] item
            INNER JOIN [KonfAir DRIFT$Production Order] pOrder ON item.No_ = pOrder.[Source No_]
            WHERE pOrder.[Location Code] = @location AND item.[No_] in (${stringList})
            ORDER BY item.[No_] ASC 
            OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY
        `)
        
    return result.recordset
}

module.exports.getOrdersByIdListAllLocations = async (stringList, offset, limit) => {

    const result = await ( await konfairDB())
        .request()
        .input("offset", mssql.Int, offset)
        .input("limit", mssql.Int, limit)
        .query(`
            SELECT 
            item.[No_] as id, 
            item.[Item Category Code] as categoryCode, 
            pOrder.[Quantity] as quantity, 
            pOrder.[Due Date] as deadline,
            pOrder.[No_] as productionOrder 
            FROM [KonfAir DRIFT$Item] item
            INNER JOIN [KonfAir DRIFT$Production Order] pOrder ON item.No_ = pOrder.[Source No_]
            WHERE item.[No_] in (${stringList})
            ORDER BY item.[No_] ASC 
            OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY
        `)
        
    return result.recordset
}

module.exports.getCompletedQAReports = async () => {
    const result = await ( await localDB())
        .request()
        .query(`
            Select * from QAReport WHERE status = 1;
        `)
    return result.recordset
}

module.exports.setQaReportStatusToFinished = async (itemId) => {
    const result = await ( await localDB())
        .request()
        .input("itemId", mssql.NVarChar, itemId)
        .query(`
            UPDATE [QAReport]
            SET status = 1, completionDate = GETDATE()
            WHERE itemId = @itemId; 
        `)
    return result.recordset
}
