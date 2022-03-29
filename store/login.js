const languages = [{ name: "English", flag: "gb" }, { name: "Dansk", flag: "dk" }, { name: "Lietuviu", flag: "lt" }]
const defaultLanguage = { name: "English", flag: "gb" }

export const state = () => ({
    allLanguages: languages,
    chosenLanguage: defaultLanguage,
    user: null
})

export const mutations = {
    setLanguage(state, language) {
        state.chosenLanguage = language
    },
    setUser(state, user) {
        state.user = user[0]
    },
    logoutUser(state) {
        state.user = null
    }
}

export const actions = {
    loginUser({ commit, dispatch }, { username }) {
        return new Promise((resolve, reject) => {
            fetch(`api/login/${username}`).then(res => res.json()).then(result => {
                if (result != null && result.length != 0) {
                    commit('setUser', result)
                    dispatch('nav/loadLinks', {}, { root: true })
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
        })
    },
}
