<template>
	<div>
		{{ translate() }}
	</div>
</template>

<script>
import lanugages from "../store/languages";

export default {
	props: ["text"],
	methods: {
		translate() {
			if (this.text && lanugages.translations[this.text]) {
				try {
					const translated =
						lanugages.translations[this.text][
							this.$store.state.login.chosenLanguage.flag
						];
					if (translated) {
						return translated;
					} else {
						return this.text;
					}
				} catch (err) {
					return this.text;
				}
			} else {
				return this.text;
			}
		},
	},
};
</script>
