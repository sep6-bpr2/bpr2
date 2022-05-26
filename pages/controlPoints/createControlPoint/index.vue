<template>
	<div v-show="this.$store.state.login.user">
		<div class="pageHeader">
			<Translate text="Create control point"/>
		</div>
		<ControlPoint
			:submit="submit"
			:is-edit="false"
			:cp-data="cpData"
			:attributes-names="this.$store.state.controlPoint.attributesNames"
			:codes-choice="this.$store.state.controlPoint.allItemCodes"
			:all-types="this.$store.state.controlPoint.allTypes"
			:all-measurement-types="this.$store.state.controlPoint.allMeasurementTypes"
		></ControlPoint>
	</div>
</template>

<script>
import {translate} from "../../../mixins/translate.js"
import ControlPoint from "../../../components/ControlPoint.vue";
import Translate from "../../../components/Translate.vue";
import {authorizeUser} from "../../../mixins/authorizeUser.js"
import {header} from "../../../mixins/header";

export default {
	name: "index",
	components: {Translate, ControlPoint},
	mixins: [translate, authorizeUser,header],
	data: () => ({
		cpData: {
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
			attributes: [],//{id: '', minValue: 0, maxValue: 0, type: 0}
			codes: [{value: null}],
			image: null,
			imagePreview: null,
			alert: {show: false, message: "", status: 0}
		}
	}),
	created() {
		this.$store.dispatch("controlPoint/getAllTypes")
		this.$store.dispatch("controlPoint/getAllAttributesNames")
		this.$store.dispatch("controlPoint/loadItemCategoryCodes")
	},
	methods: {

		submit(validateAll, showAlert,validateFrequency) {
			if (validateAll() && validateFrequency()) {
				let value = this.cpData
				this.$store.dispatch('controlPoint/submitControlPoint', {
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

</style>

