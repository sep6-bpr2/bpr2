const { mssql, konfairDB, localDB } = require('../connections/MSSQLConnection')

module.exports.getItemCatCodesWhenLocationNotAll = async (location, offset, limit) => {
    const result = await konfairDB()
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
    const result = await konfairDB()
        .request()
        .input("location", mssql.NVarChar(1000), location)
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
    const result = await konfairDB()
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
    const result = await konfairDB()
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

    const result = await localDB()
        .request()
        .input("categoryCode", mssql.Int, categoryCode)
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
    const result = await localDB()
        .request()
		.input('id',mssql.Int,item.id)
		.input('to25', mssql.Int, item.to25)
		.input('to50', mssql.Int, item.to50)
		.input('to100', mssql.Int, item.to100)
		.input('to200', mssql.Int, item.to200)
		.input('to300', mssql.Int, item.to300)
		.input('to500', mssql.Int, item.to500)
		.input('to700', mssql.Int, item.to700)
		.input('to1000', mssql.Int, item.to1000)
		.input('to1500', mssql.Int, item.to1500)
		.input('to2000', mssql.Int, item.to2000)
		.input('to3000', mssql.Int, item.to3000)
		.input('to4000', mssql.Int, item.to4000)
		.input('to5000', mssql.Int, item.to5000)
        .query(`
            update [dbo].[Frequency]
            set
            to25 = @to25 ,
            to50 = @to50 ,
            to100 = @to100 ,
            to200 = @to200 ,
            to300 = @to300 ,
            to500 = @to500 ,
			to700 = @to700 ,
            to1000 = @to1000 ,
            to1500 = @to1500 ,
			to2000 = @to2000,
            to3000 = @to3000 ,
            to4000 = @to4000 ,
			to5000 = @to5000
            where id = @id
        `)
    return result.recordset
}


module.exports.setFrequenciesWithIdWhenIdNotZero = async (item) => {
    const result = await localDB()
        .request()
		.input('id',mssql.Int,item.id)
		.input('to25', mssql.Int, item.to25)
		.input('to50', mssql.Int, item.to50)
		.input('to100', mssql.Int, item.to100)
		.input('to200', mssql.Int, item.to200)
		.input('to300', mssql.Int, item.to300)
		.input('to500', mssql.Int, item.to500)
		.input('to700', mssql.Int, item.to700)
		.input('to1000', mssql.Int, item.to1000)
		.input('to1500', mssql.Int, item.to1500)
		.input('to2000', mssql.Int, item.to2000)
		.input('to3000', mssql.Int, item.to3000)
		.input('to4000', mssql.Int, item.to4000)
		.input('to5000', mssql.Int, item.to5000)
        .query(`
            update [dbo].[Frequency]
            set
            to25 = @to25 ,
            to50 = @to50 ,
            to100 = @to100 ,
            to200 = @to200 ,
            to300 = @to300 ,
            to500 = @to500 ,
			to700 = @to700 ,
            to1000 = @to1000 ,
            to1500 = @to1500 ,
			to2000 = @to2000,
            to3000 = @to3000 ,
            to4000 = @to4000 ,
			to5000 = @to5000
            where id = @id
        `)
    return result.recordset
}

module.exports.insertFrequency = async (frequency) => {
    const result = await localDB()
        .request()
		.input('frequencyNumber',mssql.Int,frequency.frequencyNumber)
		.input('to25', mssql.Int, frequency.to25)
		.input('to50', mssql.Int, frequency.to50)
		.input('to100', mssql.Int, frequency.to100)
		.input('to200', mssql.Int, frequency.to200)
		.input('to300', mssql.Int, frequency.to300)
		.input('to500', mssql.Int, frequency.to500)
		.input('to700', mssql.Int, frequency.to700)
		.input('to1000', mssql.Int, frequency.to1000)
		.input('to1500', mssql.Int, frequency.to1500)
		.input('to2000', mssql.Int, frequency.to2000)
		.input('to3000', mssql.Int, frequency.to3000)
		.input('to4000', mssql.Int, frequency.to4000)
		.input('to5000', mssql.Int, frequency.to5000)
        .query(`
            insert into [dbo].[Frequency]
            (
                frequencyNumber, [to25] ,[to50] ,[to100] ,[to200] ,[to300] ,[to500] ,
			    [to700] ,[to1000] ,[to1500] ,[to2000] ,[to3000] ,[to4000] ,
				[to5000], validFrom
            )
            values (
                @frequencyNumber,@to25,@to50,@to100,@to200,@to300,@to500,@to700,@to1000,@to1500,@to2000,@to3000,@to4000,@to5000, GETDATE()
            );
        `)

    return result.recordset
}

module.exports.checkCodeExists = async (itemCode) => {
	let result = await konfairDB()
		.request()
		.input("itemCode", mssql.Int, itemCode)
		.query(`select DISTINCT Code from [KonfAir DRIFT$Item] join [KonfAir DRIFT$Production Order] [KA D$P O]
 				on [KonfAir DRIFT$Item].No_ = [KA D$P O].[Source No_] JOIN [KonfAir DRIFT$Item Category] [KA D$I C]
 				on [KonfAir DRIFT$Item].[Item Category Code] = [KA D$I C].Code where Code = @itemCode`)

	return result.recordset
}

module.exports.getLatestFrequencyNumber = async () => {
    const result = await localDB()
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
    await localDB()
        .request()
        .input("frequencyNumber", mssql.Int, frequencyNumber)
        .query(`
            update [dbo].[Frequency]
            set validTo = GETDATE()
            where frequencyNumber = @frequencyNumber and validTo IS NULL
        `)
}


