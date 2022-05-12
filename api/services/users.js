const model = require("../models/users")

module.exports.login = async (username) => {
    return model.getUserByUsername(username)
}

module.exports.addUser = async (body) => {
    return model.addUser(body)
}

module.exports.removeUser = async (body) => {
    return model.removeUser(body)
}

module.exports.getAllUsers = async () => {
	return model.getAllUsers()
}

