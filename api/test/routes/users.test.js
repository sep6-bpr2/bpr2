const supertest = require("supertest")
process.env.environment = "testing"
const server = require("../../server")
const app = server.startServer()
const request = supertest(app)
const sinon = require('sinon')

//Imports in file being tested
const usersService = require('../../services/users')

describe("Users api testing", () => {

    afterEach(function () {
        sinon.restore()
        process.env.environment = "testing"
    })

    describe("get user", () => {
        it("get user OK", async () => {
            sinon.stub(usersService, "login").returns("Test worked")

            const response = await request.get("/users/rokas")

            assertEquals(response.text, "Test worked")
        })
    })
})

function assertEquals(value1, value2) {
    if (value1 != value2) throw Error("Failed assert values: " + value1 + " and " + value2)
}