<template>
	<div class="itemCat">
		<h1><Translate :text="'Item Category'" /></h1>

		<p>
			<Translate :text="'Click on item category to edit its frequency'"/>
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

export default {
	data:()=>({
		allowedHeaders: ["Code"],
		headers: [{ name: "Item Codes", id: 0 }]
	}),
	components: {Translate, CustomTable},
	computed:{
		codeList(){
			return  this.$store.state.itemCategory.itemCodes;
		},
	},
	mounted() {
		return this.$store
			.dispatch("itemCategory/loadItemCategoryCodes")
	},
	methods: {
		 itemCatCodeClickCallback(row) {
			 this.$store
				.dispatch("itemCategory/getFrequencyOfItemCode", {itemCode: row.Code})
			this.$router.push("/itemCategories/" + row.Code);
		}
	}
}
</script>

<style scoped>
.itemCat{
	margin: 10px;
}
</style>
