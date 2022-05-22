<template>
	<div>
		<AlertModal
			class="alert"
			v-if="notification"
			:id="1"
			:message="notification.message"
			:show="modalAlertShowSubmit"
			:status="notificationStatus"
		/>
		<div class="freq" v-else-if="isDoneFetching">
			<div class="heading">
				<h1>Item Code</h1>
				<h4>Code: {{ $route.params.code }}</h4>
				<p>Edit Item category frequencies</p>
			</div>
			<div >
				<Frequency
					:frequencies = frequencies
					:push-back-callback="pushBack"
					:submit-frequencies-callback="submitFrequencies"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import Frequency from "../../../components/Frequency";
import {authorizeUser} from "../../../mixins/authorizeUser.js"


export default {
	name: "index",
	components: {Frequency},
    mixins: [authorizeUser],
	data: () => ({
		modalAlertShowSubmit: false,
		modalAlertShowError: false,
		notFoundCode: false,
		notification: null
	}),
	mounted() {
		this.$store
			.dispatch(`itemCategory/getFrequencyOfItemCode`, {itemCode: this.$route.params.code})

		this.$store
			.dispatch("itemCategory/loadItemCategoryCodes").then(result =>{
			if(result){
				if(!result.some((obj) => obj.Code === this.$route.params.code)){
					this.notification = { response: 0, message: "Item Code "+ this.$route.params.code + " does not exist"}
					this.modalAlertShowSubmit = true;
					return
				}
			}
		})

	},
	computed: {
		frequencies() {
			return this.$store.state.itemCategory.frequencies[0]
		},
		isDoneFetching(){
			if(this.$store.state.itemCategory.frequencies[0]){
				return true
			}
			return false
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
	methods: {
		submitFrequencies(stateFrequencies,localFrequencies) {
			let tempFrequencies = {
				id:0,
				to25:0,
				to50 : 0,
				to100 : 0,
				to200 : 0,
				to300 : 0,
				to500 : 0,
				to700 : 0,
				to1000 : 0,
				to1500 : 0,
				to2000 : 0,
				to3000 : 0,
				to4000 : 0,
				to5000 : 0
			}
			for (let x in localFrequencies) {
				if(localFrequencies[x].changed == false){
					tempFrequencies[x] = stateFrequencies[x]
				}
				else{
					tempFrequencies[x] = localFrequencies[x].val
				}
			}
			tempFrequencies.Code = parseInt(this.$route.params.code)
			let text = "Are you sure you want to update frequency for this item Category?"
			let existsNegVal
			 existsNegVal = 	Object.entries(tempFrequencies).every(v => v[1] >= 0)
			 existsNegVal = 	Object.entries(tempFrequencies).every(v => v[1] <= 2147483647)

			let localNotification;
			if(existsNegVal === false){
				localNotification = { response: 0, message: "There is an invalid input"}
			}
			else{
					this.$store.commit("itemCategory/updateStatus",{status: "success",value: this.$route.params.code})
					this.$store.dispatch("itemCategory/setFrequencyWithId",{frequencies: tempFrequencies})
					this.$router.push("/itemCategories");
			}
			return localNotification
		},
		pushBack(){
				this.$router.push("/itemCategories");
		}
	}
}
</script>

<style scoped>
.alert{
	padding: 10px;
}
.freq {
	display: flex;
	margin: 10px;
}

.heading {
	padding-right: 100px;
}

</style>
