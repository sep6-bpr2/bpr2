const { Router } = require('express')
const router = Router()
import { getUserByUsername } from "../models/login"

// TEST- http://localhost:3000/api/login/rokas
router.get("/:username", async (req, res) => {

    const result = await getUserByUsername(req.params.username)

    res.send(result)
})

module.exports = router