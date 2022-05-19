export const state = () => ({
	itemCodes: [],
	frequencies: [],
	updateSuccess: {}
})

export const mutations = {
	setItemCodes(state, itemCodes) {
		state.itemCodes = itemCodes
	},
	setFrequencies(state, frequencies) {
		state.frequencies = frequencies
	},
	updateStatus(state, updateVal) {
		state.updateSuccess = updateVal
	}
}

export const actions = {
	loadItemCategoryCodes({commit, rootState}) {
		const user = rootState.login.user;
		const location = rootState.login.chosenLocation
		if (user) {
			return new Promise((resolve, reject) => {
				fetch(`../api/itemCategory/getCodes/${user.username}/${location}`).then(res => res.json()).then(result => {
					if (result != null && result.length != 0) {
						commit('setItemCodes', result)
						resolve(result)
					} else {
						resolve(false)
					}
				})
			})
		}
	},
	getFrequencyOfItemCode({commit, rootState}, {itemCode}) {
		const user = rootState.login.user;
		if (user) {
			fetch(`../api/itemCategory/getFrequenciesOfCode/${user.username}/${itemCode}`).then(res => res.json()).then(result => {
				commit('setFrequencies', result)
			})
		}
	},
	setFrequencyWithId({commit, rootState}, {frequencies}) {
		const user = rootState.login.user;
		if (user) {
			let fetchData = {
				method: 'POST',
				body: JSON.stringify(frequencies),
				headers: {
					'Content-Type': 'application/json'
				},
			}
			fetch(`../api/itemCategory/setFrequencies/${user.username}`, fetchData)
		}
	},
}
