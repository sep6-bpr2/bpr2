const languages = [{name: "English", flag: "gb"}, {name: "Dansk", flag: "dk"}, {name: "Lietuviu", flag: "lt"}]
const locations = ["All"]
const defaultLanguage = {name: "English", flag: "gb"}

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
	loginUser({commit, dispatch}, {username}) {
		return new Promise((resolve, reject) => {
			fetch(`api/users/${username}`).then(res => res.json()).then(result => {
				if (result != null && result.length != 0) {
					commit('setUser', result)
					dispatch('nav/loadLinks', {}, {root: true})
					resolve(true)
				} else {
					resolve(false)
				}
			})
		})
	},
	getLocations({commit}) {
		fetch(`api/location/getLocations`).then(res => res.json()).then(result => {
			console.log(JSON.stringify(result))
				let resultLocation = []
				result.forEach(element => resultLocation.push(element['Location Code']))
				console.log(resultLocation)
				commit('addToLocations', resultLocation)
		})
	}
}
