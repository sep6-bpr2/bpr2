const {Router} = require('express')
const router = Router()
const {getAllAttributesNames, getAllTypes, insertControlPoint} =  require("../models/createControlPoint");

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
