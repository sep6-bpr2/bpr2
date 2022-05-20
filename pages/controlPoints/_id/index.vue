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
			></ControlPoint>
		</div>
	</div>
</template>

<script>
import ControlPoint from "../../../components/ControlPoint";
import Translate from "../../../components/Translate";
import {translate} from "../../../mixins/translate";

export default {
	components: {Translate, ControlPoint},
	mixins: [translate],
	created() {
		this.$store.commit('createControlPoint/resetState')
		this.$store.dispatch("createControlPoint/getControlPointData", this.$route.params.id)
	},
	computed: {
		alert() {
			return this.$store.state.createControlPoint.alert
		}
	},
	methods: {
		submit(validateAll, showAlert) {
			if (validateAll()) {
				let value = this.$store.state.createControlPoint
				this.$store.dispatch('createControlPoint/submitEditControlPoint', {
					controlPointId: this.$route.params.id,
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
