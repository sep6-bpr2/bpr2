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
 * @example - GET {BaseURL}/api/orders//releasedList/minimal/worker/denmark
 */
router.get("/releasedList/minimal/:username/:location",
    param("username").isLength({ min: 1, max: 35 }),
    param("location").isLength({ min: 1, max: 35 }),
    validate,
    validateUserQA,
    async (req, res) => {
        const data = await service.releasedOrders(req.params.location)
        res.send(data)
    }
)

/**
 * @description - Get the released order by id
 * @param username - name of the user for valiation
 * @param id - id of the selected order
 *
 * @example - GET {BaseURL}/api/orders/released/full/worker/47827/gb
 */
router.get("/released/full/:username/:id/:language",
    param("username").isLength({ min: 1, max: 35 }),
    param("id").isInt().isLength({ min: 1, max: 35 }),
    param("language").isLength({ min: 2, max: 2 }),
    validate,
    validateUserQA,
    async (req, res) => {
        const data = await service.releasedOrderFull(req.params.id)
        res.send(data)
    }
)

module.exports = router