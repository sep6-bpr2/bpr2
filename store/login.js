const languages = [{name: "English", flag: "english"}, {name: "Dansk", flag: "danish"}, {name: "Lietuviu", flag: "lithuanian"}]
const locations = ["All"]
const defaultLanguage = {name: "English", flag: "english"}

export const state = () => ({
	allLanguages: languages,
	chosenLanguage: defaultLanguage,
	chosenLocation: "All",
	allLocations: locations,
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
	},
	addToLocations(state, locations) {
		state.allLocations.push(...locations)
	},
	setLocation(state, location) {
		state.chosenLocation = location
	},
}

export const actions = {
	loginUser({commit, dispatch, rootState}, {username}) {
		return new Promise((resolve, reject) => {
			fetch(`api/users/getUser/${username}`).then(res => res.json()).then(result => {
				if (result != null && result.length != 0) {
					if(rootState.login.chosenLocation === "All" && result[0].role === "qa employee"){
						resolve("This user is not allowed to login with specified department!")
					}
					else{
						commit('setUser', result)
						dispatch('nav/loadLinks', {}, {root: true})
						resolve(true)
					}
				} else {
					resolve(false)
				}
			})
		})
	},
	getLocations({commit}) {
		fetch(`api/location/getLocations`).then(res => res.json()).then(result => {
				let resultLocation = []
				result.forEach(element => resultLocation.push(element['Location Code']))
				commit('addToLocations', resultLocation)
		})
	}
}
