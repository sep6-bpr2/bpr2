<template>
	<v-form ref="form" :key="formKey">
		<v-container style="max-width: 500px; background-color: #fcfcfc; ">
			<v-row>
				<v-col
					cols="12"
					sm="3"
				>
					<v-text-field
						:value=frequencies.to25
						type="number"
						v-on:input="updatefreq($event,'to25')"
						label="to 25"
						outlined
						shaped
					></v-text-field>
				</v-col>

				<v-col
					cols="12"
					sm="3"
				>
					<v-text-field
						:value=frequencies.to50
						v-on:input="updatefreq($event,'to50')"
						label="to 50"
						outlined
						shaped
					></v-text-field>
				</v-col>
				<v-col
					cols="12"
					sm="3"
				>
					<v-text-field
						:value=frequencies.to100
						v-on:input="updatefreq($event,'to100')"
						label="to 100"
						outlined
						shaped
					></v-text-field>
				</v-col>
				<v-col
					cols="12"
					sm="3"
				>
					<v-text-field
						:value=frequencies.to200
						v-on:input="updatefreq($event,'to200')"
						label="to 200"
						outlined
						shaped
					></v-text-field>
				</v-col>
				<v-col
					cols="12"
					sm="3"
				>
					<v-text-field
						:value=frequencies.to300
						v-on:input="updatefreq($event,'to300')"
						label="to 300"
						outlined
						shaped
					></v-text-field>
				</v-col>
				<v-col
					cols="12"
					sm="3"
				>
					<v-text-field
						:value=frequencies.to500
						v-on:input="updatefreq($event,'to500')"
						label="to 500"
						outlined
						shaped
					></v-text-field>
				</v-col>
				<v-col
					cols="12"
					sm="3"
				>
					<v-text-field
						:value=frequencies.to700
						v-on:input="updatefreq($event,'to700')"
						label="to 700"
						outlined
						shaped
					></v-text-field>
				</v-col>
				<v-col
					cols="12"
					sm="3"
				>
					<v-text-field
						:value=frequencies.to1000
						v-on:input="updatefreq($event,'to1000')"
						label="to 1000"
						outlined
						shaped
					></v-text-field>
				</v-col>
				<v-col
					cols="12"
					sm="3"
				>
					<v-text-field
						:value=frequencies.to1500
						v-on:input="updatefreq($event,'to1500')"
						label="to 1500"
						outlined
						shaped
					></v-text-field>
				</v-col>
				<v-col
					cols="12"
					sm="3"
				>
					<v-text-field
						:value=frequencies.to2000
						v-on:input="updatefreq($event,'to2000')"
						label="to 2000"
						outlined
						shaped
					></v-text-field>
				</v-col>
				<v-col
					cols="12"
					sm="3"
				>
					<v-text-field
						:value=frequencies.to3000
						v-on:input="updatefreq($event,'to3000')"
						label="to 3000"
						outlined
						shaped
					></v-text-field>
				</v-col>
				<v-col
					cols="12"
					sm="3"
				>
					<v-text-field
						:value=frequencies.to4000
						v-on:input="updatefreq($event,'to4000')"
						label="to 4000"
						outlined
						shaped
					></v-text-field>
				</v-col>
				<v-col
					cols="12"
					sm="3"
				>
					<v-text-field
						:value=frequencies.to5000
						v-on:input="updatefreq($event,'to5000')"
						label="to 5000"
						outlined
						shaped
					></v-text-field>
				</v-col>


			</v-row>
			<v-row class="mt-0">
				<v-col
					cols="12"
					sm="3"
				>
					<v-btn color="#333" v-on:click="submitFrequencies" :disabled="notStartedForm" class="white--text">
						Submit
					</v-btn>
				</v-col>
				<v-col
					cols="12"
					sm="3"
				>
					<v-btn color="#333" v-on:click="resetFrequencies" :disabled="notStartedForm" class="white--text">
						Reset
					</v-btn>
				</v-col>
				<v-col
					cols="12"
					sm="3"
				>
					<v-btn color="#333" v-on:click="pushBack" class="white--text">Back</v-btn>
				</v-col>
			</v-row>
		</v-container>
	</v-form>
</template>

<script>
export default {
	name: "Frequency",
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
	methods:{
		updatefreq(e,key){
			this.localFrequencies[key] = {val: parseInt(e),changed:true}
			this.notStartedForm = false
		},
	}
}
</script>

<style scoped>

</style>
