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
												:id="key"
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
				<v-row >
					<v-col
						v-if="submitFrequenciesCallback && !shouldConfirm"
						cols="12"
						sm="4"
					>
						<v-btn color="#333" v-on:click="handleSubmitClick" width="103px" class="white--text">
							Submit
						</v-btn>
					</v-col>
					<v-col
						v-if="shouldConfirm"
						cols="12"
						sm="4"
					>
						<v-btn color="#b22222" v-on:click="handleConfirmClick" width="103px" class="white--text">
							Confirm
						</v-btn>
					</v-col>
					<v-col
						cols="12"
						sm="4"
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
						sm="4"
					>
						<v-btn color="#333" v-on:click="handleCancelClick" class="white--text">Cancel</v-btn>
					</v-col>
				</v-row>
				<v-row
				>
					<AlertModal
						class="alert"
						v-if="notification"
						:id="1"
						:message="notification.message"
						:show="modalAlertShowSubmit"
						:status="notificationStatus"
						:closeCallback="closeAlertModal"
					/>
				</v-row>
			</v-container>
		</v-form>
	</v-card>
</template>

<script>
export default {
	name: "Frequency",
	data: () => ({
		shouldConfirm: false,
		isConfirmed: "",
		modalAlertShowSubmit: false,
		modalAlertShowError: false,
		notification:null,
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
	computed: {
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
		handleSubmitClick(){
				this.handleOperation("Are you sure you want to update frequency?","update")
		},
		handleCancelClick(){
			this.handleOperation("Are you sure you want to cancel?","cancel")
		},
		closeAlertModal(id) {
			this.modalAlertShowSubmit = false;
			this.shouldConfirm = false
		},
		handleOperation(text,value){
			this.shouldConfirm = true
			this.notification = { response: 2, message: text }
			this.modalAlertShowSubmit = true;
			this.isConfirmed = value
		},
		updateFreq(e, key) {
			this.localFrequencies[key] = {val: parseInt(e), changed: true}
		},
		submitFrequencies() {
			if (this.submitFrequenciesCallback){
				let value = this.submitFrequenciesCallback(this.frequencies, this.localFrequencies );
			 if(value !== null){
				 this.shouldConfirm = false
				 this.notification = value
				 this.modalAlertShowSubmit = true;
			 }
			}
		},
		handleConfirmClick(){
			if(this.isConfirmed === "update"){
				this.submitFrequencies()
			}
			else this.pushBack()
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
            // if(keyVal != null && keyVal.to25 != null){
            //     console.log()
            //     let labelValue = keyVal.split('to')[1];
			//     return '>' + labelValue
            // }else{
            //     return ""
            // }
			
		},
		pushBack() {
			if (this.pushBackCallback) this.pushBackCallback();
			this.shouldConfirm = false
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

.alert{
	max-width: 350px;
	min-width: 100%;
}

</style>
