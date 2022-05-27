const model = require("../models/itemCategory")
const frequency = require("../../shared/frequency");

module.exports.defaultFrequency = defaultFrequencyValue[0]

module.exports.getItemCatCodes = async (location, offset, limit) => {
	if (location !== 'All') {
        if(limit == 'max'){
            return model.getItemCatCodesWhenLocationNotAllMax(location)
        }else{
            return model.getItemCatCodesWhenLocationNotAll(location, offset, limit)
        }
	}else{
        if(limit == 'max'){
            return model.getItemCatCodesWhenLocationAllMax()
        }else{
            return model.getItemCatCodesWhenLocationAll(offset, limit)
        }
    }
}

module.exports.getFrequenciesOfCategory = async (itemCode) => {
	let value = await model.getFrequenciesOfCategory(itemCode)
	if (value[0] == undefined) {
		value[0] = frequency.defaultFrequency()
	}
	return value
}


module.exports.setFrequenciesWithId = async (item) => {
	if(item.id !== 0){
        await model.expireOldFrequency(item.frequencyNumber)
        return model.insertFrequency(item)
	}

    const latestFrequencyNumber = await model.getLatestFrequencyNumber()
    item.frequencyNumber = latestFrequencyNumber

	return model.insertFrequency(item)
}

module.exports.checkCodeExists = async (itemCode) => {

	return model.checkCodeExists(itemCode)
}
