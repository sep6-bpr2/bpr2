<template>
	<div v-show="
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
		/>
		<div class="freq" v-else-if="isDoneFetching">
			<div class="heading">
				<h1>Item Code</h1>
				<h4>Code: {{ $route.params.code }}</h4>
				<p>Edit Item category frequencies</p>
			</div>
			<div>
				<Frequency
					:frequencies=frequencies
					:push-back-callback="pushBack"
					:submit-frequencies-callback="submitFrequencies"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import Frequency from "../../../components/Frequency.vue";
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
			.dispatch("itemCategory/itemCodeExists",{code: this.$route.params.code}).then(result => {
			if (!result[0]) {
				this.notification = {response: 0, message: "Item Code " + this.$route.params.code + " does not exist"}
				this.modalAlertShowSubmit = true;
				return
			}
		})

	},
	computed: {
		frequencies() {
            let frequencies = JSON.parse(JSON.stringify(this.$store.state.itemCategory.frequencies[0]))
            delete frequencies.frequencyNumber // Remove the frequencyNumber before passing
			return frequencies
		},
		isDoneFetching() {
			if (this.$store.state.itemCategory.frequencies[0]) {
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
		submitFrequencies(stateFrequencies, localFrequencies) {
			let tempFrequencies = {
				id: 0,
				to25: 0,
				to50: 0,
				to100: 0,
				to200: 0,
				to300: 0,
				to500: 0,
				to700: 0,
				to1000: 0,
				to1500: 0,
				to2000: 0,
				to3000: 0,
				to4000: 0,
				to5000: 0
			}
			for (let x in localFrequencies) {
				if (localFrequencies[x].changed == false) {
					tempFrequencies[x] = stateFrequencies[x]
				} else {
					tempFrequencies[x] = localFrequencies[x].val
				}
			}

			let failedId;
			tempFrequencies.Code = parseInt(this.$route.params.code)
			let existsNegVal = 	Object.entries(tempFrequencies).every(isGreaterThan0)
			let existsOverInt = 	Object.entries(tempFrequencies).every(isLessThanMaxInteger)

			function isGreaterThan0(el){
				if(el[1] >= 0){
					return true
				}
				else{
					failedId = el[0]
					return false
				}
			}

			function isLessThanMaxInteger(el){
				if(el[1] <= 2147483647){
					return true
				}
				else{
					failedId = el[0]
					return false
				}
			}

			let localNotification;
			if (!existsNegVal || !existsOverInt) {
				localNotification = { response: 0, message: "There is an invalid input at input: " + failedId }
			}
			else{
                    tempFrequencies.frequencyNumber = this.$store.state.itemCategory.frequencies[0].frequencyNumber
					this.$store.dispatch("itemCategory/setFrequencyWithId",{frequencies: tempFrequencies}).then(res =>{
						this.$router.push("/itemCategories");
					})
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
