import lanugages from "../store/languages";

export const translate = {
	methods: {
		translateText(text) {
			return lanugages.translateFunction(
				text,
				this.$store.state.login.chosenLanguage.name
			);
		},
	}
}
