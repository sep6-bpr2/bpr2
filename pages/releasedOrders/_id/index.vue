<template>
	<div v-if="currentOrder" class="releasedOrder">
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
				:allowedHeaders="mAllowedHeaders"
				:rows="currentOrder.multipleTimeControlPoints"
				:tableHeaders="mHeaders"
				:imageCallback="showImageModal"
			/>

			<MultipleTimeTable
				:tableHeaders="multipleTimeAnswerHeaders"
				:columns="currentOrder.multipleTimeAnswers"
				:valueUpdateCallback="editMValue"
			/>
		</div>

		<AlertModal
			v-if="notification"
			:message="notification.message"
			:show="modalAlertShow"
			:status="notificationStatus"
			:closeCallback="closeAlertModal"
		/>

		<div>
			<button v-on:click="handleComplete">Complete</button>
			<button v-on:click="handleSave">Save</button>
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
			modalAlertShow: false,
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
			return this.$store.state.releasedOrder.currentReleased
				.multipleTimeControlPoints;
		},
		currentOrderMultipleTimeAnswerColumns() {
			return this.$store.state.releasedOrder.currentReleased
				.multipleTimeAnswers;
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
	},
	created() {
		this.$store
			.dispatch(
				"releasedOrder/loadReleasedOrderFull",
				this.$route.params.id
			)
			.then((result) => {
				this.currentOrder = result;
			});
	},
	watch: {
		"$store.state.releasedOrder.notification": function () {
			this.notification = this.$store.state.releasedOrder.notification;
			this.modalAlertShow = true;
		},
	},
	methods: {
		showImageModal(image) {
			this.modalImage = image;
			this.modalImageShow = true;
		},
		closeImageModal() {
			this.modalImage = "";
			this.modalImageShow = false;
		},
		closeAlertModal() {
			this.modalAlertShow = false;
		},
		editOValue(index, value) {
			this.currentOrder.oneTimeControlPoints[index].answer = value;
			this.currentOrder.oneTimeControlPoints[index].author = this.$store.state.login.user.username

            let inputValidated = false

			// Validate the input
            if (this.currentOrder.oneTimeControlPoints[index].type == 0) { //Option

                for (let i = 0; i < this.currentOrder.oneTimeControlPoints[index].options.length; i++) {
                    if (this.currentOrder.oneTimeControlPoints[index].options[i].value == this.currentOrder.oneTimeControlPoints[index].answer) {
                        inputValidated = true
                        break;
                    }
                }

            } else if (this.currentOrder.oneTimeControlPoints[index].type == 1 &&  // Text
                typeof this.currentOrder.oneTimeControlPoints[index].answer === 'string'
            ) {


                inputValidated = true

            } else if (this.currentOrder.oneTimeControlPoints[index].type == 3 // Number
            ) {
                let str = this.currentOrder.oneTimeControlPoints[index].answer
                if (typeof str != "string") {
                    inputValidated = false 
                } else {
                    inputValidated =  !isNaN(str) && !isNaN(parseFloat(str)) && Number(str) >= 0
                }
            }

            if(inputValidated || this.currentOrder.oneTimeControlPoints[index].answer == ''){
                this.currentOrder.oneTimeControlPoints[index].validated = true
            }else{
                this.currentOrder.oneTimeControlPoints[index].validated = false
            }
		},
		editMValue(indexColumn, indexCell, value) {
			this.currentOrder.multipleTimeAnswers[indexColumn][
				indexCell
			].answer = value;
            this.currentOrder.multipleTimeAnswers[indexColumn][
				indexCell
			].author = this.$store.state.login.user.username

            let inputValidated = false

			// Validate the input
            if (this.currentOrder.multipleTimeAnswers[indexColumn][indexCell].type == 0) { //Option

                for (let i = 0; i < this.currentOrder.multipleTimeControlPoints[indexColumn].options.length; i++) {
                    if (this.currentOrder.multipleTimeControlPoints[indexColumn].options[i].value == this.currentOrder.multipleTimeAnswers[indexColumn][indexCell].answer) {
                        inputValidated = true
                        break;
                    }
                }

            } else if (this.currentOrder.multipleTimeAnswers[indexColumn][indexCell].type == 1 &&  // Text
                typeof this.currentOrder.multipleTimeAnswers[indexColumn][indexCell].answer === 'string'
            ) {


                inputValidated = true

            } else if (this.currentOrder.multipleTimeAnswers[indexColumn][indexCell].type == 3 // Number
            ) {
                let str = this.currentOrder.multipleTimeAnswers[indexColumn][indexCell].answer
                if (typeof str != "string") {
                    inputValidated = false 
                } else {
                    inputValidated =  !isNaN(str) && !isNaN(parseFloat(str)) && Number(str) >= 0
                }
            }

            if(inputValidated || this.currentOrder.multipleTimeAnswers[indexColumn][indexCell].answer == ''){
                this.currentOrder.multipleTimeAnswers[indexColumn][indexCell].validated = true
            }else{
                this.currentOrder.multipleTimeAnswers[indexColumn][indexCell].validated = false
            }
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
