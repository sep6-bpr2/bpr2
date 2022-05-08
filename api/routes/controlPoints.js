const { Router } = require('express')
const router = Router()
const { param, body } = require('express-validator')
const { validate } = require("../middleware/validateMiddleware")
const { validateUserAdmin, validateUserQA } = require("../middleware/validateUser")
const controlPointService = require("../services/controlPoints")

/**
 * @description - Returns all available types to pick while creating control point
 * @param username - username of the user
 *
 * @example - GET {BaseURL}/api/controlPoints/rafal/allTypes
 */
router.get(
	"/:username/allTypes",
	param("username").isLength({ min: 1, max: 35 }),
	validate,
	validateUserAdmin,
	async (req, res) => {
		const allTypes = await controlPointService.getTypes()
		res.send(allTypes)
	}
)

/**
 * @description - Returns all available attributes to pick while creating control point
 * @param username - username of the user
 *
 * @example - GET {BaseURL}/api/controlPoints/rafal/allAttributesNames
 */
router.get(
	"/:username/allAttributesNames",
	param("username").isLength({ min: 1, max: 35 }),
	validate,
	validateUserAdmin,
	async (req, res) => {
		const result = await controlPointService.getAttributes()
		res.send(result)
	}
)

/**
 * @description - Inserts new control point
 * @param username - username of the user
 * @body controlPoint - all control point data
 *
 * @example - POST {BaseURL}/api/controlPoints/rafal/submitControlPoint
 */
router.post(
	"/:username/submitControlPoint",
	param("username").isLength({ min: 1, max: 35 }),
	validate,
	validateUserAdmin,
	async (req, res) => {
		const result = await controlPointService.submitControlPoint(req.body)
		res.send(result)
	}
)

/**
 * @description - Returns frequencies for specific control point
 * @param username - username of the user
 * @param controlPointId - id of control point
 *
 * @example - GET {BaseURL}/api/controlPoints/rafal/getFrequenciesOfControlPoint/1
 */

router.get("/:username/getFrequenciesOfControlPoint/:controlPointId",
	param("username").isLength({ min: 1, max: 35 }),
	validate,
	validateUserAdmin,
	async (req, res) => {
	let result = await controlPointService.getFrequenciesOfControlPoint(req.params.controlPointId)
	res.send(result)
})

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
		const data = await controlPointService.controlPointsMinimal(req.params.language)
		res.send(data)
	}
)

module.exports = router
