<template>
	<div
		v-show="
			this.$store.state.login.user &&
			this.$store.state.login.user.role == 'qa employee'
		"
		class="releasedOrders"
	>
		<h1><Translate :text="'Released orders'"/></h1>
		<CustomTable
			id="releasedOrderList"
			:allowedHeaders="allowedHeaders"
			:rows="releasedOrders"
			:tableHeaders="headers"
			:callback="releasedOrderClickCallback"
            :scrolledToBottomCallback="loadMoreReleasedOrders"
		/>
	</div>
</template>

<script>
import CustomTable from "../../components/CustomTable.vue";
import Translate from "../../components/Translate.vue";
import { authorizeUser } from "../../mixins/authorizeUser.js";
import {header} from "../../mixins/header";

export default {
	components: {
		CustomTable,
		Translate,
	},
	mixins: [authorizeUser,header],
    data() {
		return {
			offset: 0,
            limit: 25
		};
	},
	created() {
		this.$store.dispatch("releasedOrders/loadReleasedOrders", {
			offset: this.offset, limit: this.limit
		});
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
			this.$router.push("/releasedOrders/" + row.productionOrder + "/" + row.id);
		},
		loadMoreReleasedOrders() {
            this.offset = this.offset + this.limit;
			this.$store.dispatch("releasedOrders/loadReleasedOrders", {
				offset: this.offset, limit: this.limit
			});
		},
	},
};
</script>

<style>
.releasedOrders {
	margin: 10px;
}
</style>
