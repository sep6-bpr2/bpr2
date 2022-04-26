const { Router } = require('express')
const router = Router()
const { param, body } = require('express-validator')
const { validate } = require("../middleware/validateMiddleware")
const { validateUserAdmin, validateUserQA } = require("../middleware/validateUser")
const service = require("../services/controlPoints")
const {getAllTypes, getAllAttributesNames, insertControlPoint} = require("../models/createControlPoint");

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

router.get(
	"/allTypes",
	async (req, res) => {
		const allTypes = await getAllTypes()
		res.send(
			allTypes.map(obj => {
				switch (obj.type) {
					case 1:
						return "number"
					case 2:
						return "text"
					case 3:
						return "options"
					default:
						return "unknown"
				}
			})
		)
	}
)

router.get(
	"/allAttributesNames",
	async (req, res) => {
		const result = await getAllAttributesNames()
		res.send(result)
	}
)

router.post(
	"/submitControlPoint",
	async (req, res) => {
		const result = await insertControlPoint(req.body)
		res.send(result)
	}
)

module.exports = router
