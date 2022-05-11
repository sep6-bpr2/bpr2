require('dotenv').config()
process.env.environment = "testing"
const sinon = require('sinon')
const userModel = require("../../models/users")

const validateRole = require('../../middleware/validateUser')

describe("Validate role middleware testing", () => {

    afterEach(function () {
        sinon.restore()
        process.env.environment = "testing"
    })

    describe("Validate admin", () => {
        it("Validate admin OK", async () => {
            sinon.stub(userModel, "getUserByUsername").returns([{ "role": "admin" }])

            let passed = false;
            const req = {
                params: {
                    username: "userId"
                }
            }
            const next = () => {
                passed = true
            }

            await validateRole.validateUserAdmin(req, null, next)

            assertEquals(passed, true)
        })

        it("Validate admin Error", async () => {
            sinon.stub(userModel, "getUserByUsername").returns([{ "role": "asfasfaf" }])

            let passed = false;
            const req = {
                params: {
                    username: "userId"
                }
            }

            const res = {
                sendStatus: (status) => {
                    passed = true
                }
            }

            await validateRole.validateUserAdmin(req, res, null)

            assertEquals(passed, true)
        })
    })

    describe("Validate qa employee", () => {
        it("Validate qa employee OK", async () => {
            sinon.stub(userModel, "getUserByUsername").returns([{ "role": "qa employee" }])

            let passed = false;
            const req = {
                params: {
                    username: "userId"
                }
            }
            const next = () => {
                passed = true
            }

            await validateRole.validateUserQA(req, null, next)

            assertEquals(passed, true)
        })

        it("Validate qa employee Error", async () => {
            sinon.stub(userModel, "getUserByUsername").returns([{ "role": "asfasfaf" }])

            let passed = false;
            const req = {
                params: {
                    username: "userId"
                }
            }

            const res = {
                sendStatus: (status) => {
                    passed = true
                }
            }

            await validateRole.validateUserQA(req, res, null)

            assertEquals(passed, true)
        })
    })
})

function assertEquals(value1, value2) {
    if (value1 != value2) throw Error("Failed assert values: '" + value1 + "' is not '" + value2 + "'")
}