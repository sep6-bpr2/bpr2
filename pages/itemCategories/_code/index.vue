<template>
	<div class="freq">
		<div class="heading">
			<h1>Item Code</h1>
			<h4>Code: {{ $route.params.code }}</h4>
			<p>Edit Item category frequencies</p>
		</div>
		<v-card v-if="isDoneFetching" elevation="0" outlined>
				<Frequency/>
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
		localFrequencies: {
			id:{num:0,changed:false},
			to25:{val:0,changed:false},
			to50 : {val:0,changed:false},
			to100 : {val:0,changed:false},
			to200 : {val:0,changed:false},
			to300 : {val:0,changed:false},
			to500 : {val:0,changed:false},
			to700 : {val:0,changed:false},
			to1000 : {val:0,changed:false},
			to1500 : {val:0,changed:false},
			to2000 : {val:0,changed:false},
			to3000 : {val:0,changed:false},
			to4000 : {val:0,changed:false},
			to5000 : {val:0,changed:false}
		},
		formKey:0,

	}),
	computed: {
		frequencies() {
			return this.$store.state.itemCategory.frequencies[0]
		},
		isDoneFetching(){
			if(this.$store.state.itemCategory.frequencies[0]){
				return true
			}
			return false
		}
	},
	methods: {
		resetFrequencies() {
			 this.formKey += 1;
			for (let key in this.localFrequencies) {
				this.localFrequencies[key].changed = false
			}
			this.notStartedForm = true
			 // this.localFrequencies = JSON.parse(JSON.stringify(this.frequencies))
		},
		updatefreq(e,key){
			this.localFrequencies[key] = {val: parseInt(e),changed:true}
			this.notStartedForm = false
		},
		submitFrequencies() {
			let frequencies = this.frequencies
			let localFrequencies = {
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
			for (let x in this.localFrequencies) {
				if(this.localFrequencies[x].changed == false){
					localFrequencies[x] = this.frequencies[x]
				}
				else{
					localFrequencies[x] = this.localFrequencies[x].val
				}
			}
			localFrequencies.Code = parseInt(this.$route.params.code)
			let text = "Are you sure you want to update frequency for this item Category?"

			let existsNegVal = 	Object.entries(localFrequencies).every(v => v[1] > 0)
			console.log(JSON.stringify(localFrequencies) + existsNegVal)

			if(!existsNegVal){
				alert("There is an invalid input")
			}
			else{
				if (confirm(text) == true) {
					this.$store.dispatch("itemCategory/setFrequencyWithId",{frequencies: localFrequencies})
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
