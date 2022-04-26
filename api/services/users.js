const model = require("../models/users")

module.exports.login = async (username) => {
    return model.getUserByUsername(username)
}

module.exports.addUser = async (body) => {
    return model.addUser(body)
}

module.exports.getAllUsers = async (body) => {
	return model.getAllUsers(body)
}
