const { Router } = require('express')
const router = Router()
const {getItemCatCodes,getFrequenciesOfItem,setFrequenciesWithId } = require("../models/itemCategory");

// TEST- http://localhost:3000/itemCategory/
router.get("/getCodes", async (req, res) => {

	const result = await getItemCatCodes()

	res.send(result)
})

router.get("/getFrequenciesOfCode/:itemCode", async (req, res) => {

	let result = await getFrequenciesOfItem(req.params.itemCode)

	res.send(result)
})

router.post("/setFrequencies", async (req, res) => {

	const result = await (setFrequenciesWithId(req.body))
	res.send(result)
})



module.exports = router
