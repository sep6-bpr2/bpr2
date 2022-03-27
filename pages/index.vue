<template>
	<div>
		<h2>Welcome to the best corny dad jokes on the web</h2>
	</div>
</template>

<script>
import Joke from "../components/Joke";
export default {
	components: { Joke },
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
};
</script>
