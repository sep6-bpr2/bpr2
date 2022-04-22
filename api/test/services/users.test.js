require('dotenv').config()
process.env.environment = "testing"
const usersModel = require('../../models/users')
const usersService = require('../../services/users')
const sinon = require('sinon')

describe("User service testing", () => {

    afterEach(function () {
        sinon.restore()
    })

    describe("login", () => {
        it("login OK", async () => {
            sinon.stub(usersModel, "getUserByUsername").returns("exists")

            const data = await usersService.login("UserId")

            assertEquals(data, "exists")
        })
    })
})

function assertEquals(value1, value2) {
    if (value1 != value2) throw Error("Failed assert values: " + value1 + " and " + value2)
}