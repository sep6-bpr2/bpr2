const model = require("../models/users")

module.exports.login = async (username) => {
    return model.getUserByUsername(username)
}

module.exports.addUser = async (body) => {
	await model.addUser(body)
	return model.getAllUsersWithUser(body)
}

module.exports.removeUser = async (body) => {
	await model.removeUser(body)
	return model.getAllUsers()
}

module.exports.getAllUsers = async () => {
	return model.getAllUsers()
}

module.exports.getAllQAUsers = async () => {
	return model.getAllQAUsers()
}

