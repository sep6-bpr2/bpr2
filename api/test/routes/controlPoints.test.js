const supertest = require("supertest")
process.env.environment = "testing"
const server = require("../../server")
const app = server.startServer()
const request = supertest(app)
const sinon = require('sinon')
const chai = require('chai')

//Imports in file being tested
const controlPointsService = require('../../services/controlPoints')
const userModel = require("../../models/users")

describe("Control points api testing", () => {

    afterEach(function () {
        sinon.restore()
        process.env.environment = "testing"
    })
	describe("allTypes", () => {
		it("sunny scenario", async () => {
			sinon.stub(controlPointsService, "getTypes").returns(["number", "text", "options"])
			const response = await request.get("/controlPoints/allTypes")
			chai.expect(response.body).to.deep.equal(["number", "text", "options"])
		})
	})

    describe("get list controlpoints minimal", () => {
        it("get list controlpoints minimal OK", async () => {
            sinon.stub(userModel, "getUserByUsername").returns([{ "role": "admin" }])

            sinon.stub(controlPointsService, "controlPointsMinimal").returns("Test worked")

            const response = await request.get("/controlPoints/listMinimal/rokas/gb")

            assertEquals(response.text, "Test worked")
        })
    })
})

function assertEquals(value1, value2) {
    if (value1 != value2) throw Error("Failed assert values: " + value1 + " and " + value2)
}
