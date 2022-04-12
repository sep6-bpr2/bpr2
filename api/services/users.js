const model = require("../models/users")

module.exports.login = async (username) => {
    return model.getUserByUsername(username)
}