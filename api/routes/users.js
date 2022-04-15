const { Router } = require('express')
const router = Router()
const { param, body } = require('express-validator')
const { validate } = require("../middleware/validateMiddleware")
const service = require("../services/users")


/**
 * @description - Pass username and get back the user if he exists
 * @param username - integer, id for which to get comments for.
 *
 * @example - GET {BaseURL}/api/users/rokas
 */
router.get("/:username",
    param("username").isLength({ min: 1, max: 35 }),
    validate,
    async (req, res) => {
        const data = await service.login(req.params.username)
        res.send(data)
    }
)

router.post("/", async (req, res) => {
    const result = await service.addUser(req.body)

    res.send(result)
})

module.exports = router