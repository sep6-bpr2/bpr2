const supertest = require("supertest")
process.env.environment = "testing"
const server = require("../../server")
const app = server.startServer()
const request = supertest(app)
const sinon = require('sinon')

//Imports in file being tested
const ordersService = require('../../services/orders')
const userModel = require("../../models/users")


describe("Orders api testing", () => {

    afterEach(function () {
        sinon.restore()
        process.env.environment = "testing"
    })

    describe("released orders", () => {
        it("released orders OK", async () => {
            sinon.stub(userModel, "getUserByUsername").returns({ "role": "qa employee" })

            sinon.stub(ordersService, "releasedOrders").returns("Test worked")

            const response = await request.get("/orders/releasedList/minimal/rokas/denmark")

            assertEquals(response.text, "Test worked")
        })
    })
})

function assertEquals(value1, value2) {
    if (value1 != value2) throw Error("Failed assert")
}