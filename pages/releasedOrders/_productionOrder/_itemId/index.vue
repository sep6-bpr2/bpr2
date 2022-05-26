<template>
	<div
		:v-if="
			this.$store.state.login.user &&
			this.$store.state.login.user == 'qa employee'
		"
	>
		<AlertModal
			:id="1"
			:message="currentOrder && currentOrder.message"
			:show="modalAlertShowError"
			:status="errorStatus"
			:closeCallback="closeAlertModal"
		/>
		<div
			v-if="currentOrder && currentOrder.response == null"
			class="releasedOrder"
		>
			<ImageModal
				:image="modalImage"
				:show="modalImageShow"
				:closeCallback="closeImageModal"
			/>

			<div class="information">
				<h2>Information</h2>
                <DataDisplay :name="'Production order'" :data="currentOrder.productionOrder" />
				<DataDisplay :name="'Item number'" :data="currentOrder.id" />
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
                <DataDisplay :name="'Quantity'" :data="currentOrder.quantity" />

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
				<button id="completeButton" v-on:click="handleComplete">
					{{warnUserOfTolerance? 'Cancel': 'Complete'}}
				</button>
				<button id="saveButton" v-on:click="handleSave" :style="{'background': (warnUserOfTolerance? 'FireBrick': '#333'), 'border-color': (warnUserOfTolerance? 'FireBrick': '#333')}">
                    {{warnUserOfTolerance? 'Confirm': 'Save'}}
                </button>
			</div>
		</div>
	</div>
</template>

