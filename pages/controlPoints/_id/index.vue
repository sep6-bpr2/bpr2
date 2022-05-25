<template>
	<div v-show="this.$store.state.login.user">
		<AlertModal
			:id="1"
			:message="alert.message"
			:show="alert.show"
			:status="alert.status"
		/>
		<div
			v-if="!alert.show  && cpData!= null"
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
				:attributes-names="this.$store.state.controlPoint.attributesNames"
				:codes-choice="this.$store.state.controlPoint.allItemCodes"
				:all-types="this.$store.state.controlPoint.allTypes"
				:all-measurement-types="this.$store.state.controlPoint.allMeasurementTypes"
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
		},
	}),
	created() {
		this.$store.dispatch("controlPoint/getAllTypes")
		this.$store.dispatch("controlPoint/getAllAttributesNames")
		this.$store.dispatch("controlPoint/loadItemCategoryCodes")
		this.$store
			.dispatch("controlPoint/getControlPointData", this.$route.params.id).then(result =>{
			if(result){
				this.cpData = result
			}
		})
	},
	computed: {
		alert() {
			return this.$store.state.controlPoint.alert
		},
	},
	methods: {
		submit(validateAll, showAlert, validateFrequency) {
			if (validateAll() && validateFrequency() ) {
				this.cpData.controlPointId = this.$route.params.id
				this.$store.dispatch('controlPoint/submitEditControlPoint', this.cpData).then(result => {
					if (result) {
						showAlert('success', this.translateText('control point has been created'))
					} else {
						showAlert('warning', this.translateText('something went wrong, control point has not been inserted'))
					}
				})
			}
		},
		deleteControlPoint(){
				this.$store.dispatch('controlPoint/deleteControlPoint', this.$route.params.id)
					.then( resolved => {
						if(resolved){ this.$router.push('/controlPoints');}
					})
		}
	}
};
</script>

<style>

</style>
