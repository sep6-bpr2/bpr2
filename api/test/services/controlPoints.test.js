require('dotenv').config()
process.env.GCPDBUSER = "testing" // Initialize testing env
const controlPointsModel = require('../../models/controlPoints')
const controlPointsService = require('../../services/controlPoints')
const sinon = require('sinon')

describe("User service testing", () => {

    afterEach(function () {
        sinon.restore()
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

function assertEquals(value1, value2) {
    if (value1 != value2) throw Error("Failed assert values: " + value1 + " and " + value2)
}