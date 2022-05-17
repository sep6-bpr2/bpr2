<template>
	<div :v-if="this.$store.state.login.user" class="releasedOrders">
		<h1>This is the released orders page</h1>
		<CustomTable
            id="releasedOrderList"
			:allowedHeaders="allowedHeaders"
			:rows="releasedOrders"
			:tableHeaders="headers"
			:callback="releasedOrderClickCallback"
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
		this.$store.dispatch("releasedOrders/loadReleasedOrders", {});
	},
	computed: {
		headers() {
			return this.$store.state.releasedOrders.tableHeaders;
		},
		allowedHeaders() {
			return this.$store.state.releasedOrders.allowedHeaders;
		},
		releasedOrders() {
			return this.$store.state.releasedOrders.orders;
		},
	},
	methods: {
		releasedOrderClickCallback(row) {
			this.$router.push("/releasedOrders/" + row.id);
		},
	},
};
</script>

<style>
.releasedOrders {
	margin: 10px;
}
</style>
