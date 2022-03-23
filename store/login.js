
const languages = ["English", "Danish", "Lithuanian"]
const defaultLanguage = "English"

export const state = () => ({
  allLanguages: languages,
  chosenLanguage: defaultLanguage
})

export const mutations = {
  setLanguage(state, language){
    state.chosenLanguage = language
  },
}
