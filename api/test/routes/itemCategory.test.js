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

			const response = await request.get("/itemCategory/getCodes/admin/DK")

			assertEquals(response.text, "Test worked")
		})
	})

	describe("get Item Frequencies", () => {
		it("get Item Frequencies OK", async () => {
			sinon.stub(userModel, "getUserByUsername").returns([{ "role": "admin" }])

			sinon.stub(itemCategoryService, "getFrequenciesOfItem").returns("Test worked")

			const response = await request.get("/itemCategory/getFrequenciesOfCode/admin/193345")

			assertEquals(response.text, "Test worked")
		})
	})

	describe("set Item Frequencies", () => {
		it("set Item Frequencies OK", async () => {
			sinon.stub(userModel, "getUserByUsername").returns([{ "role": "admin" }])

			sinon.stub(itemCategoryService, "setFrequenciesWithId").returns("Test worked")

			const response = await request.post("/itemCategory/setFrequencies/admin")

			assertEquals(response.text, "Test worked")
		})
	})
})

function assertEquals(value1, value2) {
	if (value1 != value2) throw Error("Failed assert values: " + value1 + " and " + value2)
}
