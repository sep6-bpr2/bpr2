const { Router } = require('express')
const router = Router()
const { validate } = require("../middleware/validateMiddleware")
const service = require("../services/location")

/**
 * @description - get locations available in the system
 *
 * @example - GET {BaseURL}/api/location/getLocations
 */
router.get("/getLocations" , async (req, res) => {
	const result = await service.getAllLocations()
	res.send(result)
})

module.exports = router
