const { Router } = require('express')
const router = Router()
const { param, body } = require('express-validator')
const { validate } = require("../middleware/validateMiddleware")
const { validateUserAdmin, validateUserQA, validateAllVerifiedUsers } = require("../middleware/validateUser")
const service = require("../services/controlPoints")
const {getAllTypes, getAllAttributesNames, insertControlPoint,getFrequenciesOfControlPoint} = require("../models/createControlPoint");
const path = require("path");

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

router.post("/uploadPicture/:username",
    param("username").isLength({ min: 4, max: 50 }),
    validate,
    validateUserAdmin,
	async (req, res) => {
        await service.saveImage(req.body.base64)
        res.sendStatus(200)
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

router.get(
	"/allAttributesNames",
	async (req, res) => {
		const result = await getAllAttributesNames()
		res.send(result)
	}
)

router.get("/getFrequenciesOfControlPoint/:controlPointId", async (req, res) => {

	let result = await getFrequenciesOfControlPoint(req.params.controlPointId)

	res.send(result)
})

router.post(
	"/submitControlPoint",
	async (req, res) => {
		const result = await service.createConrolPoint(req.body)
		res.send(result)
	}
)

module.exports = router
