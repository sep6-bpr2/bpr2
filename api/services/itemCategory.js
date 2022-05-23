const model = require("../models/itemCategory")

const defaultFrequencyValue = [{
	"id": 0,
	"frequencyNumber": 0,
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
		value = defaultFrequencyValue
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
