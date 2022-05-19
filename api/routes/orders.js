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
 * @example - GET {BaseURL}/api/orders/releasedList/minimal/worker/denmark
 */
router.get("/releasedList/minimal/:username/:location/:offset/:limit",
    param("username").isLength({ min: 4, max: 50 }),
    param("location").isLength({ min: 2, max: 50 }),
    param("offset").isInt({ min:0, max: 999999999}),
    param("limit").isInt({ min:0, max: 100}),
    validate,
    validateUserQA,
    async (req, res) => {
        const data = await service.releasedOrders(req.params.location, parseInt(req.params.offset), parseInt(req.params.limit))
        res.send(data)
    }
)

/**
 * @description - Get the completed orders
 * @param username - name of the user for valiation
 * @param location - location of the employee to narrow down what orders
 *
 * @example - GET {BaseURL}/api/orders/completedList/minimal/worker/denmark
 */
router.get("/completedList/minimal/:username/:location/:offset/:limit",
    param("username").isLength({ min: 4, max: 50 }),
    param("location").isLength({ min: 2, max: 50 }),
    param("offset").isInt({ min:0, max: 999999999}),
    param("limit").isInt({ min:0, max: 100}),
    validate,
    validateUserAdmin,
    async (req, res) => {
        const data = await service.completedOrders(req.params.location, parseInt(req.params.offset), parseInt(req.params.limit))
        res.send(data)
    }
)

/**
 * @description - Get the released order by id
 * @param username - name of the user for validation
 * @param id - id of the selected order
 *
 * @example - GET {BaseURL}/api/orders/released/full/worker/47827/gb
 */
router.get("/released/full/:username/:id/:language",
    param("username").isLength({ min: 4, max: 50 }),
    param("id").isInt().isLength({ min: 1, max: 35 }),
    param("language").isLength({ min: 2, max: 20 }),
    validate,
    validateUserQA,
    async (req, res) => {
        const data = await service.getQAReport(req.params.id, req.params.language, false, false)
        res.send(data)
    }
)

/**
 * @description - Get the released order by id
 * @param username - name of the user for validation
 * @param id - id of the selected order
 *
 * @example - GET {BaseURL}/api/orders/released/full/worker/47827/gb
 */
router.get("/completed/full/:username/:id/:language",
    param("username").isLength({ min: 4, max: 50 }),
    param("id").isInt().isLength({ min: 1, max: 35 }),
    param("language").isLength({ min: 2, max: 20 }),
    validate,
    validateUserAdmin,
    async (req, res) => {
        const data = await service.getQAReport(req.params.id, req.params.language, true, true)
        res.send(data)
    }
)
/**
 * @description - Save changes to the qa report
 * @param username - name of the user for validation
 * @body - must pass the body of the qa report with some answers filled in
 *
 * @example - GET {BaseURL}/api/orders/save/worker
 */
router.put("/save/:username",
    param("username").isLength({ min: 4, max: 50 }),
    body("id").isInt().isLength({ min: 1, max: 10 }),
    body("categoryCode").isInt().isLength({ min: 1, max: 10 }),
    body("quantity").isInt().isLength({ min: 1, max: 10 }),
    body("qaReportId").isInt().isLength({ min: 1, max: 10 }),
    body("status").isLength({ min: 1, max: 20 }),
    validate,
    validateUserQA,
    async (req, res) => {
        const result = await service.saveQAReport(req.body, req.params.username)
        res.send(result)
    }
)

/**
 * @description - Complete the qa report
 * @param username - name of the user for validation
 * @body - must pass the body of the qa report with all answers filled in
 * 
 * @example - GET {BaseURL}/api/orders/complete/worker
 */
router.put("/complete/:username",
    param("username").isLength({ min: 4, max: 50 }),
    body("id").isInt().isLength({ min: 1, max: 10 }),
    body("categoryCode").isInt().isLength({ min: 1, max: 10 }),
    body("quantity").isInt().isLength({ min: 1, max: 10 }),
    body("qaReportId").isInt().isLength({ min: 1, max: 10 }),
    body("status").isLength({ min: 1, max: 20 }),
    validate,
    validateUserQA,
    async (req, res) => {
        const result = await service.completeQAReport(req.body, req.params.username)
        res.send(result)
    }
)

module.exports = router