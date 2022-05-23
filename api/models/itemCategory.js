const {mssql, konfairDB, localDB} = require('../connections/MSSQLConnection')

module.exports.getItemCatCodesWhenLocationNotAll = async (location) => {

	const result = await konfairDB()
		.request()
		.input("location", mssql.NVarChar(1000), location)
		.query(`select Code from [KonfAir DRIFT$Item] join [KonfAir DRIFT$Production Order] [KA D$P O] on
				[KonfAir DRIFT$Item].No_ = [KA D$P O].[Source No_] JOIN [KonfAir DRIFT$Item Category] [KA D$I C]
				 on [KonfAir DRIFT$Item].[Item Category Code] = [KA D$I C].Code where [Location Code] =@location
`)
	return result.recordset
}

module.exports.getItemCatCodesWhenLocationAll = async () => {
	const result = await konfairDB()
		.request()
		.query(`select Code from [KonfAir DRIFT$Item] join [KonfAir DRIFT$Production Order] [KA D$P O]
 				on [KonfAir DRIFT$Item].No_ = [KA D$P O].[Source No_] JOIN [KonfAir DRIFT$Item Category] [KA D$I C]
 				on [KonfAir DRIFT$Item].[Item Category Code] = [KA D$I C].Code
`)

	return result.recordset
}
module.exports.getFrequenciesOfItem = async (itemCode) => {

	const result = await localDB()
		.request()
		.input("itemCode", mssql.Int, itemCode)
		.query(`select F.id,[to25] ,[to50] ,[to100] ,[to200] ,[to300] ,[to500] ,
				[to700] ,[to1000] ,[to1500] ,[to2000] ,[to3000] ,[to4000] ,
				[to5000] from [dbo].[ItemCategoryFrequency] I JOIN [dbo].[Frequency] F
				on I.frequencyid = F.id where I.code = @itemCode
        `)
	return result.recordset
}
module.exports.setFrequenciesWithIdWhenIdNotZero = async (item) => {
	const result = await localDB()
		.request()
		.query(`update [dbo].[Frequency] set to25 = ${item.to25} ,to50 = ${item.to50} ,to100 = ${item.to100}
					,to200 = ${item.to200} ,to300 = ${item.to300} ,to500 = ${item.to500} ,
					to700 = ${item.to700} ,to1000 = ${item.to1000} ,to1500 = ${item.to1500} ,
					to2000 = ${item.to2000},to3000 = ${item.to3000} ,to4000 = ${item.to4000} ,
					to5000 = ${item.to5000} where id = ${item.id}
`)
	return result.recordset
}

module.exports.setFrequenciesWithIdWhenIdZero = async (item) => {
	let idResult = await localDB()
		.request()
		.query(`insert into [dbo].[Frequency]([to25] ,[to50] ,[to100] ,[to200] ,[to300] ,[to500] ,
				[to700] ,[to1000] ,[to1500] ,[to2000] ,[to3000] ,[to4000] ,
				[to5000]) values (${item.to25},${item.to50},${item.to100},${item.to200},${item.to300},
				${item.to500},${item.to700},${item.to1000},${item.to1500},${item.to2000},${item.to3000},
				${item.to4000},${item.to5000}); SELECT SCOPE_IDENTITY()`)

	const newId = idResult.recordset[0][""]

	const result = await localDB()
		.request()
		.query(`insert into [dbo].[ItemCategoryFrequency](Code,frequencyid) values (${item.Code},${newId})`)

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




