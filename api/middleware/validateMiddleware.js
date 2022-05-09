const validator = require('express-validator')

module.exports.validate = async (req, res, next) => {
	const errors = validator.validationResult(req)
	if (!errors.isEmpty()) {
		res.status(400).json({errors: errors.array()})
	} else {
		next()
	}
}

module.exports.validateListEntriesNotEmpty = (value, notEmptyRequirement) => {
	let result = value.filter(desc =>
		desc.value !== "" &&
		desc.value !== null &&
		desc.value !== undefined)

	if (result.length < notEmptyRequirement) {
		throw new Error("value is not valid");
	} else {
		return value;
	}
}

module.exports.validateInRange = (value, from, to) => {
	if (value > to || value < from) {
		throw new Error("value is not valid");
	} else {
		return value;
	}
}

module.exports.validateNullOrInt = (value) => {
	if (value == null || !isNaN(parseInt(value))) {
		if (value == null || value >= 1 && value <= 9999999) {
			return true;
		} else {
			throw new Error('Value is not valid');
		}
	} else {
		throw new Error('Value is not null or int');
	}
}

module.exports.checkUserIdOrNull = (value, checkUserId) => {
	if (checkUserId == 1) {
		if (value.length >= 28 && value.length <= 35) {
			return true
		} else {
			throw new Error('Value is out of bounds');
		}
	} else if (checkUserId == 0 && value == "none") {
		return true
	} else {
		throw new Error('User id must be "none" if disabled');
	}
}
