const userModel = require("../models/users")

module.exports.validateUserAdmin = async (req, res, next) => {
    const user = await userModel.getUserByUsername(req.params.username)

    if (user[0] && user[0].role == "admin") {
        next()
    } else {
        res.sendStatus(403)
    }
}

module.exports.validateUserQA = async (req, res, next) => {
    const user = await userModel.getUserByUsername(req.params.username)

    if (user[0] && user[0].role == "qa employee") {
        next()
    } else {
        res.sendStatus(403)
    }
}