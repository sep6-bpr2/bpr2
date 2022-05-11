require('dotenv').config()
process.env.environment = "testing"
const itemCategoryModel = require('../../models/itemCategory')
const itemCategoryService = require('../../services/itemCategory')
const sinon = require('sinon')

describe("ItemCategory service testing", () => {

	afterEach(function () {
		sinon.restore()
	})

	describe("FrequencyOfItem", () => {
		it("get Frequency Of Item OK", async () => {
			const defaultFrequencyValue = [{"id":0,"to25":2,"to50":3,"to100":4,"to200":7,"to300":10,"to500":16,"to700":22,"to1000":30,"to1500":40,"to2000":50,"to3000":60,"to4000":65,"to5000":70}]

			sinon.stub(itemCategoryModel, "getFrequenciesOfItem").returns(defaultFrequencyValue)

			const data = await itemCategoryService.getFrequenciesOfItem(193345)

			assertEquals(data, defaultFrequencyValue)
			assertEquals(data[0]["to25"],2)
		})

		it("set frequencyOfItem", async ()=>{
			sinon.stub(itemCategoryModel, "setFrequenciesWithId").returns("result ok")

			const data = await itemCategoryService.setFrequenciesWithId("random Item Value")

			assertEquals(data, "result ok")


		})

	})

})

function assertEquals(value1, value2) {
	if (value1 != value2) throw Error("Failed assert values: " + value1 + " and " + value2)
}
