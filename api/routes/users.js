const { Router } = require('express')
const router = Router()
const { param, body } = require('express-validator')
const { validate } = require("../middleware/validateMiddleware")
const service = require("../services/users")
const {validateUserAdmin} = require("../middleware/validateUser");


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
router.get("/getAllUsers", async (req, res) => {
	const result = await service.getAllUsers()
	res.send(result)
})


//{username: "", role:""}
/**
 * @description - add user to the system
 * @body - user to add to the system
 *
 * @example - POST {BaseURL}/api/users/addUser/rokas
 */
router.post("/addUser/:username",param("username").isLength({ min: 1, max: 35 }),validateUserAdmin, async (req, res) => {
	body("username").isString()
	body("role").isString()
	console.log(JSON.stringify(req.body) + "##########")
	const result = await service.addUser(req.body)

    res.send(result)
})

/**
 * @description - delete user from the system
 * @body - user to remove from the system
 *
 * @example - POST {BaseURL}/api/users/deleteUser/rokas
 */
router.delete("/deleteUser/:username",param("username").isLength({ min: 1, max: 35 }), async (req, res) => {
	body("username").isString()
	body("role").isString()
	console.log(JSON.stringify(req.body) + "##########")
	const result = await service.removeUser(req.body)

    res.send(result)
})

module.exports = router
