<template>
	<div>
		<AlertModal
			:id="1"
			:message="currentOrder && currentOrder.message"
			:show="modalAlertShowError"
			:status="errorStatus"
			:closeCallback="closeAlertModal"
		/>
		<div v-if="currentOrder && currentOrder.response == null" class="releasedOrder">
			<ImageModal
				:image="modalImage"
				:show="modalImageShow"
				:closeCallback="closeImageModal"
			/>

			<div class="information">
				<h2>Information</h2>
				<DataDisplay :name="'Item ID'" :data="currentOrder.id" />
				<DataDisplay
					:name="'Description'"
					:data="currentOrder.description"
				/>
				<DataDisplay
					:name="'Item category code'"
					:data="currentOrder.categoryCode"
				/>
				<DataDisplay :name="'Deadline'" :data="currentOrder.deadline" />
				<DataDisplay :name="'Location'" :data="currentOrder.location" />
				<DataDisplay :name="'Status'" :data="currentOrder.status" />
			</div>

			<div class="oneTimeMeasurements">
				<h2>One time measurements</h2>

				<CustomTableInput
                    id="oneTimeMeasurements"
					:allowedHeaders="oAllowedHeaders"
					:rows="currentOrder.oneTimeControlPoints"
					:tableHeaders="oHeaders"
					:imageCallback="showImageModal"
					:valueUpdateCallback="editOValue"
				/>
			</div>

			<div class="multipleTimeMeasurements">
				<h2>Multiple time measurements</h2>

				<!-- This table has the input column removed -->
				<CustomTableInput
                    id="multipleTimeMeasurementsInfo"
					:allowedHeaders="mAllowedHeaders"
					:rows="currentOrder.multipleTimeControlPoints"
					:tableHeaders="mHeaders"
					:imageCallback="showImageModal"
				/>

				<MultipleTimeTable
                    id="multipleTimeMeasurementsAnswers"
					:tableHeaders="multipleTimeAnswerHeaders"
					:columns="currentOrder.multipleTimeAnswers"
					:valueUpdateCallback="editMValue"
				/>
			</div>

			<AlertModal
				v-if="notification"
				:id="2"
				:message="notification.message"
				:show="modalAlertShowSubmit"
				:status="notificationStatus"
				:closeCallback="closeAlertModal"
			/>

			<div>
				<button id="completeButton" v-on:click="handleComplete">Complete</button>
				<button id="saveButton" v-on:click="handleSave">Save</button>
			</div>
		</div>
	</div>
</template>

<script>
import CustomTable from "../../../components/CustomTable.vue";
import Translate from "../../../components/Translate.vue";
import CustomTableInput from "../../../components/CustomTableInput.vue";
import ImageModal from "../../../components/ImageModal.vue";
import MultipleTimeTable from "../../../components/MultipleTimeTable.vue";
import DataDisplay from "../../../components/DataDisplay.vue";
import AlertModal from "../../../components/AlertModal.vue";
import inputValidation from "../../../shared/validateInput"

