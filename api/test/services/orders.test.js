require('dotenv').config()
process.env.GCPDBUSER = "testing" // Initialize testing env
const ordersModel = require('../../models/orders')
const ordersService = require('../../services/orders')
const sinon = require('sinon')

describe("Orders service testing", () => {

    afterEach(function () {
        sinon.restore()
    })

    describe("released orders", () => {
        it("released orders OK", async () => {
            sinon.stub(ordersModel, "getReleasedOrders").returns([{ id: "1", }, { id: "2" }])

            const data = await ordersService.releasedOrders("denmark")

            assertEquals(data.length, 2)
        })
    })
})

function assertEquals(value1, value2) {
    if (value1 != value2) throw Error("Failed assert values: " + value1 + " and " + value2)
}