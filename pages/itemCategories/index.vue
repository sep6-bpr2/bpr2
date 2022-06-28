<template>
	<div class="itemCat" v-show="
			this.$store.state.login.user &&
			this.$store.state.login.user.role == 'admin'
		">
		<AlertModal
			class="alert"
			v-if="notification"
			:id="1"
			:message="notification.message"
			:show="modalAlertShowSubmit"
			:status="notificationStatus"
			:timing="3000"
			:closeCallback="closeAlertModal"
		/>
		<h1><Translate :text="'Item Categories'" /></h1>

		<custom-table
			:allowedHeaders="allowedHeaders"
			:rows="codeList"
			:tableHeaders="headers"
			:callback="itemCatCodeClickCallback"
            :scrolledToBottomCallback="loadMoreItemCategories"
		/>
	</div>
</template>

<script>
import CustomTable from "../../components/CustomTable.vue";
import Translate from "../../components/Translate.vue";
import { authorizeUser } from "../../mixins/authorizeUser.js";
import {header} from "../../mixins/header";

export default {
	data: () => ({
		allowedHeaders: ["Code"],
		headers: [{ name: "Item Codes", id: 0 }],
		notification: null,
		modalAlertShowSubmit: false,
		offset: 0,
		limit: 25,
	}),
    mixins: [authorizeUser,header],
	components: {Translate, CustomTable},
	computed:{
		updateStatus(){
			return this.$store.state.itemCategory.updateSuccess
		},
		codeList(){
			return  this.$store.state.itemCategory.itemCodes;
		},
		notificationStatus() {
			if (this.notification) {
				if (this.notification.response == 0) {
					return "danger";
				} else if (this.notification.response == 1) {
					return "success";
				} else if (this.notification.response == 2) {
					return "warning";
				} else {
					return "other";
				}
			}
		},
	},
	mounted() {
		if(this.updateStatus.status === "success"){
			this.notification = { response: 1, message: "The item category with code " + this.updateStatus.value + " has updated successfully"}
		}
		else if(this.updateStatus.status === "error"){
			this.notification = { response: 0, message: "The item category with code " + this.updateStatus.value + " could not be updated"}
		}
		this.modalAlertShowSubmit = true;
		this.$store.commit('itemCategory/updateStatus',{})


		this.$store.dispatch("itemCategory/loadItemCategoryCodes", {
			offset: this.offset, limit: this.limit
		});

	},
	methods: {
		 itemCatCodeClickCallback(row) {
			this.$router.push("/itemCategories/" + row.Code);
		},
		closeAlertModal(id) {
			if (id == 1) this.modalAlertShowSubmit = false;
		},
        loadMoreItemCategories() {
            this.offset = this.offset + this.limit;
			this.$store.dispatch("itemCategory/loadItemCategoryCodes", {
				offset: this.offset,
				limit: this.limit,
			});
		},
	}
}
</script>

<style scoped>
.itemCat {
	margin: 10px;
}
</style>
