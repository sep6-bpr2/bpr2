<template>
	<div v-if="this.$store.state.login.user" class="completedOrders">
		<h1>This is the completed orders page</h1>
		<CustomTable
            id="completedOrderList"
			:allowedHeaders="allowedHeaders"
			:rows="completedOrders"
			:tableHeaders="headers"
			:callback="completedOrderClickCallback"
		/>
	</div>
</template>

<script>
import CustomTable from "../../components/CustomTable.vue";
import Translate from "../../components/Translate.vue";
import {authorizeUser} from "../../mixins/authorizeUser.js"

export default {
	components: {
		CustomTable,
		Translate,
	},
    mixins: [authorizeUser],
	created() {
        if (!this.$store.state || !this.$store.state.login.user) {
			this.$router.push("/login");
		}
		this.$store.dispatch("completedOrders/loadCompletedOrders", {});
	},
	computed: {
		headers() {
			return this.$store.state.completedOrders.tableHeaders;
		},
		allowedHeaders() {
			return this.$store.state.completedOrders.allowedHeaders;
		},
		completedOrders() {
			return this.$store.state.completedOrders.orders;
		},
	},
	methods: {
		completedOrderClickCallback(row) {
			this.$router.push("/completedOrders/" + row.id);
		},
	},
};
</script>

<style>
.completedOrders {
	margin: 10px;
}
</style>
