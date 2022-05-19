<template>
	<div class="itemCat">
		<h1><Translate :text="'Item Category'" /></h1>

		<p>
			<Translate :text="'Click on item category to edit its frequency'" />
		</p>

		<custom-table
			:allowedHeaders="allowedHeaders"
			:rows="codeList"
			:tableHeaders="headers"
			:callback="itemCatCodeClickCallback"
		/>
	</div>
</template>

<script>
import CustomTable from "../../components/CustomTable";
import Translate from "../../components/Translate";
import { authorizeUser } from "../../mixins/authorizeUser.js";

export default {
	data: () => ({
		allowedHeaders: ["Code"],
		headers: [{ name: "Item Codes", id: 0 }],
		offset: 0,
		limit: 25,
	}),
	mixins: [authorizeUser],
	components: { Translate, CustomTable },
	computed: {
		codeList() {
			return this.$store.state.itemCategory.itemCodes;
		},
	},
	mounted() {
		this.$store.dispatch("itemCategory/loadItemCategoryCodes", {
			offset: this.offset, limit: this.limit
		});
		window.onscroll = () => {
			if (
				window.innerHeight + window.scrollY >=
				document.body.offsetHeight
			) {
				this.offset = this.offset + this.limit;
				this.loadMoreItemCategories();
				console.log("Reached the end of the list");
			}
		};
	},
	methods: {
		itemCatCodeClickCallback(row) {
			this.$store.dispatch("itemCategory/getFrequencyOfItemCode", {
				itemCode: row.Code,
			});
			this.$router.push("/itemCategories/" + row.Code);
		},
		loadMoreItemCategories() {
			this.$store.dispatch("releasedOrders/loadItemCategoryCodes", {
				offset: this.offset,
				limit: this.limit,
			});
		},
	},
};
</script>

<style scoped>
.itemCat {
	margin: 10px;
}
</style>
