<template>
	<v-card elevation="0" outlined>
		<v-form ref="form" :key="formKey">
			<v-container style=" background-color: #fcfcfc; ">
				<v-row>
					<div class="max-width">
						<v-list v-if="frequencies" v-for="(value,key) in frequencies" :key="key"
						>
						<div v-if="key != 'id'">
							<v-list-item class="oneLine max-width">
								<v-list-item-content>
									<div class="oneLine">
										<h3>{{ createLabel(key) }}</h3>
										<v-list-item-subtitle>
											<v-text-field
												class="freqEntry"
												:value=value
												type="number"
												v-on:input="updateFreq($event,key)"
												outlined
											></v-text-field>
										</v-list-item-subtitle>
									</div>
								</v-list-item-content>
							</v-list-item>
						</div>
						</v-list>
					</div>
				</v-row>
				<v-row class="mt-0">
					<v-col
						v-if="submitFrequenciesCallback"
						cols="12"
						sm="3"
					>
						<v-btn color="#333" v-on:click="submitFrequencies" class="white--text">
							Submit
						</v-btn>
					</v-col>
					<v-col
						cols="12"
						sm="3"
					>
						<v-btn color="#333" v-on:click="resetFrequencies" class="white--text"
							id="resetFreq"
						>
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
			if (this.submitFrequenciesCallback) this.submitFrequenciesCallback(this.frequencies, this.localFrequencies);
		},
		resetFrequencies() {
			this.formKey += 1;
			for (let key in this.localFrequencies) {
				this.localFrequencies[key].changed = false
			}
		},
		createLabel(keyVal) {
			let labelValue = keyVal.split('to')[1];
			return '>' + labelValue
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

.oneLine {
	display: flex;
	flex-direction: row;
	align-items: baseline;
}

.max-width {
	width: -webkit-fill-available !important;
}

v-list {
}

</style>
