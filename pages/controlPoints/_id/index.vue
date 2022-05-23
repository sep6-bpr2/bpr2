<template>
	<div>
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
				:attributes-names="attributeNames"
				:codes-choice="itemCategories"
				:all-types="allTypes"
				:all-measurement-types="allMeasurementTypes"
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
		cpData: null,
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
		allMeasurementTypes() {
			return this.cpData.allMeasurementTypes
		},
	},
	methods: {
		submit(validateAll, showAlert, validateFrequency) {
			if (validateAll() && validateFrequency() ) {
				this.cpData.controlPointId = this.$route.params.id
				this.$store.dispatch('createControlPoint/submitEditControlPoint', this.cpData).then(result => {
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
