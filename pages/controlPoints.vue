<template>
	<div class="controlPoints">
		<h1>This is control point page</h1>

		<CustomTable
			:allowedHeaders="allowedHeaders"
			:rows="controlPoints"
			:tableHeaders="headers"
		/>
	</div>
</template>

<script>
import CustomTable from "../components/CustomTable.vue";

export default {
	components: {
		CustomTable,
	},
	computed: {
		headers() {
			return this.$store.state.controlPoints.tableHeaders;
		},
		allowedHeaders() {
			return this.$store.state.controlPoints.allowedHeaders;
		},
		controlPoints() {
			return this.$store.state.controlPoints.controlPointList;
		},
	},
};
</script>

<style scoped>
.controlPoints {
}
</style>
