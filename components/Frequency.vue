<template>
	<v-card elevation="0" outlined>
		<v-form ref="form" :key="formKey">
			<v-container style="max-width: 500px; background-color: #fcfcfc; ">
				<v-row>
					<v-list v-if="frequencies" v-for="(value,key) in frequencies" :key="key">
						<v-col
							class="col-12 freqs"
							v-if="key != 'id'"
						>
							<v-list-item class="mt-0">
								<v-list-item-content>
									<v-list-item-title>{{ createLabel(key) }}</v-list-item-title>
									<v-list-item-subtitle>
										<v-text-field
											:value=value
											type="number"
											v-on:input="updateFreq($event,key)"
											outlined
										></v-text-field>
									</v-list-item-subtitle>
								</v-list-item-content>
							</v-list-item>
						</v-col>
					</v-list>
				</v-row>
				<v-row class="mt-0">
					<v-col
						v-if="submitFrequenciesCallback"
						cols="12"
						sm="3"
					>
						<v-btn  color="#333" v-on:click="submitFrequencies" class="white--text">
							Submit
						</v-btn>
					</v-col>
					<v-col
						cols="12"
						sm="3"
					>
						<v-btn color="#333"  v-on:click="resetFrequencies" class="white--text">
							Reset
						</v-btn>
					</v-col>
					<v-col
						v-if="pushBackCallback"
						cols="12"
						sm="3"
					>
						<v-btn color="#333" v-on:click="pushBack" class="white--text">Cancel</v-btn>
					</v-col>
				</v-row>
			</v-container>
		</v-form>
	</v-card>
</template>

<script>
export default {
	name: "Frequency",
	data: () => ({
		notStartedForm: true,
		localFrequencies: {
			id: {num: 0, changed: false},
			to25: {val: 0, changed: false},
			to50: {val: 0, changed: false},
			to100: {val: 0, changed: false},
			to200: {val: 0, changed: false},
			to300: {val: 0, changed: false},
			to500: {val: 0, changed: false},
			to700: {val: 0, changed: false},
			to1000: {val: 0, changed: false},
			to1500: {val: 0, changed: false},
			to2000: {val: 0, changed: false},
			to3000: {val: 0, changed: false},
			to4000: {val: 0, changed: false},
			to5000: {val: 0, changed: false}
		},
		formKey: 0,

	}),
	props: ["submitFrequenciesCallback", "resetFrequenciesCallback", "pushBackCallback", "frequencies"],
	computed: {},
	methods: {
		updateFreq(e, key) {
			this.localFrequencies[key] = {val: parseInt(e), changed: true}
		},
		submitFrequencies() {
			if (this.submitFrequenciesCallback)  this.submitFrequenciesCallback(this.frequencies, this.localFrequencies);
		},
		resetFrequencies() {
			this.formKey += 1;
			for (let key in this.localFrequencies) {
				this.localFrequencies[key].changed = false
			}
		},
		createLabel(keyVal) {
			let labelValue = keyVal.split('to')[1];
			return 'to' + labelValue
		},
		pushBack() {
			if (this.pushBackCallback) this.pushBackCallback();
		}

	}
}
</script>

<style>
.v-text-field__details {
	display: none;
}

.v-list-item__content {
	padding: 0;
}

.freqs {
	padding: 0;
}

</style>
