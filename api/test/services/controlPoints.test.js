require('dotenv').config()
process.env.GCPDBUSER = "testing" // Initialize testing env
const controlPointsModel = require('../../models/controlPoints')
const controlPointsService = require('../../services/controlPoints')
const sinon = require('sinon')
const chai = require('chai')

describe("Control points service testing", () => {

    afterEach(function () {
        sinon.restore()
    })

	describe("getAllTypes", () => {
		it('sunny scenario', async () => {
			sinon.stub(controlPointsModel, "getAllTypes").returns([{type: 3},{type: 1},{type: 0}])

			const data = await controlPointsService.getTypes()
			chai.expect(data[0]).to.be.equal("number")
			chai.expect(data[1]).to.be.equal("text")
			chai.expect(data[2]).to.be.equal("options")
		})

		it("non positive values", async () => {
			sinon.stub(controlPointsModel, "getAllTypes").returns([{type: -5},{type: 3}])

			const data = await controlPointsService.getTypes()
			chai.expect(data[1]).to.be.equal("number")
		})

		it("values out of bound", async () => {
			sinon.stub(controlPointsModel, "getAllTypes").returns([{type: 0},{type: 351}])

			const data = await controlPointsService.getTypes()
			chai.expect(data[0]).to.be.equal("options")
		})

		it("empty list", async () => {
			sinon.stub(controlPointsModel, "getAllTypes").returns([])

			const data = await controlPointsService.getTypes()
			chai.expect(data.length).to.be.equal(0)
		})

	})

    describe("get control points minimal", () => {
        it("get control points minimal OK", async () => {
            sinon.stub(controlPointsModel, "getControlPointsMinimal").returns([{ id: "1", }, { id: "2" }])
            sinon.stub(controlPointsModel, "getDescriptionsByControlPointId").returns([
                { language: "de", description: "sdasdasfafaffad" },
                { language: "gb", description: "sdasdasd" }
            ]);

            const data = await controlPointsService.controlPointsMinimal("gb")

            assertEquals(data.length, 2)
            assertEquals(data[1].id, "2")
            assertEquals(data[1].description, "sdasdasd")
        })

        it("get control points minimal NOT found specified language", async () => {
            sinon.stub(controlPointsModel, "getControlPointsMinimal").returns([{ id: "1", }, { id: "2" }])
            sinon.stub(controlPointsModel, "getDescriptionsByControlPointId").returns([
                { language: "de", description: "sdasdasfafaffad" },
                { language: "gb", description: "sdasdasd" }
            ]);

            const data = await controlPointsService.controlPointsMinimal("lt")

            assertEquals(data.length, 2)
            assertEquals(data[1].id, "2")
            assertEquals(data[1].description, "sdasdasd")
        })

        it("get control points minimal NOT FOUND any language", async () => {
            sinon.stub(controlPointsModel, "getControlPointsMinimal").returns([])

            const data = await controlPointsService.controlPointsMinimal("lt")

            assertEquals(data.length, 0)
        })
    })
})

function assertEquals(actualValue, expectedValue) {
    if (actualValue != expectedValue) throw Error("Failed assert values. Actual: " + actualValue + ", expected: " + expectedValue)
}
