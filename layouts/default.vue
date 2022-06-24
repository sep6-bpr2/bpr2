<template>
	<v-app>
		<div>
			<Nav />
		</div>
        <AlertModal
            :message="modalMessage"
            :show="modalState"
            :status="modalStatus"
        />
		<v-main v-show="!modalState" style="overflow-x:auto; white-space: nowrap;">
			<Nuxt  />
		</v-main>
	</v-app>
</template>

<script>
import Nav from "../components/Nav.vue";
import AlertModal from "../components/AlertModal.vue";

export default {
	components: {
		Nav,
		AlertModal,
	},
	data() {
		return {
			modalState: false,
			modalMessage: "",
			modalStatus: "danger",
		};
	},
    watch: {
		"$store.state.mainState.modalState": function () {
			this.modalState = this.$store.state.mainState.modalState
		},
		"$store.state.mainState.modalMessage": function () {
			this.modalMessage = this.$store.state.mainState.modalMessage
		},
        "$store.state.mainState.modalStatus": function () {
			this.modalStatus = this.$store.state.mainState.modalStatus
		},
        "$store.state.mainState.redirectLogin": function () {
            if(this.$store.state.mainState.redirectLogin == true){
                this.$router.push("/login");
                this.$store.dispatch("mainState/disableRedirect", {});
            }
		},
	},
};
</script>

<style>
* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}

body {
	font-family: Arial, Helvetica, sans-serif;
	font-size: 1rem;
	line-height: 1.6;
	background: #fff;
}

a {
	color: #666;
	text-decoration: none;
}

ul {
	list-style: none;
}

.pageHeader{
	color: black;
	display: flex;
	flex-direction: row;
	align-items: center;
	font-size: 20pt;
	padding: 7pt;
}

.container {
	/* max-width: 800px; */
	/* margin: 2rem auto; */
	overflow: hidden;
	/*padding: 1rem 2rem;*/
	background: #fff;
}
</style>
