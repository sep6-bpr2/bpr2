const supertest = require("supertest")
process.env.environment = "testing"
const server = require("../../server")
const app = server.startServer()
const request = supertest(app)
const sinon = require('sinon')

//Imports in file being tested
const locationService = require('../../services/location')

describe("location api testing", () => {

	afterEach(function () {
		sinon.restore()
		process.env.environment = "testing"
	})

	describe("get Locations", () => {
		it("get Location OK", async () => {
			sinon.stub(locationService, "getAllLocations").returns("Test worked")

			const response = await request.get("/location/getlocations")

			assertEquals(response.text, "Test worked")
		})
	})
})

function assertEquals(value1, value2) {
	if (value1 != value2) throw Error("Failed assert values: " + value1 + " and " + value2)
}
