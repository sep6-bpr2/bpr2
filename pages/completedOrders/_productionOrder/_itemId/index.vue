<template>
	<div id="completedOrderPage">
		<AlertModal
			:id="1"
			:message="currentOrder && currentOrder.message"
			:show="modalAlertShowError"
			:status="errorStatus"
			:closeCallback="closeAlertModal"
		/>
		<div
			v-if="
				currentOrder &&
				currentOrder.response == null &&
				this.$store.state.login.user &&
				this.$store.state.login.user.role == 'admin'
			"
			class="completedOrder"
		>
			<ImageModal
				:image="modalImage"
				:show="modalImageShow"
				:closeCallback="closeImageModal"
			/>

			<div id="completedOrderInformation" class="information">
                <h2><Translate :text="'Order information'"/></h2>

                <DataDisplay :name="'Production order'" :data="currentOrder.productionOrder" />
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
					:name="'Completed date'"
					:data="currentOrder.completionDate"
				/>
                <DataDisplay :name="'Quantity'" :data="currentOrder.quantity" />

			</div>

			<div
				id="completedOrderOneTimeMeasurements"
				class="oneTimeMeasurements"
			>
                <h2><Translate :text="'One time measurements'"/></h2>

				<CustomTableInput
					id="oneTimeMeasurements"
					:allowedHeaders="oAllowedHeaders"
					:rows="currentOrder.oneTimeControlPoints"
					:tableHeaders="oHeaders"
					:imageCallback="showImageModal"
					:inputsDisabled="true"
				/>
			</div>

			<div>
                <h2><Translate :text="'Multiple time measurements'"/></h2>

				<!-- This table has the input column removed -->
				<CustomTableInput
					id="multipleTimeMeasurementsInfo"
					:allowedHeaders="mAllowedHeaders"
					:rows="currentOrder.multipleTimeControlPoints"
					:tableHeaders="mHeaders"
					:imageCallback="showImageModal"
					:inputsDisabled="true"
				/>

				<MultipleTimeTable
					id="multipleTimeMeasurementsAnswers"
					:tableHeaders="multipleTimeAnswerHeaders"
					:columns="currentOrder.multipleTimeAnswers"
					:inputsDisabled="true"
				/>
			</div>

			<div class="completedOrder">
				<button id="printButton" v-on:click="handlePrint">
					<Translate text="Print PDF" />
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
import { authorizeUser } from "../../../../mixins/authorizeUser.js";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
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
		};
	},
	computed: {
		oHeaders() {
			return this.$store.state.completedOrder.oneTimeTableHeaders;
		},
		oAllowedHeaders() {
			return this.$store.state.completedOrder.oneTimeAllowedHeaders;
		},

		mHeaders() {
			return this.$store.state.completedOrder.mTableHeaders;
		},
		mAllowedHeaders() {
			return this.$store.state.completedOrder.mAllowedHeaders;
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
				"completedOrder/loadCompletedOrderFull",
				{itemId: this.$route.params.itemId, productionOrder: this.$route.params.productionOrder}
			)
			.then((result) => {
				if (result && result.response != null) {
					this.modalAlertShowError = true;
				}
				this.currentOrder = result;
			});
	},
	watch: {
		"$store.state.completedOrder.notification": function () {
			this.notification = this.$store.state.completedOrder.notification;
			this.modalAlertShowSubmit = true;
		},
	},
	methods: {
		showImageModal(image) {
			if (this.$store.state.login.user) {
				this.modalImage =
					window.location.origin +
					"/api/controlPoints/picture/" +
					this.$store.state.login.user.username +
					"/" +
					image;
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
		async getUrlImageAsData(URL) {
			return new Promise((resolve, reject) => {
				var image = new Image();
				image.setAttribute("crossOrigin", "anonymous"); //getting images from external domain

				image.onload = function () {
					var canvas = document.createElement("canvas");
					canvas.width = this.naturalWidth;
					canvas.height = this.naturalHeight;

					//next three lines for white background in case png has a transparent background
					var ctx = canvas.getContext("2d");
					ctx.fillStyle = "#fff"; /// set white fill style
					ctx.fillRect(0, 0, canvas.width, canvas.height);

					canvas.getContext("2d").drawImage(this, 0, 0);

					resolve({
						data: canvas.toDataURL("image/jpeg"),
						width: canvas.width,
						height: canvas.height,
					});
				};

				image.src = URL;
			});
		},
		async handlePrint() {
			// Print the information of the
			let pdf = new jsPDF("landscape", "px");

			let arrayOfElements = [
				"completedOrderInformation",
				"completedOrderOneTimeMeasurements",
				"multipleTimeMeasurementsInfo",
				"multipleTimeMeasurementsAnswers",
			];

			for (let i = 0; i < arrayOfElements.length; i++) {
				let element = document.getElementById(arrayOfElements[i]);

				// Get the image of the html element
				let canvas = await html2canvas(element);
				let image = canvas.toDataURL("image/png");

				// Calculate the scale of the image
				let scale = 0;
				const scaleWidth =
					element.style.width / pdf.internal.pageSize.getWidth();
				const scaleHeight =
					element.style.height / pdf.internal.pageSize.getHeight();

				// Determine which scale would fit the page best
				if (scaleWidth > scaleHeight) scale = scaleWidth;
				else scale = scaleHeight;

				// Add the image to pdf as png with adjusted size
				pdf.addImage(
					image,
					"PNG",
					0,
					0,
					element.style.width / scale,
					element.style.height / scale,
					arrayOfElements[i],
					"FAST"
				);
				pdf.addPage();
			}

			for (
				let i = 0;
				i < this.currentOrder.oneTimeControlPoints.length;
				i++
			) {
				if (this.currentOrder.oneTimeControlPoints[i].image != null) {
					let image = await this.getUrlImageAsData(
						window.location.origin +
							"/api/controlPoints/picture/" +
							this.$store.state.login.user.username +
							"/" +
							this.currentOrder.oneTimeControlPoints[i].image
					);

					// Calculate the scale of the image
					const scaleWidth =
						image.width / pdf.internal.pageSize.getWidth();
					const scaleHeight =
						image.height / pdf.internal.pageSize.getHeight();
					let scale = 0;

					// Determine which scale would fit the page best
					if (scaleWidth > scaleHeight) scale = scaleWidth;
					else scale = scaleHeight;

					// Add the image to pdf as png with adjusted size
					pdf.addImage(
						image.data,
						"PNG",
						0,
						0,
						image.width / scale,
						image.height / scale,
						this.currentOrder.oneTimeControlPoints[i].image +
							"One time",
						"FAST"
					);
					pdf.addPage();
				}
			}
			for (
				let i = 0;
				i < this.currentOrder.multipleTimeControlPoints.length;
				i++
			) {
				if (
					this.currentOrder.multipleTimeControlPoints[i].image != null
				) {
					let image = await this.getUrlImageAsData(
						window.location.origin +
							"/api/controlPoints/picture/" +
							this.$store.state.login.user.username +
							"/" +
							this.currentOrder.multipleTimeControlPoints[i].image
					);
					// Calculate the scale of the image
					const scaleWidth =
						image.width / pdf.internal.pageSize.getWidth();
					const scaleHeight =
						image.height / pdf.internal.pageSize.getHeight();
					let scale = 0;

					// Determine which scale would fit the page best
					if (scaleWidth > scaleHeight) scale = scaleWidth;
					else scale = scaleHeight;

					pdf.text(20, pdf.lastAutoTable.finalY, "Hello!")

					// Add the image to pdf as png with adjusted size
					pdf.addImage(
						image.data,
						"PNG",
						0,
						0,
						image.width / scale,
						image.height / scale,
						this.currentOrder.multipleTimeControlPoints[i].image +
							"Multiple",
						"FAST"
					);
					if (
						i != 0 &&
						i !=
							this.currentOrder.multipleTimeControlPoints.length -
								1
					) {
						pdf.addPage();
					}
				}
			}
			pdf.save("QA report " + this.currentOrder.id + ".pdf");
		},
	},
};
</script>

<style scoped>
.completedOrder {
	margin: 10px;
}

.information div {
	margin-top: 5px;
	margin-bottom: 5px;
	width: auto;
}

.completedOrder button {
	border: solid #333 2px;
	border-radius: 5px 5px 5px 5px;
	padding: 0.2rem;
	background: #333;
	color: #ffffff;
}
</style>
