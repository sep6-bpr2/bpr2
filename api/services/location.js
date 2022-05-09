const model = require("../models/location");

module.exports.getAllLocations = async () => {
	return model.getAllLocations()
}
