<template>
	<div v-if="show">
		<div
			:style="{
				color: getTextColor,
				'background-color': getColor,
				padding: '15px',
				'margin-bottom': '20px',
				border: '1px solid transparent',
				'border-radius': '4px',
			}"
		>
			<button
				style="
					text-decoration: none;
					float: right;
					font-size: 21px;
					font-weight: 700;
					line-height: 1;
					color: #000;
					text-shadow: 0 1px 0 #fff;
					filter: alpha(opacity=20);
					opacity: 0.2;
				"
				v-on:click="closeModal"
			>
				&times;
			</button>
			<div class="text">
				<strong><Translate :text="getHeader" /></strong>
				<div :style="{ 'margin-left': '10px' }">{{ message }}</div>
			</div>
		</div>
	</div>
</template>

<script>
import Translate from "./Translate.vue";

export default {
	/**
	 * id - id to assign to the alert in case more alerts are needed per page
	 * message - the message(string) you want to display in the modal
	 * status - this can be "success", "danger", "warning". Indicates what color the modal is.
	 * show - modal is show or not, control by passing bool values of "true" or "false"
	 * timing - how long the modal should be shown. In seconds
	 * closeCallback - callback to change the state of the modal showing in the parent
	 */
	props: ["id", "message", "status", "show", "timing", "closeCallback"],
	components: {
		Translate,
	},
	watch: {
		show: function () {
            // THIS is needed because otherwise this is not called. 
            // I assume the compiler optimizes it out


            // This is a bud in the code but it actually ads functionality

            // This watch only works after the user closes the alert using the x button.
            // This makes a lot of sense for a user. Who closes the alert and does not 
            // want to look at them for long afterwards

            console.log("      ") 
			if (this.timing && this.show) {
				setTimeout(() => this.closeModal(), this.timing* 1000);
			}
		},
	},
	computed: {
		getColor() {
			if (this.status == "success") {
				return "#d4edda";
			} else if (this.status == "danger") {
				return "#f8d7da";
			} else if (this.status == "warning") {
				return "#fff3cd";
			} else {
				return "#d6d8d9";
			}
		},
		getHeader() {
			if (this.status == "success") {
				return "Success!";
			} else if (this.status == "danger") {
				return "Failed!";
			} else if (this.status == "warning") {
				return "Warning!";
			} else {
				return "Information!";
			}
		},
		getTextColor() {
			if (this.status == "success") {
				return "#155724";
			} else if (this.status == "danger") {
				return "#721c24";
			} else if (this.status == "warning") {
				return "#856404";
			} else {
				return "#1b1e21";
			}
		},
	},
	methods: {
		closeModal() {
			if (this.closeCallback) {
				if (this.id) {
					this.closeCallback(this.id);
				} else {
					this.closeCallback();
				}
			}
		},
	},
};
</script>

<style scoped>
.text {
	display: flex;
}
</style>
