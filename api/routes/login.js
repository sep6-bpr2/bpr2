const { Router } = require('express')
const router = Router()
import { getLogin } from "../models/login"

router.get("/:username", async (req, res) => {
    
    const result = await getLogin(req.params.username)

    res.send(result)
})

module.exports = router