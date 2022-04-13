const { Router } = require('express')
const router = Router()
const { param, body } = require('express-validator')
const { validate } = require("../middleware/validateMiddleware")
const { validateUserAdmin, validateUserQA } = require("../middleware/validateUser")
const service = require("../services/orders")


/**
 * @description - Get the released orders
 * @param username - name of the user for valiation
 * @param location - location of the employee to narrow down what orders
 *
 * @example - GET {BaseURL}/api/orders/released/rokas/denmark
 */
router.get("/released/:username/:location",
    param("username").isLength({ min: 1, max: 35 }),
    param("location").isLength({ min: 1, max: 35 }),
    validate,
    validateUserQA,
    async (req, res) => {
        const data = await service.releasedOrders(req.params.location)
        res.send(data)
    }
)

module.exports = router