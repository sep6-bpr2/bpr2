<template>
	<div 
        v-show="this.$store.state.login.user && this.$store.state.login.user.role == 'admin'" 
        class="completedOrders"
    >
		<h1>This is the completed orders page</h1>
		<CustomTable
			id="completedOrderList"
			:allowedHeaders="allowedHeaders"
			:rows="completedOrders"
			:tableHeaders="headers"
			:callback="completedOrderClickCallback"
            :scrolledToBottomCallback="loadMoreCompletedOrders"
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
		this.$store.dispatch("completedOrders/loadCompletedOrders", {
			offset: this.offset,
			limit: this.limit,
		});
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
		loadMoreCompletedOrders() {
            this.offset = this.offset + this.limit;
			this.$store.dispatch("completedOrders/loadCompletedOrders", {
				offset: this.offset,
				limit: this.limit,
			});
		},
	},
};
</script>

<style>
.completedOrders {
	margin: 10px;
}
</style>
