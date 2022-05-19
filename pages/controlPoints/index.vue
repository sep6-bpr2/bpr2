<template>
	<div class="controlPoints">
		<h1><Translate :text="'Control point management'" /></h1>

		<p>
			Control points map the characteristics of items to what things the
			employee has to check on the item
		</p>
		<button v-on:click="handleCreate">
			<Translate :text="'Create control point'" />
		</button>
		<CustomTable
			:allowedHeaders="allowedHeaders"
			:rows="controlPoints"
			:tableHeaders="headers"
			:callback="controlPointClickCallback"
		/>
	</div>
</template>

<script>
import CustomTable from "../../components/CustomTable.vue";
import Translate from "../../components/Translate.vue";

export default {
	components: {
		CustomTable,
		Translate,
	},
	created() {
        if (!this.$store.state || !this.$store.state.login.user) {
			this.$router.push("/login");
		}

		this.$store.dispatch("controlPoints/loadControlPoints", {});
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
	methods: {
		deleteRowCallback(row){
			confirm("Are you sure you want to delete user with username: " + row.username  )
		},
		controlPointClickCallback(row) {
			this.$router.push("/controlPoints/" + row.id);
		},
		handleCreate() {
			this.$router.push("/controlPoints/createControlPoint");
		},
	},
};
</script>

<style scoped>
.controlPoints {
	margin: 10px;
}

.controlPoints button {
	background-color: #333;
	color: white;
	border-radius: 5px;
	padding: 12px 15px;
	margin-top: 10px;
	margin-bottom: 10px;
}
</style>
