<template>
	<div id="myModal" class="modal" :style="{ display: showModalValue }">
		<!-- The Close Button -->
		<span class="close" v-on:click="closeModal()">&times;</span>

		<!-- Modal Content (The Image) -->
		<img :src="imageValue" class="modal-content" id="img01" />
	</div>
</template>

<script>
export default {
	props: ["image", "show", "closeCallback"],
	data() {
		return {
			imageValue: "",
			showModalValue: "none",
		};
	},
	watch: {
		image: function () {
			this.imageValue = this.image;
		},
		show: function () {
			if (this.show) {
				this.showModalValue = "inline";
			} else {
				this.showModalValue = "none";
			}
		},
	},
	methods: {
		closeModal() {
            if(this.closeCallback) this.closeCallback()
		},
	},
};
</script>

<style>

/* The Modal (background) */
.modal {
	/* display: none; */
	position: fixed; /* Stay in place */
	z-index: 1; /* Sit on top */
	padding-top: 100px; /* Location of the box */
	left: 0;
	top: 0;
	width: 100%; /* Full width */
	height: 100%; /* Full height */
	overflow: auto; /* Enable scroll if needed */
	background-color: rgb(0, 0, 0); /* Fallback color */
	background-color: rgba(0, 0, 0, 0.7); /* Black w/ opacity */
}

/* Modal Content (Image) */
.modal-content {
	margin: auto;
	display: block;
	width: 80%;
	max-width: 630px;
}

/* Caption of Modal Image (Image Text) - Same Width as the Image */
#caption {
	margin: auto;
	display: block;
	width: 80%;
	max-width: 700px;
	text-align: center;
	color: #ccc;
	padding: 10px 0;
	height: 150px;
}

/* The Close Button */
.close {
	position: absolute;
	top: 90px;
	right: 35px;
	color: #f1f1f1;
	font-size: 40px;
	font-weight: bold;
	transition: 0.3s;
}

.close:hover,
.close:focus {
	color: #bbb;
	text-decoration: none;
	cursor: pointer;
}

/* 100% Image Width on Smaller Screens */
@media only screen and (max-width: 700px) {
	.modal-content {
		width: 100%;
	}
}
</style>
