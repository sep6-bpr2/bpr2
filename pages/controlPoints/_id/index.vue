<template>
	<div>
		<AlertModal
			:id="1"
			:message="alert.message"
			:show="alert.show"
			:status="alert.status"
		/>
		<div
			v-if="!alert.show"
		>
			<div class="pageHeader">
				<Translate text="Edit control point"/>
				<p style="margin: 0pt">&nbsp-&nbspID: {{ $route.params.id }}</p>
			</div>
			<ControlPoint
				:submit="submit"
				:is-edit="true"
				:delete-cp="deleteControlPoint"
				:cp-data="cpData"
				:attributes-names="attributeNames"
				:codes-choice="itemCategories"
				:all-types="allTypes"
			></ControlPoint>
		</div>
	</div>
</template>

<script>
import ControlPoint from "../../../components/ControlPoint";
import Translate from "../../../components/Translate";
import {translate} from "../../../mixins/translate";
import {authorizeUser} from "../../../mixins/authorizeUser.js"

export default {
	components: {Translate, ControlPoint},
	mixins: [translate, authorizeUser],
	data: () => ({
		cpData: {
			controlPointNumber: null,
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
			optionValues: [],// {value: '',}
			attributes: [],//{id: '', minValue: 0, maxValue: 0}
			codes: [],
			image: null,
		}
	}),
	created() {
		this.$store.dispatch("createControlPoint/getAllTypes")
		this.$store.dispatch("createControlPoint/getAllAttributesNames")
		this.$store.dispatch("createControlPoint/loadItemCategoryCodes")
		this.$store
			.dispatch("createControlPoint/getControlPointData", this.$route.params.id).then(result =>{
			if(result){
				this.cpData = result
			}
		})
	},
	computed: {
		alert() {
			return this.$store.state.createControlPoint.alert
		},
		allTypes() {
			return this.$store.state.createControlPoint.allTypes
		},
		attributeNames() {
			return this.$store.state.createControlPoint.attributesNames
		},
		itemCategories() {
			return this.$store.state.createControlPoint.allItemCodes
		},
	},
	methods: {
		submit(validateAll, showAlert,submitFrequency) {
			if (validateAll() && submitFrequency() ) {
				let value = this.cpData
				this.$store.dispatch('createControlPoint/submitEditControlPoint', {
					controlPointId: this.$route.params.id,
					controlPointNumber: value.controlPointNumber,
					frequencyId: value.frequencyId,
					descriptions: value.descriptions,
					type: value.type,
					measurementType: value.measurementType,
					upperTolerance: value.upperTolerance,
					lowerTolerance: value.lowerTolerance,
					optionValues: value.type == 'options'? value.optionValues: [],
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
		deleteControlPoint(){
				this.$store.dispatch('createControlPoint/deleteControlPoint', this.$route.params.id)
					.then( resolved => {
						if(resolved){ this.$router.push('/controlPoints');}
					})
		}
	}
};
</script>

<style>

</style>
