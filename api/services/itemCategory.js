const model = require("../models/itemCategory")

module.exports.getItemCatCodes = async (location) => {
	return model.getItemCatCodes(location)
}

module.exports.getFrequenciesOfItem = async (itemCode) => {
	return model.getFrequenciesOfItem(itemCode)
}

module.exports.setFrequenciesWithId = async (item) => {
	return model.setFrequenciesWithId(item)
}
