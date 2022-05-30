<template>
	<div>
		<h2></h2>
	</div>
</template>

<script>
import {authorizeUser} from "../mixins/authorizeUser.js"
import {header} from "../mixins/header";

export default {
    mixins: [authorizeUser,header],
	head() {
		return {
			title: "About my app",
			meta: [
				{
					hid: "description",
				},
			],
		};
	},
	created() {
		if (this.$store.state.login.user) {
			this.$store.dispatch("nav/loadLinks");

			this.$router.push(this.$store.state.nav.availableLinks[0].link);
		} else {
			this.$router.push("/login");
		}
	},
};
</script>
