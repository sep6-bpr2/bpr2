export const state = () => ({
	itemCodes: [],
	frequencies:[]
})

export const mutations = {
	setItemCodes(state, itemCodes) {
		state.itemCodes = itemCodes
	},
	setFrequencies(state,frequencies){
		state.frequencies = frequencies
	}
}

export const actions = {
	loadItemCategoryCodes({ commit, rootState }) {
		const user = rootState.login.user;
		if (user) {
			fetch(`api/itemCategory/getCodes`).then(res => res.json()).then(result => {
				commit('setItemCodes', result)
			})
		}
	},
	getFrequencyOfItemCode({commit,rootState },{itemCode}){
		const user = rootState.login.user;
		if (user) {
			fetch(`api/itemCategory/getFrequenciesOfCode/${itemCode}`).then(res => res.json()).then(result => {
				commit('setFrequencies', result)
			})
		}
	},
	setFrequencyWithId({commit,rootState },{frequencies}){
		const user = rootState.login.user;
		if (user) {
			let fetchData = {
				method: 'POST',
				body: JSON.stringify(frequencies),
				headers: {
					'Content-Type': 'application/json'
				},
			}
			fetch(`../api/itemCategory/setFrequencies`,fetchData)
		}
	},
}
