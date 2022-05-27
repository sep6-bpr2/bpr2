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
import {header} from "../../../mixins/header";

export default {
	components: {Translate, ControlPoint},
	mixins: [translate, authorizeUser,header],
	data: () => ({
		cpData: null
	}),
	created() {
		this.$store.dispatch("controlPoint/getAllTypes")
		this.$store.dispatch("controlPoint/getAllAttributesNames")
		this.$store.dispatch("controlPoint/loadItemCategoryCodes")
		this.$store
			.dispatch("controlPoint/getControlPointData", this.$route.params.id).then(result =>{
			if(result){
				this.cpData = result
				if(!this.cpData.frequencies){
					this.$set(this.cpData,'frequencies',null)
				}
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
				console.log(JSON.stringify(this.cpData))
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
