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
			sinon.stub(userModel, "getUserByUsername").returns([{ "role": "admin" }])
			sinon.stub(controlPointsService, "getTypes").returns(["number", "text", "options"])
			const response = await request.get("/controlPoints/rafal/allTypes")
			chai.expect(response.body).to.deep.equal(["number", "text", "options"])
		})
	})
	describe("allAttributesNames", () => {
		it("sunny scenario", async () => {
			sinon.stub(userModel, "getUserByUsername").returns([{ "role": "admin" }])
			sinon.stub(controlPointsService, "getAttributes").returns(["width", "height", "radius"])
			const response = await request.get("/controlPoints/rafal/allAttributesNames")
			chai.expect(response.body).to.deep.equal(["width", "height", "radius"])
		})
	})
	describe("submitControlPoint", () => {
		it("sunny scenario", async () => {
			sinon.stub(userModel, "getUserByUsername").returns([{ "role": "admin" }])
			sinon.stub(controlPointsService, "submitControlPoint").returns()
			const response = await request.post("/controlPoints/rafal/submitControlPoint")
				.send({
					frequencies: [],
					descriptions: [{lang: "English", value: "test desc"}, {lang: "Danish", value: ""}, {lang: "Lithuanian", value: ""}],
					type: 1,
					upperTolerance: null,
					lowerTolerance: null,
					optionValues: [{value: null}, {value: null}],// {value: '',}
					attributes: [],//{id: '', minValue: 0, maxValue: 0}
					codes: [{value: 25674}, {value: 25674}],
					image: null,
				})
			chai.expect(response.status).to.deep.equal(200)
		})
	})
	describe("getFrequenciesOfControlPoint", () => {
		it("sunny scenario", async () => {
			sinon.stub(userModel, "getUserByUsername").returns([{ "role": "admin" }])
			sinon.stub(controlPointsService, "getFrequenciesOfControlPoint").returns()
			const response = await request.get("/controlPoints/rafal/getFrequenciesOfControlPoint/1")
			chai.expect(response.status).to.deep.equal(200)
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
