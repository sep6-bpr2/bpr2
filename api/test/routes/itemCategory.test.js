const supertest = require("supertest")
process.env.environment = "testing"
const server = require("../../server")
const app = server.startServer()
const request = supertest(app)
const sinon = require('sinon')

//Imports in file being tested
const itemCategoryService = require('../../services/itemCategory')
const userModel = require("../../models/users")

describe("itemCategory Api testing", () => {

	afterEach(function () {
		sinon.restore()
		process.env.environment = "testing"
	})

	describe("get Item Codes", () => {
		it("get Item Codes OK", async () => {
			sinon.stub(userModel, "getUserByUsername").returns([{ "role": "admin" }])

			sinon.stub(itemCategoryService, "getItemCatCodes").returns("Test worked")

			const response = await request.get("/itemCategory/getCodes/admin/DK/2/4")

			assertEquals(response.text, "Test worked")
		})
	})

	describe("get Item Frequencies", () => {
		it("get Item Frequencies OK", async () => {
			sinon.stub(userModel, "getUserByUsername").returns([{ "role": "admin" }])

			sinon.stub(itemCategoryService, "getFrequenciesOfCategory").returns("Test worked")

			const response = await request.get("/itemCategory/getFrequenciesOfCode/admin/193345")

			assertEquals(response.text, "Test worked")
		})
	})

	describe("set Item Frequencies", () => {
		it("set Item Frequencies OK", async () => {
			sinon.stub(userModel, "getUserByUsername").returns([{ "role": "admin" }])

			sinon.stub(itemCategoryService, "setFrequenciesWithId").returns("Test worked")

			const response = await request.post("/itemCategory/setFrequencies/admin").send({"id":12,"to25":233457,"to50":3676,"to100":4,"to200":7,"to300":10,"to500":16,"to700":22,"to1000":30,"to1500":40,"to2000":50,"to3000":6079,"to4000":65,"to5000":70,"Code":193345,"frequencyNumber":2})

			assertEquals(response.text, "Test worked")
		})
	})
})

function assertEquals(value1, value2) {
	if (value1 != value2) throw Error("Failed assert values: " + value1 + " and " + value2)
}
