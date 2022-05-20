const supertest = require("supertest")
process.env.environment = "testing"
process.env.LOGGING = "false"

const server = require("../../server")
const app = server.startServer()
const request = supertest(app)
const sinon = require('sinon')

//Imports in file being tested
const usersService = require('../../services/users')
const userModel = require("../../models/users");

describe("Users api testing", () => {

    afterEach(function () {
        sinon.restore()
        process.env.environment = "testing"
    })

    describe("get user", () => {
        it("get user OK", async () => {
            sinon.stub(usersService, "login").returns("Test worked")

			const response = await request.get("/users/getUser/rokas")
            assertEquals(response.text, "Test worked")
        })
    })

	describe('delete user',()=>{
		it('deletes user OK', async() =>{
			sinon.stub(usersService, "removeUser").returns("Test worked")
			sinon.stub(userModel, "getUserByUsername").returns([{ "role": "admin" }])


			const response = await request.delete("/users/deleteUser/rokas").send({username: "Orochimaru", role: "admin"})
			assertEquals(response.text, "Test worked")
		})
	})
})

function assertEquals(value1, value2) {
    if (value1 != value2) throw Error("Failed assert values: '" + value1 + "' is not '" + value2 + "'")
}
