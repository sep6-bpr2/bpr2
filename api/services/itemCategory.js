const model = require("../models/itemCategory")
const defaultFrequencyValue = [{
	"id": 0,
	"to25": 2,
	"to50": 3,
	"to100": 4,
	"to200": 7,
	"to300": 10,
	"to500": 16,
	"to700": 22,
	"to1000": 30,
	"to1500": 40,
	"to2000": 50,
	"to3000": 60,
	"to4000": 65,
	"to5000": 70
}]


module.exports.getItemCatCodes = async (location) => {
	if (location !== 'All') {
		return model.getItemCatCodesWhenLocationNotAll(location)
	}
	return model.getItemCatCodesWhenLocationAll()
}

module.exports.getFrequenciesOfItem = async (itemCode) => {
	let value = await model.getFrequenciesOfItem(itemCode)
	if (value[0] == undefined) {
		value = defaultFrequencyValue
	}
	return value
}


module.exports.setFrequenciesWithId = async (item) => {
	if(item.id !== 0){
		return model.setFrequenciesWithIdWhenIdNotZero(item)
	}
	return model.setFrequenciesWithIdWhenIdZero(item)
}

module.exports.checkCodeExists = async (itemCode) => {

	return model.checkCodeExists(itemCode)
}
