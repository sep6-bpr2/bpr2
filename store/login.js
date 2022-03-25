const languages = [{name: "English", flag: "gb"}, {name: "Dansk", flag: "dk"}, {name: "Lietuviu", flag: "lt"}]
const defaultLanguage = {name: "English", flag: "gb"}

export const state = () => ({
  allLanguages: languages,
  chosenLanguage: defaultLanguage
})

export const mutations = {
  setLanguage(state, language) {
    state.chosenLanguage = language
  },
}
