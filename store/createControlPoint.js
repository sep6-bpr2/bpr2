const getDefaultState = () => ({
		allTypes: [],
		attributesNames: [],
		allItemCodes: [],
        controlPointNumber: null,
		allMeasurementTypes: [{name: "one time", value: 1}, {name: "multiple times", value: 0}],
		defaultFrequency: {
			"id": 0,
			"to25": 2,
			"to50": 3,
			"to100": 4,
			"to200": 7,
			"to300": 10,
			"to500": 16,
			"to700": 22,
			"to1000": 30,
			"to1500": 40,
			"to2000": 50,
			"to3000": 60,
			"to4000": 65,
			"to5000": 70
		},
		imagePreview: null,

		alert: {show: false, message: "", status: 0}
	}
)

export const state = () => getDefaultState()

export const mutations = {

	setAllTypes(state, types) {
		state.allTypes = types
	},

	setAllItemCodes(state, itemCodes) {
		state.allItemCodes = itemCodes
	},

	setAllAttributesNames(state, attributesNames) {
		state.attributesNames = attributesNames
	},

	setAlert(state, alert) {
		state.alert = alert
	}
}

export const actions = {
	async getAllTypes({commit, rootState}) {
		const user = rootState.login.user;
		if (user) {
			await fetch(`http://localhost:3000/api/controlPoints/allTypes/${user.username}`)
				.then(res => res.json())
				.then(res => {
					commit('setAllTypes', res)
				})
		}
	},

    loadItemCategoryCodes({commit, rootState}) {
        const user = rootState.login.user;
        if (user) {
            fetch(`http://localhost:3000/api/itemCategory/getCodesMax/${user.username}/All`).then(res => res.json()).then(result => {
                commit('setAllItemCodes', result)
            })
        }
    },
	async getFrequencies({commit, rootState}, cpId) {
		const user = rootState.login.user;
		if (user) {
			await fetch(`http://localhost:3000/api/controlPoints/getFrequenciesOfControlPoint/${cpId.controlPointId}/${user.username}`)
				.then(res => res.json())
				.then(res => {
                    console.log(res)
					commit('setFrequencies', res)
				})
		}
	},
	async getAllAttributesNames({commit, rootState}) {
		const user = rootState.login.user;
		if (user) {
			await fetch(`http://localhost:3000/api/controlPoints/allAttributesNames/${user.username}`)
				.then(res => res.json())
				.then(res => {
					commit('setAllAttributesNames', res)
				})
		}
	},
	deleteControlPoint({ commit, rootState }, cpId) {
		const user = rootState.login.user;
		if (user) {
			return new Promise((resolve, reject) => {
				fetch(`http://localhost:3000/api/controlPoints/delete/${user.username}/${cpId}`, {
					method: 'DELETE',
				})
					.then(res => {
						if (res.status >= 200 && res.status < 400) {
							commit("setAlert", {show: false, message: "", status: ""})
							resolve(true)
						} else if (res.status == 404) {
							commit("setAlert", {show: true, message: "control point not found", status: "danger"})
							resolve(false)
						} else {
							commit("setAlert", {show: true, message: "Oops something went wrong", status: "danger"})
							resolve(false)
						}
						return res
					})
			})
		}
	},
	async getControlPointData({commit, rootState}, cpId) {
		const user = rootState.login.user;
		if (user) {
			return new Promise((resolve, reject) => {
				 fetch(`http://localhost:3000/api/controlPoints/controlPointData/${user.username}/${cpId}`)
					.then(res => {
						if (res.status >= 200 && res.status < 400) {
							commit("setAlert", {show: false, message: "", status: ""})
						} else if (res.status == 404) {
							commit("setAlert", {show: true, message: "control point not found", status: "danger"})
						} else {
							commit("setAlert", {show: true, message: "Oops something went wrong", status: "danger"})
						}
						return res
					})
					.then(res => res.json())
					.then(res => {
						console.log(res)
						resolve(res)
					})
			})
		}
	},
	async submitControlPoint({commit, rootState}, cp) {
		console.log("AAAAAAAAAAAAAAAAAAAAAAAAAA!!!")
		const user = rootState.login.user;
		const request = (commit, cp) => {
			return new Promise((resolve, reject) => {
				fetch(`http://localhost:3000/api/controlPoints/submitControlPoint/${user.username}`, {
					method: 'POST',
					body: JSON.stringify(cp),
					headers: {
						'Content-Type': 'application/json'
					}
				}).then(response => {
						if (response.ok) {
							resolve(true)
						} else {
							resolve(false)
						}
					}
				)
			})
		}
		if (user) {
			return new Promise(async (resolve, reject) => {
				if (cp.image == null) {
					resolve(await request(commit, cp))
				} else {
					let reader = new FileReader()
					reader.onload = async function (e) {
						cp.image = e.target.result
						resolve(await request(commit, cp))
					}
					reader.readAsDataURL(cp.image)
				}
			})
		}
	},
	async submitEditControlPoint({commit, rootState}, cp) {
		const user = rootState.login.user;
		const request = (commit, cp) => {
			return new Promise((resolve, reject) => {
				fetch(`http://localhost:3000/api/controlPoints/submitEditControlPoint/${user.username}`, {
					method: 'PUT',
					body: JSON.stringify(cp),
					headers: {
						'Content-Type': 'application/json'
					}
				}).then(response => {
						if (response.ok) {
							resolve(true)
						} else {
							resolve(false)
						}
					}
				)
			})
		}
		if (user) {
			return new Promise(async (resolve, reject) => {
				if (cp.image == null || typeof cp.image === 'string') {
					resolve(await request(commit, cp))
				} else {
					let reader = new FileReader()
					reader.onload = async function (e) {
						cp.image = e.target.result
						resolve(await request(commit, cp))
					}
					reader.readAsDataURL(cp.image)
				}
			})
		}
	},
}
