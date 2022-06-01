const supertest = require("supertest")
process.env.environment = "testing"
process.env.LOGGING = "false"

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

    describe("Released orders", () => {
        it("Released orders OK", async () => {
            sinon.stub(userModel, "getUserByUsername").returns([{ "role": "qa employee" }])

            sinon.stub(ordersService, "releasedOrders").returns("Test worked")

            const response = await request.get("/orders/releasedList/minimal/rokas/denmark/0/5")

            assertEquals(response.text, "Test worked")
        })
    })

    describe("Completed orders", () => {
        it("Completed orders OK", async () => {
            sinon.stub(userModel, "getUserByUsername").returns([{ "role": "admin" }])

            sinon.stub(ordersService, "completedOrders").returns("Test worked")

            const response = await request.get("/orders/completedList/minimal/rokas/denmark/0/5")

            assertEquals(response.text, "Test worked")
        })
    })

    describe("Released order full", () => {
        it("Released order full OK", async () => {
            sinon.stub(userModel, "getUserByUsername").returns([{ "role": "qa employee" }])

            sinon.stub(ordersService, "getQAReport").returns("Test worked")

            const response = await request.get("/orders/released/full/worker/47827/53455/gb")

            assertEquals(response.text, "Test worked")
        })
    })

    describe("Completed order full", () => {
        it("Completed order full OK", async () => {
            sinon.stub(userModel, "getUserByUsername").returns([{ "role": "admin" }])

            sinon.stub(ordersService, "getQAReport").returns("Test worked")

            const response = await request.get("/orders/completed/full/worker/47827/24244/gb")

            assertEquals(response.text, "Test worked")
        })
    })

    describe("Save order", () => {
        it("Save order OK", async () => {
            sinon.stub(userModel, "getUserByUsername").returns([{ "role": "qa employee" }])

            sinon.stub(ordersService, "saveQAReport").returns("Test worked")

            const response = await request.put("/orders/save/worker").send(
                {
                    "id": '464545',
                    "categoryCode": '1233',
                    "quantity": '1233',
                    "qaReportId": '1233',
                    "status": 'incomplete',
                } 
            )

            assertEquals(response.text, "Test worked")
        })
    })

    describe("Complete order", () => {
        it("Complete order OK", async () => {
            sinon.stub(userModel, "getUserByUsername").returns([{ "role": "qa employee" }])

            sinon.stub(ordersService, "completeQAReport").returns("Test worked")

            const response = await request.put("/orders/complete/worker").send(
                {
                    "id": '464545',
                    "categoryCode": '1233',
                    "quantity": '1233',
                    "qaReportId": '1233',
                    "status": 'incomplete',
                } 
            )

            assertEquals(response.text, "Test worked")
        })
    })
})

function assertEquals(value1, value2) {
    if (value1 != value2) throw Error("Failed assert values: '" + value1 + "' is not '" + value2 + "'")
}