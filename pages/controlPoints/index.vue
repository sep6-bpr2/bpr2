<template>
	<div
		:v-if="
			this.$store.state.login.user &&
			this.$store.state.login.user == 'admin' &&
			controlPoints
		"
		class="controlPoints"
	>
		<h1><Translate :text="'Control point management'" /></h1>

		<p>
			Control points map the characteristics of items to what things the
			employee has to check on the item
		</p>
		<button v-on:click="handleCreate">
			<Translate :text="'Create control point'" />
		</button>
		<CustomTable
			id="controlPointList"
			:allowedHeaders="allowedHeaders"
			:rows="controlPoints"
			:tableHeaders="headers"
			:callback="controlPointClickCallback"
            :scrolledToBottomCallback="loadMoreControlPoints"
		/>
	</div>
</template>

<script>
import CustomTable from "../../components/CustomTable.vue";
import Translate from "../../components/Translate.vue";
import { authorizeUser } from "../../mixins/authorizeUser.js";

export default {
	components: {
		CustomTable,
		Translate,
	},
	mixins: [authorizeUser],
	data() {
		return {
			offset: 0,
			limit: 25,
		};
	},
	created() {
		this.$store.dispatch("controlPoints/loadControlPoints", {
			offset: this.offset,
			limit: this.limit,
		});
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
		controlPointClickCallback(row) {
			this.$router.push("/controlPoints/" + row.id);
		},
		handleCreate() {
			this.$router.push("/controlPoints/createControlPoint");
		},
		loadMoreControlPoints() {
            this.offset = this.offset + this.limit;
			this.$store.dispatch("controlPoints/loadControlPoints", {
				offset: this.offset,
				limit: this.limit,
			});
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
