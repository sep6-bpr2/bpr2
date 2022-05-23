<template>
	<div>
		<div class="pageHeader">
			<Translate text="Create control point"/>
		</div>
		<ControlPoint
			:submit="submit"
			:is-edit="false"
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
	}),
	created() {
		this.$store.commit('createControlPoint/resetState')
	},
	methods: {

		submit(showAlert) {
            let value = this.$store.state.createControlPoint
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
                    this.$store.commit('createControlPoint/resetState')
                    showAlert('success', this.translateText('control point has been created'))
                }else{
                    showAlert('warning', this.translateText('something went wrong, control point has not been inserted'))
                }
            })
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

