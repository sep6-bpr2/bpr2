<template>
	<div>
		<h2>Welcome to the best corny dad jokes on the web</h2>
	</div>
</template>

<script>
export default {
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
			this.$router.push(this.$store.state.nav.availableLinks[0].link);
		} else {
			this.$router.push("/login");
		}
	},
};
</script>
