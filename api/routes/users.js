const { Router } = require('express')
const router = Router()
import { getAllUsers,addUser,checkUserExist } from "../models/users"

// TEST- http://localhost:3000/api/users
router.get("", async (req, res) => {

	const result = await getAllUsers()
	res.send(result)
})

router.post("", async (req,res)=>{
	const result = await addUser(req.body)

	res.send(result)
})


module.exports = router
