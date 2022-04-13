const model = require("../models/orders")

module.exports.releasedOrders = async (location) => {
    return model.getReleasedOrders(location)
}