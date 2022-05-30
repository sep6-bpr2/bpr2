<template>
	<div>
		{{ translate() }}
	</div>
</template>

<script>
import languages from "../store/languages";

export default {
	props: ["text"],
	methods: {
		translate() {
            return languages.translateFunction(this.text, this.$store.state.login.chosenLanguage.name)
		},
	},
};
</script>
