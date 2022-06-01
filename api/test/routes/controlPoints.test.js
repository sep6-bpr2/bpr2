const supertest = require("supertest")
process.env.environment = "testing"
process.env.LOGGING = "false"

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
			const response = await request.get("/controlPoints/allTypes/rafal")
			chai.expect(response.body).to.deep.equal(["number", "text", "options"])
		})
	})
	describe("allAttributesNames", () => {
		it("sunny scenario", async () => {
			sinon.stub(userModel, "getUserByUsername").returns([{ "role": "admin" }])
			sinon.stub(controlPointsService, "getAttributes").returns(["width", "height", "radius"])
			const response = await request.get("/controlPoints/allAttributesNames/rafal")
			chai.expect(response.body).to.deep.equal(["width", "height", "radius"])
		})
	})
	describe("submit create control point", () => {
		it("sunny scenario", async () => {
			sinon.stub(userModel, "getUserByUsername").returns([{ "role": "admin" }])
			sinon.stub(controlPointsService, "submitControlPoint").returns()
			const response = await request.post("/controlPoints/submitControlPoint/rafal")
				.send({
					frequencies: [{name:"to25", value:2},{name:"to50",value:3},{name:"to100",value:4},
						{name:"to200",value:7},{name:"to300",value:10},
						{name:"to500",value:16},{name:"to700",value:22},
						{name:"to1000",value:30},{name:"to1500", value:40},
						{name:"to2000",value:50},{name:"to3000",value:60},
						{name:"to4000",value:65},{name:"to5000",value:70}],
					descriptions: [{lang: "English", value: "test desc"}, {lang: "Danish", value: ""}, {lang: "Lithuanian", value: ""}],
					measurementType: 0,
					type: "number",
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

	describe("controlPointData", () => {
		it("sunny scenario", async () => {
			sinon.stub(userModel, "getUserByUsername").returns([{ "role": "admin" }])
			sinon.stub(controlPointsService, "getControlPointData").returns({})
			const response = await request.get("/controlPoints/controlPointData/admin/1")
			chai.expect(response.status).to.deep.equal(200)
		})
		it("non existing control point id", async () => {
			sinon.stub(userModel, "getUserByUsername").returns([{ "role": "admin" }])
			sinon.stub(controlPointsService, "getControlPointData").returns({message: 'control point does not exist in database'})
			const response = await request.get("/controlPoints/controlPointData/admin/1")
			chai.expect(response.status).to.deep.equal(404)
		})
	})

	describe("submit edit control point", () => {
		it("sunny scenario", async () => {
			sinon.stub(userModel, "getUserByUsername").returns([{ "role": "admin" }])
			sinon.stub(controlPointsService, "updateControlPoint").returns({})
			const response = await request.put("/controlPoints/submitEditControlPoint/rafal")
				.send({
					controlPointId: 13,
					frequencies: [{name:"to25", value:2},{name:"to50",value:3},{name:"to100",value:4},
						{name:"to200",value:7},{name:"to300",value:10},
						{name:"to500",value:16},{name:"to700",value:22},
						{name:"to1000",value:30},{name:"to1500", value:40},
						{name:"to2000",value:50},{name:"to3000",value:60},
						{name:"to4000",value:65},{name:"to5000",value:70}],
					descriptions: [{lang: "English", value: "test desc"}, {lang: "Danish", value: ""}, {lang: "Lithuanian", value: ""}],
					measurementType: 0,
					type: "number",
					upperTolerance: null,
					lowerTolerance: null,
					optionValues: [{value: null}, {value: null}],// {value: '',}
					attributes: [],//{id: '', minValue: 0, maxValue: 0}
					codes: [{value: 25674}, {value: 25674}],
					image: null,
				})
			chai.expect(response.status).to.deep.equal(200)
		})

		it("non existing control point id", async () => {
			sinon.stub(userModel, "getUserByUsername").returns([{ "role": "admin" }])
			sinon.stub(controlPointsService, "updateControlPoint").returns({message: 'control point does not exist in database'})
			const response = await request.put("/controlPoints/submitEditControlPoint/rafal")
				.send({
					controlPointId: 13,
					frequencies: [{name:"to25", value:2},{name:"to50",value:3},{name:"to100",value:4},
						{name:"to200",value:7},{name:"to300",value:10},
						{name:"to500",value:16},{name:"to700",value:22},
						{name:"to1000",value:30},{name:"to1500", value:40},
						{name:"to2000",value:50},{name:"to3000",value:60},
						{name:"to4000",value:65},{name:"to5000",value:70}],
					descriptions: [{lang: "English", value: "test desc"}, {lang: "Danish", value: ""}, {lang: "Lithuanian", value: ""}],
					measurementType: 0,
					type: "number",
					upperTolerance: null,
					lowerTolerance: null,
					optionValues: [{value: null}, {value: null}],// {value: '',}
					attributes: [],//{id: '', minValue: 0, maxValue: 0}
					codes: [{value: 25674}, {value: 25674}],
					image: null,
				})
			chai.expect(response.status).to.deep.equal(404)
		})
	})
	describe("getFrequenciesOfControlPoint", () => {
		it("sunny scenario", async () => {
			sinon.stub(userModel, "getUserByUsername").returns([{ "role": "admin" }])
			sinon.stub(controlPointsService, "getFrequenciesOfControlPoint").returns()
			const response = await request.get("/controlPoints/getFrequenciesOfControlPoint/1/rafal")
			chai.expect(response.status).to.deep.equal(200)
		})
	})

    describe("get list controlpoints minimal", () => {
        it("get list controlpoints minimal OK", async () => {
            sinon.stub(userModel, "getUserByUsername").returns([{ "role": "admin" }])

            sinon.stub(controlPointsService, "controlPointsMinimal").returns("Test worked")

            const response = await request.get("/controlPoints/listMinimal/rokas/gb/0/3")

            assertEquals(response.text, "Test worked")
        })
    })
})

function assertEquals(value1, value2) {
    if (value1 != value2) throw Error("Failed assert values: " + value1 + " and " + value2)
}
