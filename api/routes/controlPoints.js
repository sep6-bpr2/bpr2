const { Router } = require('express')
const router = Router()
const { param, body } = require('express-validator')
const { validate } = require("../middleware/validateMiddleware")
const { validateUserAdmin, validateUserQA } = require("../middleware/validateUser")
const service = require("../services/controlPoints")

/**
 * @description - Get all control points with enough information for list
 * @param username - username of the user
 * @param language - proffered language of the user
 *
 * @example - GET {BaseURL}/api/controlPoints/listMinimal/rokas/gb
 */
router.get("/listMinimal/:username/:language",
    param("username").isLength({ min: 1, max: 35 }),
    param("language").isLength({ min: 2, max: 2 }),
    validate,
    validateUserAdmin,
    async (req, res) => {
        const data = await service.controlPointsMinimal(req.params.language)
        res.send(data)
    }
)

module.exports = router
