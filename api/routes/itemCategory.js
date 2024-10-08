const { Router } = require('express')
const router = Router()
const { validate } = require("../middleware/validateMiddleware")
const { validateUserAdmin, validateUserQA } = require("../middleware/validateUser")
const service = require("../services/itemCategory")
const { param, body } = require("express-validator");

/**
 * @description - get item codes at a location
 * @param username - name of the user for valiation
 * @param location - location of the employee to narrow down item codes
 *
 * @example - GET {BaseURL}/api/itemCategory/getCodes/rokas/dk
 */
router.get("/getCodes/:username/:location/:offset/:limit",
    param("username").isLength({ min: 1, max: 35 }),
    param("location").isLength({ min: 2, max: 50 }),
    param("offset").isInt({ min: 0, max: 999999999 }),
    param("limit").isInt({ min: 0, max: 100 }),
    validate,
    validateUserAdmin,
    async (req, res) => {
        const result = await service.getItemCatCodes(req.params.location, parseInt(req.params.offset), parseInt(req.params.limit))
        res.send(result)
    }
)

router.get("/getCodesMax/:username/:location",
    param("username").isLength({ min: 1, max: 35 }),
    param("location").isLength({ min: 2, max: 50 }),
    validate,
    validateUserAdmin,
    async (req, res) => {
        const result = await service.getItemCatCodes(req.params.location, 0, "max")
        res.send(result)
    }
)


/**
 * @description - check if item exists
 * @param username - name of the user for valiation
 * @param itemCode - item code to find
 *
 * @example - GET {BaseURL}/api/itemCategory/checkItemExists/rokas/193345
 */
router.get("/checkItemExists/:username/:itemCode",
	param("username").isLength({ min: 1, max: 35 }),
	param("itemCode").isLength({ min: 1, max: 50 }),
	validate,
	validateUserAdmin,
	async (req, res) => {

		const result = await service.checkCodeExists(req.params.itemCode)

		res.send(result)
	})

/**
 * @description - get frequency of an item Codes
 * @param username - name of the user for validation
 * @param itemCode - item Code used to get the frequency for the specified value
 *
 * @example - GET {BaseURL}/api/itemCategory/getFrequenciesOfCode/rokas/193345
 */
router.get("/getFrequenciesOfCode/:username/:categoryCode",
    param("username").isLength({ min: 1, max: 35 }),
    param("categoryCode").isLength({ min: 1, max: 35 }),
    validate,
    validateUserAdmin,
    async (req, res) => {
        let result = await service.getFrequenciesOfCategory(req.params.categoryCode)
        res.send(result)
    }
)

/**
 * @description - post update of frequency for given id
 * @param username - name of the user for validation
 * @body id - id needed to update frequencies with the specified value
 *
 * @example - POST {BaseURL}/api/itemCategory/setFrequencies/rokas
 */
router.post("/setFrequencies/:username",
    param("username").isLength({ min: 1, max: 35 }),
    body("frequencyNumber").isInt(),
    body("id").isInt(),
    validate,
    validateUserAdmin,
    async (req, res) => {
        const result = await service.setFrequenciesWithId(req.body)
        res.send(result)
    }
)



module.exports = router
