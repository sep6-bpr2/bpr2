<template>
	<div class="releasedOrder">
		<ImageModal
			:image="modalImage"
			:show="modalShow"
			:closeCallback="closeImageModal"
		/>
    
		<h1>QA FORM {{ $route.params.id }}</h1>

		<h2>Item ID: {{ currentOrder.id }}</h2>
		<h2>Description: {{ currentOrder.description }}</h2>
		<h2>Item Category Code: {{ currentOrder.categoryCode }}</h2>
		<h2>Deadline: {{ currentOrder.deadline }}</h2>
		<h2>Location: {{ currentOrder.location }}</h2>
		<h2>Status: {{ currentOrder.status }}</h2>

		<h2>ONE TIME MEASUREMENTS</h2>

		<OneTimeTable
			:allowedHeaders="oneTimeAllowedHeaders"
			:rows="currentOrder.oneTimeControlPoints"
			:tableHeaders="oneTimeHeaders"
			:imageCallback="showImageModal"
		/>

		<h2>MULTIPLE TIME MEASUREMENTS</h2>
		<OneTimeTable
			:allowedHeaders="mAllowedHeaders"
			:rows="currentOrder.multipleTimeControlPoints"
			:tableHeaders="mHeaders"
			:imageCallback="showImageModal"
		/>

		<MultipleTimeTable
			:tableHeaders="multipleTimeAnswerHeaders"
			:columns="currentOrder.multipleTimeAnswers"
		/>

		<button v-on:click="handleSave" >Complete</button>
		<button v-on:click="handleSave" >Save</button>

	</div>
</template>

<script>
import CustomTable from "../../../components/CustomTable.vue";
import Translate from "../../../components/Translate.vue";
import OneTimeTable from "../../../components/OneTimeTable.vue";
import ImageModal from "../../../components/ImageModal.vue";
import MultipleTimeTable from "../../../components/MultipleTimeTable.vue";

export default {
	components: {
		CustomTable,
		Translate,
		OneTimeTable,
		ImageModal,
		MultipleTimeTable,
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
	},
};
</script>

<style scoped>
.releasedOrder {
	margin: 10px;
}

.releasedOrder button {
	border: solid #333 2px;
	border-radius: 5px 5px 5px 5px;
	padding: 0.2rem;
	background: #333;
	color: #ffffff;
}
</style>
