const model = require("../models/users")

module.exports.login = async (username) => {
    return model.getUserByUsername(username)
}

module.exports.addUser = async (body) => {
	await model.addUser(body)
	return model.getAllUsersWithUser(body)
}

module.exports.removeUser = async (body) => {
	return model.removeUser(body)
}

module.exports.getAllUsers = async (offset, limit) => {
	return model.getAllUsers(offset, limit)
}

module.exports.getAllQAUsers = async () => {
	return model.getAllQAUsers()
}

