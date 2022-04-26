<template>
	<div class="freq">
		<div class="heading">
			<h1>Item Code</h1>
			<h4>Code: {{ $route.params.code }}</h4>
			<p>Edit Item category frequencies</p>
		</div>
		<v-card v-if="isDoneFetching" elevation="0" outlined>
				<Frequency
					:push-back-callback="pushBack"
					:reset-frequencies-callback="resetFrequencies"
					:submit-frequencies-callback="submitFrequencies"
				/>
		</v-card>
	</div>
</template>

<script>
import Frequency from "../../../components/Frequency";
export default {
	name: "index",
	components: {Frequency},
	data: () => ({
		notStartedForm :true,
	}),
	computed: {
		// frequencies() {
		// 	return this.$store.state.itemCategory.frequencies[0]
		// },
		isDoneFetching(){
			if(this.$store.state.itemCategory.frequencies[0]){
				return true
			}
			return false
		}
	},
	methods: {
		resetFrequencies(localFrequencies) {
			for (let key in localFrequencies) {
				localFrequencies[key].changed = false
			}
			 // this.localFrequencies = JSON.parse(JSON.stringify(this.frequencies))
		},
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

			let existsNegVal = 	Object.entries(tempFrequencies).every(v => v[1] > 0)
			console.log(JSON.stringify(tempFrequencies) + existsNegVal)

			if(!existsNegVal){
				alert("There is an invalid input")
			}
			else{
				if (confirm(text) == true) {
					this.$store.dispatch("itemCategory/setFrequencyWithId",{frequencies: tempFrequencies})
					this.$router.push("/itemCategories");
				}
			}

		},
		pushBack(){
			let text = "Are you sure you want to cancel this process?"
			if (confirm(text) == true) {
				this.$router.push("/itemCategories");
			}
		}
	}
}
</script>

<style scoped>
.freq {
	display: flex;
	margin: 10px;
}

.heading {
	padding-right: 100px;
}

</style>