export default {
	components: {
		CustomTable,
		Translate,
		CustomTableInput,
		ImageModal,
		MultipleTimeTable,
		DataDisplay,
		AlertModal,
	},
	data() {
		return {
			currentOrder: null,
			modalImage: "",
			modalImageShow: false,
			notification: null,
			modalAlertShowSubmit: false,
			modalAlertShowError: false,
		};
	},
	computed: {
		oHeaders() {
			return this.$store.state.releasedOrder.oneTimeTableHeaders;
		},
		oAllowedHeaders() {
			return this.$store.state.releasedOrder.oneTimeAllowedHeaders;
		},

		mHeaders() {
			return this.$store.state.releasedOrder.mTableHeaders;
		},
		mAllowedHeaders() {
			return this.$store.state.releasedOrder.mAllowedHeaders;
		},

		multipleTimeAnswerHeaders() {
			return this.currentOrder.multipleTimeControlPoints;
		},
		currentOrderMultipleTimeAnswerColumns() {
			return this.currentOrder.multipleTimeAnswers;
		},
		notificationStatus() {
			// if you read this mention it in the exam :)
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
        errorStatus() {
			// if you read this mention it in the exam :)
			if (this.currentOrder) {
				if (this.currentOrder.response == 0) {
					return "danger";
				} else if (this.currentOrder.response == 1) {
					return "success";
				} else if (this.currentOrder.response == 2) {
					return "warning";
				} else {
					return "other";
				}
			}
		},
	},
	created() {
        if (!this.$store.state || !this.$store.state.login.user) {
			this.$router.push("/login");
		}

		this.$store
			.dispatch(
				"releasedOrder/loadReleasedOrderFull",
				this.$route.params.id
			)
			.then((result) => {
                if(result && result.response != null){
                    this.modalAlertShowError = true;
                }
				this.currentOrder = result;
			});
	},
	watch: {
		"$store.state.releasedOrder.notification": function () {
			this.notification = this.$store.state.releasedOrder.notification;
			this.modalAlertShowSubmit = true;
		},
	},
	methods: {
		showImageModal(image) {
            if(this.$store.state.login.user){
                this.modalImage = window.location.origin + "/api/controlPoints/picture/" + this.$store.state.login.user.username + "/" + image;
                this.modalImageShow = true;
            }
		},
		closeImageModal() {
			this.modalImage = "";
			this.modalImageShow = false;
		},
		closeAlertModal(id) {
			if (id == 2) this.modalAlertShowSubmit = false;
			else if (id == 1) {
			    this.modalAlertShowSubmit = false;
			}
		},
		editOValue(index, value) {
			this.currentOrder.oneTimeControlPoints[index].answer = value;
			this.currentOrder.oneTimeControlPoints[index].author =
				this.$store.state.login.user.username;

			let inputValidated = 0;

			// Validate the input

            // inputValidated = inputValidation.validateInput(
            //     this.currentOrder.oneTimeControlPoints[index].answer,
            //     this.currentOrder.oneTimeControlPoints[index].inputType,
            //     this.currentOrder.oneTimeControlPoints[index].options,
            //     this.currentOrder.oneTimeControlPoints[index].lowerTolerance,
            //     this.currentOrder.oneTimeControlPoints[index].upperTolerance,
            //     this.currentOrder.oneTimeControlPoints[index].expectedValue,
            // )

            if (this.currentOrder.oneTimeControlPoints[index].answer == "") {
				inputValidated = 1; 
			} else if( this.currentOrder.oneTimeControlPoints[index].answer.length > 50){
                inputValidated = 0
            }else if (this.currentOrder.oneTimeControlPoints[index].inputType == 0) {
				//Option

				for (
					let i = 0;
					i <
					this.currentOrder.oneTimeControlPoints[index].options
						.length;
					i++
				) {
					if (
						this.currentOrder.oneTimeControlPoints[index].options[i]
							.value ==
						this.currentOrder.oneTimeControlPoints[index].answer
					) {
						inputValidated = 1;
						break;
					}
				}
			} else if (
				this.currentOrder.oneTimeControlPoints[index].inputType == 1 && // Text
				typeof this.currentOrder.oneTimeControlPoints[index].answer ===
					"string"
			) {
				inputValidated = 1;
			} else if (
				this.currentOrder.oneTimeControlPoints[index].inputType == 3 // Number
			) {
				let str = this.currentOrder.oneTimeControlPoints[index].answer;
				if (typeof str != "string") {
					inputValidated = 0;
				} else {
					inputValidated = 
						(!isNaN(str) &&
						!isNaN(parseFloat(str)) &&
						Number(str) >= 0)? 1: 0;
				}
			}

             // Check tolerances
            if(
                inputValidated == 1 && 
                this.currentOrder.oneTimeControlPoints[index].inputType == 3 && 
                this.currentOrder.oneTimeControlPoints[index].lowerTolerance &&
                this.currentOrder.oneTimeControlPoints[index].upperTolerance &&
                this.currentOrder.oneTimeControlPoints[index].answer != ""
            ){
                let max = parseFloat(this.currentOrder.oneTimeControlPoints[index].expectedValue) + parseFloat(this.currentOrder.oneTimeControlPoints[index].upperTolerance)
                let min = parseFloat(this.currentOrder.oneTimeControlPoints[index].expectedValue) - parseFloat(this.currentOrder.oneTimeControlPoints[index].lowerTolerance)
                let number = parseFloat(this.currentOrder.oneTimeControlPoints[index].answer)

                if (    
                    max < number ||
                    min > number
                ){
                    inputValidated = 2
                }
            }else if (
                inputValidated == 1 && 
                this.currentOrder.oneTimeControlPoints[index].inputType == 3 && 
                this.currentOrder.oneTimeControlPoints[index].lowerTolerance == null &&
                this.currentOrder.oneTimeControlPoints[index].upperTolerance == null &&
                this.currentOrder.oneTimeControlPoints[index].answer != ""
            ){
                let expected = parseFloat(this.currentOrder.oneTimeControlPoints[index].expectedValue)
                let number = parseFloat(this.currentOrder.oneTimeControlPoints[index].answer)
                if (expected != number) {
                    inputValidated = 2
                }
            }

			this.currentOrder.oneTimeControlPoints[index].validated = inputValidated;
		},
		editMValue(indexColumn, indexCell, value) {
			this.currentOrder.multipleTimeAnswers[indexColumn][
				indexCell
			].answer = value;
			this.currentOrder.multipleTimeAnswers[indexColumn][
				indexCell
			].author = this.$store.state.login.user.username;

			let inputValidated = 0

            // inputValidated = inputValidation.validateInput(
            //     this.currentOrder.multipleTimeAnswers[indexColumn][indexCell].answer,
            //     this.currentOrder.multipleTimeAnswers[indexColumn][indexCell].inputType,
            //     this.currentOrder.multipleTimeAnswers[indexColumn][indexCell].options,
            //     this.currentOrder.multipleTimeAnswers[indexColumn][indexCell].lowerTolerance,
            //     this.currentOrder.multipleTimeAnswers[indexColumn][indexCell].upperTolerance,
            //     this.currentOrder.multipleTimeAnswers[indexColumn][indexCell].expectedValue
            // )

			// Validate the input
            if ( this.currentOrder.multipleTimeAnswers[indexColumn][indexCell].answer == ""){
                inputValidated = 1
            }else if( this.currentOrder.multipleTimeAnswers[indexColumn][indexCell].answer.length > 50){
                inputValidated = 0
            }else if (
				this.currentOrder.multipleTimeAnswers[indexColumn][indexCell]
					.inputType == 0
			) {
				//Option

				for (
					let i = 0;
					i <
					this.currentOrder.multipleTimeControlPoints[indexColumn]
						.options.length;
					i++
				) {
					if (
						this.currentOrder.multipleTimeControlPoints[indexColumn]
							.options[i].value ==
						this.currentOrder.multipleTimeAnswers[indexColumn][
							indexCell
						].answer
					) {
						inputValidated = 1;
						break;
					}
				}
			} else if (
				this.currentOrder.multipleTimeAnswers[indexColumn][indexCell]
					.inputType == 1 && // Text
				typeof this.currentOrder.multipleTimeAnswers[indexColumn][
					indexCell
				].answer === "string"
			) {
				inputValidated = 1;
			} else if (
				this.currentOrder.multipleTimeAnswers[indexColumn][indexCell]
					.inputType == 3 // Number
			) {
				let str =
					this.currentOrder.multipleTimeAnswers[indexColumn][
						indexCell
					].answer;
				if (typeof str != "string") {
					inputValidated = 0;
				} else {
					inputValidated =
						(!isNaN(str) &&
						!isNaN(parseFloat(str)) &&
						Number(str) >= 0)? 1: 0;
				}
			}

            // Check tolerances
            if(
                inputValidated == 1 && 
                this.currentOrder.multipleTimeControlPoints[indexColumn].inputType == 3 && 
                this.currentOrder.multipleTimeControlPoints[indexColumn].lowerTolerance &&
                this.currentOrder.multipleTimeControlPoints[indexColumn].upperTolerance &&
                this.currentOrder.multipleTimeAnswers[indexColumn][indexCell].answer != ""
            ){
                let max = parseFloat(this.currentOrder.multipleTimeControlPoints[indexColumn].expectedValue) + parseFloat(this.currentOrder.multipleTimeControlPoints[indexColumn].upperTolerance)
                let min = parseFloat(this.currentOrder.multipleTimeControlPoints[indexColumn].expectedValue) - parseFloat(this.currentOrder.multipleTimeControlPoints[indexColumn].lowerTolerance)
                let number = parseFloat(this.currentOrder.multipleTimeAnswers[indexColumn][indexCell].answer)

                if (    
                    max < number ||
                    min > number
                ){
                    inputValidated = 2
                }
            }else if (                
                inputValidated == 1 && 
                this.currentOrder.multipleTimeControlPoints[indexColumn].inputType == 3 &&
                this.currentOrder.multipleTimeControlPoints[indexColumn].lowerTolerance == null &&
                this.currentOrder.multipleTimeControlPoints[indexColumn].upperTolerance == null && 
                this.currentOrder.multipleTimeAnswers[indexColumn][indexCell].answer != ""
            ){
                let expected = parseFloat(this.currentOrder.multipleTimeControlPoints[indexColumn].expectedValue)
                let number = parseFloat(this.currentOrder.multipleTimeAnswers[indexColumn][indexCell].answer)

                if (expected != number) {
                    inputValidated = 2
                }
            }

			this.currentOrder.multipleTimeAnswers[indexColumn][indexCell].validated = inputValidated;
		},

		handleSave() {
			this.$store.dispatch(
				"releasedOrder/saveContent",
				this.currentOrder
			);
		},
		handleComplete() {
			this.$store.dispatch(
				"releasedOrder/completeContent",
				this.currentOrder
			);
		},
	},
};
</script>

<style scoped>
.containerInfoOneTime {
	display: flex;
	justify-content: left;
	align-items: center;
}
.releasedOrder {
	margin: 10px;
}

.information div {
	margin-top: 5px;
	margin-bottom: 5px;
}

.releasedOrder button {
	border: solid #333 2px;
	border-radius: 5px 5px 5px 5px;
	padding: 0.2rem;
	background: #333;
	color: #ffffff;
}
</style>
