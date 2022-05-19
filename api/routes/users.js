const { Router } = require('express')
const router = Router()
const { param, body } = require('express-validator')
const { validate } = require("../middleware/validateMiddleware")
const { validateUserAdmin, validateUserQA } = require("../middleware/validateUser")

const service = require("../services/users")


/**
 * @description - Pass username and get back the user if he exists
 * @param username - value of the username needed to find if user exists .
 *
 * @example - GET {BaseURL}/api/users/rokas
 */
router.get("/getUser/:username",
    param("username").isLength({ min: 1, max: 35 }),
    validate,
    async (req, res) => {
        const data = await service.login(req.params.username)
        res.send(data)
    }
)

/**
 * @description - get all users in the system
 *
 * @example - GET {BaseURL}/api/users/
 */
router.get("/getAllUsers/:offset/:limit",
    param("offset").isInt({ min: 0, max: 999999999 }),
    param("limit").isInt({ min: 0, max: 100 }),
    validate,
    async (req, res) => {
        const result = await service.getAllUsers(parseInt(req.params.offset), parseInt(req.params.limit))
        res.send(result)
    }
)


/**
 * @description - add user to the system
 * @body - user to add to the system
 *
 * @example - POST {BaseURL}/api/users/
 */
router.post("/addUser", async (req, res) => {
    const result = await service.addUser(req.body)

    res.send(result)
})

module.exports = router
