const { mssql, konfairDB, localDB } = require('../connections/MSSQLConnection')

module.exports.getItemCatCodesWhenLocationNotAll = async (location, offset, limit) => {
    const result = await ( await konfairDB())
        .request()
        .input("location", mssql.NVarChar(1000), location)
        .input("offset", mssql.Int, offset)
        .input("limit", mssql.Int, limit)
        .query(`
            select DISTINCT Code
            from [KonfAir DRIFT$Item]
            join [KonfAir DRIFT$Production Order] [KA D$P O] on [KonfAir DRIFT$Item].No_ = [KA D$P O].[Source No_]
            JOIN [KonfAir DRIFT$Item Category] [KA D$I C] on [KonfAir DRIFT$Item].[Item Category Code] = [KA D$I C].Code
            ORDER BY Code DESC
            OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY
`)
    return result.recordset
}

module.exports.getItemCatCodesWhenLocationNotAllMax = async (location) => {
    const result = await ( await konfairDB())
        .request()
        .query(`
            select DISTINCT Code
            from [KonfAir DRIFT$Item]
            join [KonfAir DRIFT$Production Order] [KA D$P O] on [KonfAir DRIFT$Item].No_ = [KA D$P O].[Source No_]
            JOIN [KonfAir DRIFT$Item Category] [KA D$I C] on [KonfAir DRIFT$Item].[Item Category Code] = [KA D$I C].Code
            ORDER BY Code DESC
        `)

    return result.recordset
}

module.exports.getItemCatCodesWhenLocationAll = async (offset, limit) => {
    const result = await ( await konfairDB())
        .request()
        .input("offset", mssql.Int, offset)
        .input("limit", mssql.Int, limit)
        .query(`
            select DISTINCT Code
            from [KonfAir DRIFT$Item]
            join [KonfAir DRIFT$Production Order] [KA D$P O] on [KonfAir DRIFT$Item].No_ = [KA D$P O].[Source No_]
            JOIN [KonfAir DRIFT$Item Category] [KA D$I C] on [KonfAir DRIFT$Item].[Item Category Code] = [KA D$I C].Code
            ORDER BY Code DESC
            OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY
    `)
    return result.recordset
}

module.exports.getItemCatCodesWhenLocationAllMax = async () => {
    const result = await ( await konfairDB())
        .request()
        .query(`
            select DISTINCT Code
            from [KonfAir DRIFT$Item]
            join [KonfAir DRIFT$Production Order] [KA D$P O] on [KonfAir DRIFT$Item].No_ = [KA D$P O].[Source No_]
            JOIN [KonfAir DRIFT$Item Category] [KA D$I C] on [KonfAir DRIFT$Item].[Item Category Code] = [KA D$I C].Code
            ORDER BY Code DESC
        `)

    return result.recordset
}
module.exports.getFrequenciesOfCategory = async (categoryCode) => {

    const result = await ( await localDB())
        .request()
        .input("categoryCode", mssql.NVarChar, categoryCode)
        .query(`
            select
            F.id,
            F.frequencyNumber as frequencyNumber,
            [to25],
            [to50],
            [to100],
            [to200],
            [to300],
            [to500],
            [to700],
            [to1000],
            [to1500],
            [to2000],
            [to3000],
            [to4000],
            [to5000]
            from [dbo].[ItemCategoryFrequency] I
            JOIN [dbo].[Frequency] F on I.frequencyid = F.frequencyNumber
            where I.code = @categoryCode AND F.validFrom < GETDATE() AND F.validTo IS NULL
        `)
    return result.recordset
}

module.exports.setFrequenciesWithIdWhenIdNotZero = async (item) => {
    const result = await ( await localDB())
        .request()
        .query(`
            update [dbo].[Frequency]
            set
            to25 = ${item.to25} ,
            to50 = ${item.to50} ,
            to100 = ${item.to100} ,
            to200 = ${item.to200} ,
            to300 = ${item.to300} ,
            to500 = ${item.to500} ,
			to700 = ${item.to700} ,
            to1000 = ${item.to1000} ,
            to1500 = ${item.to1500} ,
			to2000 = ${item.to2000},
            to3000 = ${item.to3000} ,
            to4000 = ${item.to4000} ,
			to5000 = ${item.to5000}
            where id = ${item.id}
        `)
    return result.recordset
}


module.exports.setFrequenciesWithIdWhenIdNotZero = async (item) => {
    const result = await ( await localDB())
        .request()
        .query(`
            update [dbo].[Frequency]
            set
            to25 = ${item.to25} ,
            to50 = ${item.to50} ,
            to100 = ${item.to100} ,
            to200 = ${item.to200} ,
            to300 = ${item.to300} ,
            to500 = ${item.to500} ,
			to700 = ${item.to700} ,
            to1000 = ${item.to1000} ,
            to1500 = ${item.to1500} ,
			to2000 = ${item.to2000},
            to3000 = ${item.to3000} ,
            to4000 = ${item.to4000} ,
			to5000 = ${item.to5000}
            where id = ${item.id}
        `)
    return result.recordset
}

module.exports.insertFrequency = async (frequency) => {
    await ( await localDB())
        .request()
        .query(`
            insert into [dbo].[Frequency]
            (
                frequencyNumber, [to25] ,[to50] ,[to100] ,[to200] ,[to300] ,[to500] ,
			    [to700] ,[to1000] ,[to1500] ,[to2000] ,[to3000] ,[to4000] ,
				[to5000], validFrom
            )
            values (
                ${frequency.frequencyNumber},${frequency.to25},${frequency.to50},${frequency.to100},${frequency.to200},${frequency.to300},
				${frequency.to500},${frequency.to700},${frequency.to1000},${frequency.to1500},${frequency.to2000},${frequency.to3000},
				${frequency.to4000},${frequency.to5000}, GETDATE()
            );
        `)

    const result = await ( await localDB())
        .request()
        .query(`insert into [dbo].[ItemCategoryFrequency](Code,frequencyid) values ('${frequency.Code}',${frequency.frequencyNumber})`)

    return result.recordset
}

module.exports.checkCodeExists = async (itemCode) => {
	let result = await ( await konfairDB())
		.request()
		.input("itemCode", mssql.NVarChar, itemCode)
		.query(`
            select DISTINCT 
            Code 
            from [KonfAir DRIFT$Item] 
            join [KonfAir DRIFT$Production Order] [KA D$P O] on [KonfAir DRIFT$Item].No_ = [KA D$P O].[Source No_] 
            JOIN [KonfAir DRIFT$Item Category] [KA D$I C] on [KonfAir DRIFT$Item].[Item Category Code] = [KA D$I C].Code 
            where Code = @itemCode`)

	return result.recordset
}

module.exports.getLatestFrequencyNumber = async () => {
    const result = await ( await localDB())
        .request()
        .query(`
            SELECT MAX(frequencyNumber) as frequencyNumber FROM [Frequency]
        `)

    if(result.recordset[0] == null){
        return 1
    }else{
        return result.recordset[0].frequencyNumber + 1
    }
}

module.exports.expireOldFrequency = async (frequencyNumber) => {
    await ( await localDB())
        .request()
        .input("frequencyNumber", mssql.Int, frequencyNumber)
        .query(`
            update [dbo].[Frequency]
            set validTo = GETDATE()
            where frequencyNumber = @frequencyNumber and validTo IS NULL
        `)
}