<script>
import CustomTable from "../../../../components/CustomTable.vue";
import Translate from "../../../../components/Translate.vue";
import CustomTableInput from "../../../../components/CustomTableInput.vue";
import ImageModal from "../../../../components/ImageModal.vue";
import MultipleTimeTable from "../../../../components/MultipleTimeTable.vue";
import DataDisplay from "../../../../components/DataDisplay.vue";
import AlertModal from "../../../../components/AlertModal.vue";
import {authorizeUser} from "../../../../mixins/authorizeUser.js"
import inputValidation from "../../../../shared/validateInput"
import {header} from "../../../../mixins/header";

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
    mixins: [authorizeUser,header],
	data() {
		return {
			currentOrder: null,
			modalImage: "",
			modalImageShow: false,
			notification: null,
			modalAlertShowSubmit: false,
			modalAlertShowError: false,
            warnUserOfTolerance: false
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
		this.$store
			.dispatch(
				"releasedOrder/loadReleasedOrderFull",
				{itemId: this.$route.params.itemId, productionOrder: this.$route.params.productionOrder}
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
            window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
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

            inputValidated = inputValidation.validateInput(
                this.currentOrder.oneTimeControlPoints[index].answer,
                this.currentOrder.oneTimeControlPoints[index].inputType,
                this.currentOrder.oneTimeControlPoints[index].options,
                this.currentOrder.oneTimeControlPoints[index].lowerTolerance,
                this.currentOrder.oneTimeControlPoints[index].upperTolerance,
                this.currentOrder.oneTimeControlPoints[index].expectedValue,
            )

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

            inputValidated = inputValidation.validateInput(
                this.currentOrder.multipleTimeAnswers[indexColumn][indexCell].answer,
                this.currentOrder.multipleTimeAnswers[indexColumn][indexCell].inputType,
                this.currentOrder.multipleTimeControlPoints[indexColumn].options,
                this.currentOrder.multipleTimeControlPoints[indexColumn].lowerTolerance,
                this.currentOrder.multipleTimeControlPoints[indexColumn].upperTolerance,
                this.currentOrder.multipleTimeControlPoints[indexColumn].expectedValue
            )

			this.currentOrder.multipleTimeAnswers[indexColumn][indexCell].validated = inputValidated;
		},
		handleSave() {
            let badInputs = false
            let outOfToleranceInputs = false

            for(let i = 0; i < this.currentOrder.oneTimeControlPoints.length; i++){
                if(this.currentOrder.oneTimeControlPoints[i].validated != null && this.currentOrder.oneTimeControlPoints[i].validated == 0){
                    badInputs = true
                    break;
                } else if(this.currentOrder.oneTimeControlPoints[i].validated != null && this.currentOrder.oneTimeControlPoints[i].validated == 2){
                    outOfToleranceInputs = true
                }            
            }

            if(!badInputs){
                multipleTimeCheck:
                for(let i = 0; i < this.currentOrder.multipleTimeAnswers.length; i++){
                    for(let j = 0; j < this.currentOrder.multipleTimeAnswers[i].length; j++){
                        if(this.currentOrder.multipleTimeAnswers[i][j].validated != null && this.currentOrder.multipleTimeAnswers[i][j].validated == 0){
                            badInputs = true
                            break multipleTimeCheck
                        } else if(this.currentOrder.multipleTimeAnswers[i][j].validated != null && this.currentOrder.multipleTimeAnswers[i][j].validated == 2){
                            outOfToleranceInputs = true
                        }    
                    }
                }
            }

            if(!badInputs && (!outOfToleranceInputs || this.warnUserOfTolerance)){
                this.$store.dispatch(
                    "releasedOrder/saveContent",
                    this.currentOrder
                );
                this.warnUserOfTolerance = false
            }else if (badInputs){
                this.$store.dispatch(
                    "releasedOrder/setNotification",
                    { response: 0, message: "There are errors in the input, please fix them before saving" }
                );
            }else{
                this.$store.dispatch(
                    "releasedOrder/setNotification",
                    { response: 2, message: "There are inputs that are out of tolerance. Are you sure you want to save them?" }
                );
                this.warnUserOfTolerance = true
            }
		},
		handleComplete() {
            if( !this.warnUserOfTolerance ){
                let badInputs = false
                let completed = true
                let outOfToleranceInputs = false

                for (let i = 0; i < this.currentOrder.oneTimeControlPoints.length; i++) {
                    if (this.currentOrder.oneTimeControlPoints[i].validated != null && this.currentOrder.oneTimeControlPoints[i].validated == 0) {
                        badInputs = true
                        break;
                    } else if (this.currentOrder.oneTimeControlPoints[i].validated != null && this.currentOrder.oneTimeControlPoints[i].answer == '') {
                        completed = false
                    } else if(this.currentOrder.oneTimeControlPoints[i].validated != null && this.currentOrder.oneTimeControlPoints[i].validated == 2){
                        outOfToleranceInputs = true
                    } 
                }

                if (!badInputs && completed) {
                    multipleTimeCheck:
                    for (let i = 0; i < this.currentOrder.multipleTimeAnswers.length; i++) {
                        for (let j = 0; j < this.currentOrder.multipleTimeAnswers[i].length; j++) {
                            if (this.currentOrder.multipleTimeAnswers[i][j].validated != null && this.currentOrder.multipleTimeAnswers[i][j].validated == 0) {
                                badInputs = true
                                break multipleTimeCheck
                            } else if (this.currentOrder.multipleTimeAnswers[i][j].validated != null && this.currentOrder.multipleTimeAnswers[i][j].answer == '') {
                                completed = false
                            } else if(this.currentOrder.multipleTimeAnswers[i][j].validated != null && this.currentOrder.multipleTimeAnswers[i][j].validated == 2){
                                outOfToleranceInputs = true
                            } 
                        }
                    }
                }

                if (!badInputs && completed && (!outOfToleranceInputs || this.warnUserOfTolerance)) {
                    this.$store.dispatch(
                        "releasedOrder/completeContent",
                        this.currentOrder
                    );
                    this.warnUserOfTolerance = false
                }else if (badInputs && !completed){
                    if (badInputs) {
                        this.$store.dispatch(
                            "releasedOrder/setNotification",
                            { response: 0, message: "There are errors in the input, please fix them before completing" }
                        );
                    } else if (!completed) {
                        this.$store.dispatch(
                            "releasedOrder/setNotification",
                            { response: 0, message: "All inputs must be entered before completing" }
                        );
                    }
                } else {
                    this.$store.dispatch(
                        "releasedOrder/setNotification",
                        { response: 2, message: "There are inputs that are out of tolerance. Are you sure you want to save them?" }
                    );
                    this.warnUserOfTolerance = true
                }
            }else{
                this.warnUserOfTolerance = false
                this.notification = null
            }
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
