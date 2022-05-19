const { Router } = require('express')
const router = Router()
const { param, body } = require('express-validator')
const { validateUserAdmin, validateUserQA, validateAllVerifiedUsers } = require("../middleware/validateUser")
const path = require("path");
const { validate, validateAtLeastOneListEntryNotEmpty, validateInRange, validateNullOrInt, validateListEntriesNotEmpty } = require("../middleware/validateMiddleware")
const controlPointService = require("../services/controlPoints")


/**
 * @description - Returns all available types to pick while creating control point
 * @param username - username of the user
 *
 * @example - GET {BaseURL}/api/controlPoints/allTypes/rafal
 */
router.get("/allTypes/:username",
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
 * @example - GET {BaseURL}/api/controlPoints/allAttributesNames/rafal
 */
router.get("/allAttributesNames/:username",
    param("username").isLength({ min: 1, max: 35 }),
    validate,
    validateUserAdmin,
    async (req, res) => {
        const result = await controlPointService.getAttributes()
        res.send(result)
    }
)

/**
 * @description - Returns all available attributes to pick while creating control point
 * @param username - username of the user
 *
 * @example - GET {BaseURL}/api/controlPoints/allAttributesNames/rafal
 */
router.get(
	"/controlPointData/:username/:cpid",
	param("username").isLength({ min: 1, max: 35 }),
	param('cpid').isInt(),
	validate,
	validateUserAdmin,
	async (req, res) => {
		const result = await controlPointService.getControlPointData(req.params.cpid)
		if (result.hasOwnProperty('message')) {
			if(result.message.includes('does not exist')) res.status(404)
		}
		res.send(result)
	}
)

/**
 * @description - Inserts new control point
 * @param username - username of the user
 * @body frequencies - list with frequencies
 * @body descriptions - list of descriptions where at least one has some value
 * @body type - type of control point value
 * @body upperTolerance - upper tolerance for measure
 * @body lowerTolerance - lower tolerance for measure
 * @body optionValues - list with options
 * @body attributes - list with attributes
 * @body codes - list with codes where all of them can not be null or empty
 *
 * @example - POST {BaseURL}/api/controlPoints/submitControlPoint/rafal
 */
router.post("/submitControlPoint/:username",
    param("username").isLength({ min: 1, max: 35 }),
    body("frequencies").isArray(),
    body("descriptions").custom((value) => validateListEntriesNotEmpty(value, 1)),
    body("measurementType").isInt(),
	body("type").isString(),
    body("upperTolerance").custom(value => validateNullOrInt(value)),
    body("lowerTolerance").custom(value => validateNullOrInt(value)),
    body("optionValues").isArray(),
    body("attributes").isArray(),
    body("codes").custom(value => validateListEntriesNotEmpty(value, value.length)),
    validate,
    validateUserAdmin,
    async (req, res) => {
        const result = await controlPointService.submitControlPoint(req.body)
        res.send(result)
    }
)


/**
 * @description - Edits existing control point
 * @param username - username of the user
 * @body controlPointId - id of control point to change
 * @body frequencies - list with frequencies
 * @body descriptions - list of descriptions where at least one has some value
 * @body type - type of control point value
 * @body upperTolerance - upper tolerance for measure
 * @body lowerTolerance - lower tolerance for measure
 * @body optionValues - list with options
 * @body attributes - list with attributes
 * @body codes - list with codes where all of them can not be null or empty
 *
 * @example - PUT {BaseURL}/api/controlPoints/submitEditControlPoint/rafal
 */
router.put(
	"/submitEditControlPoint/:username",
	param("username").isLength({ min: 1, max: 35 }),
	body("controlPointId").isInt(),
	body("frequencies").isArray(),
	body("descriptions").custom((value) => validateListEntriesNotEmpty(value, 1)),
	body("measurementType").isInt(),
	body("type").isString(),
	body("upperTolerance").custom(value => validateNullOrInt(value)),
	body("lowerTolerance").custom(value => validateNullOrInt(value)),
	body("optionValues").isArray(),
	body("attributes").isArray(),
	body("codes").custom(value => validateListEntriesNotEmpty(value, value.length)),
	validate,
	validateUserAdmin,
	async (req, res) => {
		const data = await controlPointService.updateControlPoint(req.body)
		if (data.hasOwnProperty('message')) {
			if(data.message.includes('does not exist')) res.status(404)
		}
		res.send({})
	}
)

/**
 * @description - Returns frequencies for specific control point
 * @param username - username of the user
 * @param controlPointId - id of control point
 *
 * @example - GET {BaseURL}/api/controlPoints/getFrequenciesOfControlPoint/1/simon
 */
router.get("/getFrequenciesOfControlPoint/:controlPointId/:username",
    param("username").isLength({ min: 1, max: 35 }),
    validate,
    validateUserAdmin,
    async (req, res) => {
        let result = await controlPointService.getFrequenciesOfControlPoint(req.params.controlPointId)
        res.send(result)
    }
)

/**
 * @description - Get all control points with enough information for list
 * @param username - username of the user
 * @param language - proffered language of the user
 *
 * @example - GET {BaseURL}/api/controlPoints/listMinimal/rokas/gb
 */
router.get("/listMinimal/:username/:language/:offset/:limit",
    param("username").isLength({ min: 1, max: 35 }),
    param("language").isLength({ min: 2, max: 20 }),
    param("offset").isInt({ min:0, max: 999999999}),
    param("limit").isInt({ min:0, max: 100}),
    validate,
    validateUserAdmin,
    async (req, res) => {
        const data = await controlPointService.controlPointsMinimal(req.params.language, parseInt(req.params.offset), parseInt(req.params.limit))
        res.send(data)
    }
)

router.get("/picture/:username/:pictureName",
    param("username").isLength({ min: 4, max: 50 }),
    param("pictureName").isLength({ min: 4, max: 200 }),
    validate,
    validateAllVerifiedUsers,
    async (req, res) => {
        res.sendFile(path.join(__dirname, "../pictures/" + req.params.pictureName));
    }
)

module.exports = router
