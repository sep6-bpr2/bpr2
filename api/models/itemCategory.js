const { mssql, konfairDB, localDB } = require('../connections/MSSQLConnection')
const defaultFrequencyValue = [{"id":0,"to25":2,"to50":3,"to100":4,"to200":7,"to300":10,"to500":16,"to700":22,"to1000":30,"to1500":40,"to2000":50,"to3000":60,"to4000":65,"to5000":70}]
module.exports.getItemCatCodes = async () => {
	const result = await konfairDB()
		.request()
		.query(`select Code from [dbo].[KonfAir DRIFT$Item Category]`)
	return result.recordset
}
module.exports.getFrequenciesOfItem = async (itemCode) => {

	const result = await localDB()
		.request()
		.query(`select F.id,[to25] ,[to50] ,[to100] ,[to200] ,[to300] ,[to500] ,
				[to700] ,[to1000] ,[to1500] ,[to2000] ,[to3000] ,[to4000] ,
				[to5000] from [dbo].[ItemCategoryFrequency] I JOIN [dbo].[Frequency] F
				on I.frequencyid = F.id where I.code = ${itemCode}
`)
	if(result.recordset[0] == undefined){
		result.recordset = defaultFrequencyValue
	}
	return result.recordset
}
module.exports.setFrequenciesWithId = async (item) => {
	let result;
	if (item.id !== 0) {
		 result = await localDB()
			.request()
			.query(`update [dbo].[Frequency] set to25 = ${item.to25} ,to50 = ${item.to50} ,to100 = ${item.to100} ,to200 = ${item.to200} ,to300 = ${item.to300} ,to500 = ${item.to500} ,
				to700 = ${item.to700} ,to1000 = ${item.to1000} ,to1500 = ${item.to1500} ,to2000 = ${item.to2000},to3000 = ${item.to3000} ,to4000 = ${item.to4000} ,
				to5000 = ${item.to5000} where id = ${item.id}
`)
	}
	else {
		 let idResult = await localDB()
			.request()
			.query(`insert into [dbo].[Frequency]([to25] ,[to50] ,[to100] ,[to200] ,[to300] ,[to500] ,
				[to700] ,[to1000] ,[to1500] ,[to2000] ,[to3000] ,[to4000] ,
				[to5000]) values (${item.to25},${item.to50},${item.to100},${item.to200},${item.to300},${item.to500},${item.to700},${item.to1000},${item.to1500},${item.to2000},${item.to3000},${item.to4000},${item.to5000}); SELECT SCOPE_IDENTITY()`)

		const newId = idResult.recordset[0][""]

		 result = await localDB()
			.request()
			.query(`insert into [dbo].[ItemCategoryFrequency](Code,frequencyid) values (${item.Code},${newId})`)

	}

	return result.recordset
}




