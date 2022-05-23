<template>
	<div>
		<div class="pageHeader">
			<Translate text="Create control point"/>
		</div>
		<ControlPoint
			:submit="submit"
			:is-edit="false"
			:cp-data="cpData"
			:attributes-names="attributeNames"
			:codes-choice="itemCategories"
			:all-types="allTypes"
			:all-measurement-types="allMeasurementTypes"
		></ControlPoint>
	</div>
</template>

<script>
import {translate} from "../../../mixins/translate.js"
import ControlPoint from "../../../components/ControlPoint.vue";
import Translate from "../../../components/Translate.vue";
import {authorizeUser} from "../../../mixins/authorizeUser.js"

export default {
	name: "index",
	components: {Translate, ControlPoint},
	mixins: [translate, authorizeUser],
	data: () => ({
		cpData: {
			allMeasurementTypes: [{name: "one time", value: 1}, {name: "multiple times", value: 0}],
			defaultFrequency: {
				"id": 0,
				"to25": 2,
				"to50": 3,
				"to100": 4,
				"to200": 7,
				"to300": 10,
				"to500": 16,
				"to700": 22,
				"to1000": 30,
				"to1500": 40,
				"to2000": 50,
				"to3000": 60,
				"to4000": 65,
				"to5000": 70
			},
			frequencies: null,
			descriptions: [{lang: "English", value: ""}, {lang: "Danish", value: ""}, {lang: "Lithuanian", value: ""}],
			measurementType: null,
			type: null,
			upperTolerance: null,
			lowerTolerance: null,
			optionValues: [{value: null}, {value: null}],// {value: '',}
			attributes: [],//{id: '', minValue: 0, maxValue: 0}
			codes: [{value: null}],
			image: null,
			imagePreview: null,
			alert: {show: false, message: "", status: 0}
		}
	}),
	created() {
		this.$store.dispatch("createControlPoint/getAllTypes")
		this.$store.dispatch("createControlPoint/getAllAttributesNames")
		this.$store.dispatch("createControlPoint/loadItemCategoryCodes")
	},
	computed: {
		allTypes() {
			return this.$store.state.createControlPoint.allTypes
		},
		attributeNames() {
			return this.$store.state.createControlPoint.attributesNames
		},
		itemCategories() {
			return this.$store.state.createControlPoint.allItemCodes
		},
		allMeasurementTypes() {
			return this.cpData.allMeasurementTypes
		},
	},
	methods: {

		submit(validateAll, showAlert,validateFrequency) {
			console.log(validateFrequency)
			if (validateAll() && submitFrequency()) {


				let value = this.cpData
				this.$store.dispatch('createControlPoint/submitControlPoint', {
					descriptions: value.descriptions,
					type: value.type,
					measurementType: value.measurementType,
					upperTolerance: value.upperTolerance,
					lowerTolerance: value.lowerTolerance,
					optionValues: value.optionValues,
					attributes: value.attributes,
					codes: value.codes,
					image: value.image,
					frequencies: value.frequencies,
				}).then(result => {
					if (result) {
						showAlert('success', this.translateText('control point has been created'))
					} else {
						showAlert('warning', this.translateText('something went wrong, control point has not been inserted'))
					}
				})
			}
		},


	}
}
</script>

<style scoped>
.column {
	width: 50%;
	float: left;
}

.v-card {
	width: -webkit-fill-available;
	margin: 15pt;
	padding: 5pt;
	float: left;
}

p {
	margin-inline: 10pt;
}

.row {
	display: flex;
	flex-direction: row;
	align-items: baseline;
}

.innerElement {
	margin: 5pt;
}

.multiValueCard {
	display: flex;
	flex-direction: column;
}

.valueEntry {
	display: flex;
	flex-direction: row;
	align-items: baseline;
	margin: 5pt;
	justify-content: space-between;
}

.image {
	max-width: 300pt;
	max-height: 300pt;
}

.bottomButtons {
	width: 100%;
	float: left;
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	margin-bottom: 10pt;

}

button {
	background-color: #555 !important;
	color: white !important;
}

v-input {
	width: inherit !important;
}

.alert {
	position: fixed;
	top: 90%;
	width: 60%;
	right: 20%;
	left: 20%;
}
</style>

