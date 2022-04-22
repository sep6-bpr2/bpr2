<template>
	<div class="releasedOrder">
		<h1>QA FORM {{ $route.params.id }}</h1>

		<h2>Item ID: {{ currentOrder.id }}</h2>
		<h2>Description: {{ currentOrder.description }}</h2>
		<h2>Item Category Code: {{ currentOrder.categoryCode }}</h2>
		<h2>Deadline: {{ currentOrder.deadline }}</h2>
		<h2>Location: {{ currentOrder.location }}</h2>
		<h2>Status: {{ currentOrder.status }}</h2>

		<h2>ONE TIME MEASUREMENTS</h2>

		<OneTimeTable
			:allowedHeaders="oneTimeAllowedHeaders"
			:rows="currentOrder.oneTimeControlPoints"
			:tableHeaders="oneTimeHeaders"
		/>
	</div>
</template>

<script>
import CustomTable from "../../../components/CustomTable.vue";
import Translate from "../../../components/Translate.vue";
import OneTimeTable from "../../../components/OneTimeTable.vue";

export default {
	components: {
		CustomTable,
		Translate,
		OneTimeTable,
	},
	data() {
		return {
			currentOrder: JSON.parse(
				JSON.stringify(this.$store.state.releasedOrder.currentReleased)
			),
		};
	},
	computed: {
		oneTimeHeaders() {
			return this.$store.state.releasedOrder.oneTimeTableHeaders;
		},
		oneTimeAllowedHeaders() {
			return this.$store.state.releasedOrder.oneTimeAllowedHeaders;
		},
		currentOrderOneTimeAttributes() {
			return this.$store.state.releasedOrder.oneTimeControlPoints;
		},
	},
	mounted() {
		return this.$store.dispatch(
			"releasedOrder/loadReleasedOrderFull",
			this.$route.params.id
		);
	},
	watch: {
		"$store.state.releasedOrder.currentReleased": function () {
			console.log("CLONING");
			this.currentOrder = JSON.parse(
				JSON.stringify(this.$store.state.releasedOrder.currentReleased)
			);
			console.log("END CLONING");
		},
	},
};
</script>

<style>
.releasedOrder {
	margin: 10px;
}
</style>
