<template>
	<div class="releasedOrder">
		<ImageModal
			:image="modalImage"
			:show="modalShow"
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
			<DataDisplay
				:name="'Description'"
				:data="currentOrder.description"
			/>
		</div>

		<div class="oneTimeMeasurements">
			<h2>One time measurements</h2>

			<OneTimeTable
				:allowedHeaders="oneTimeAllowedHeaders"
				:rows="currentOrder.oneTimeControlPoints"
				:tableHeaders="oneTimeHeaders"
				:imageCallback="showImageModal"
                :valueUpdateCallback="editOneTimeValue"
			/>
		</div>

		<div class="multipleTimeMeasurements">
			<h2>Multiple time measurements</h2>

			<OneTimeTable
				:allowedHeaders="mAllowedHeaders"
				:rows="currentOrder.multipleTimeControlPoints"
				:tableHeaders="mHeaders"
				:imageCallback="showImageModal"
			/>

			<MultipleTimeTable
				:tableHeaders="multipleTimeAnswerHeaders"
				:columns="currentOrder.multipleTimeAnswers"
                :valueUpdateCallback="editMultipleTimeValue"
			/>
		</div>

		<div>
			<button v-on:click="handleSave">Complete</button>
			<button v-on:click="handleSave">Save</button>
		</div>
	</div>
</template>

<script>
import CustomTable from "../../../components/CustomTable.vue";
import Translate from "../../../components/Translate.vue";
import OneTimeTable from "../../../components/OneTimeTable.vue";
import ImageModal from "../../../components/ImageModal.vue";
import MultipleTimeTable from "../../../components/MultipleTimeTable.vue";
import DataDisplay from "../../../components/DataDisplay.vue";

export default {
	components: {
		CustomTable,
		Translate,
		OneTimeTable,
		ImageModal,
		MultipleTimeTable,
		DataDisplay,
	},
	data() {
		return {
			currentOrder: JSON.parse(
				JSON.stringify(this.$store.state.releasedOrder.currentReleased)
			),
			modalImage: "",
			modalShow: false,
		};
	},
	computed: {
		oneTimeHeaders() {
			return this.$store.state.releasedOrder.oneTimeTableHeaders;
		},
		oneTimeAllowedHeaders() {
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
	},
	mounted() {
		return this.$store.dispatch(
			"releasedOrder/loadReleasedOrderFull",
			this.$route.params.id
		);
	},
	watch: {
		"$store.state.releasedOrder.currentReleased": function () {
			this.currentOrder = JSON.parse(
				JSON.stringify(this.$store.state.releasedOrder.currentReleased)
			);
		},
	},
	methods: {
		showImageModal(image) {
			this.modalImage = image;
			this.modalShow = true;
		},
		closeImageModal() {
			this.modalImage = "";
			this.modalShow = false;
		},
		handleSave() {
			console.log(this.currentOrder);
			console.log(JSON.stringify(this.currentOrder));
		},
        editOneTimeValue(index, value){
            this.currentOrder.oneTimeControlPoints[index].answer = value
        },
        editMultipleTimeValue(indexColumn, indexCell, value){
            this.currentOrder.multipleTimeAnswers[indexColumn][indexCell].answer = value
        }
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
	/* display: flex; */
}

.releasedOrder button {
	border: solid #333 2px;
	border-radius: 5px 5px 5px 5px;
	padding: 0.2rem;
	background: #333;
	color: #ffffff;
}
</style>
