const {Router} = require('express')
const router = Router()
import {getAllAttributesNames, getAllTypes, insertControlPoint} from "../models/createControlPoint";
const fs = require('fs')

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
	"/uploadImage",
	async (req, res) => {
		const result = req.body;
		console.log("hello "+ JSON.stringify(result))

		res.send(result)
	}
)
function getBinaryFromFile(file) {
	return new Promise((resolve, reject) => {
		const reader = fs

		reader.addEventListener("load", () => resolve(reader.result));
		reader.addEventListener("error", err => reject(err));

		reader.readAsBinaryString(file);
	});
}



router.post(
	"/submitControlPoint",
	async (req, res) => {
		const result = await insertControlPoint(req.body)
		res.send(result)
	}
)

module.exports = router
