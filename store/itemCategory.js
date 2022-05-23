export const state = () => ({
	itemCodes: [],
	frequencies: [],
	updateSuccess: {}
})

export const mutations = {
	setFrequencies(state, frequencies) {
		state.frequencies = frequencies
	},
	updateStatus(state, updateVal) {
		state.updateSuccess = updateVal
	},
    appendItemCodes(state, itemCodes) {
        for (let i = 0; i < itemCodes.length; i ++){
            state.itemCodes.push(itemCodes[i])
        }
    },
    setItemCodes(state, itemCodes) {
        state.itemCodes = itemCodes
    },
}

export const actions = {
	loadItemCategoryCodes({commit, rootState}, options) {
		const user = rootState.login.user;
		const location = rootState.login.chosenLocation
		if (user) {
            fetch(`api/itemCategory/getCodes/${user.username}/${location}/${options.offset}/${options.limit}`).then(res => res.json()).then(result => {
                if(options.offset == 0){
                    commit('setItemCodes', result)
                }else{
                    commit('appendItemCodes', result)
                }
            })
		}
	},
	itemCodeExists({commit, rootState}, {code}){
		const user = rootState.login.user;
		return new Promise((resolve, reject) => {
			if (user) {
				fetch(`../api/itemCategory/checkItemExists/${user.username}/${code}`).then(res => res.json()).then(result => {
					if(result){
						resolve(result)
					}
					else{
						resolve(false)
					}
				})
			}
		})
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
			fetch(`../api/itemCategory/setFrequencies/${user.username}`, fetchData).then(async res => {
				if (res.status === 200) {
					await commit("updateStatus", {status: "success", value: frequencies.Code})
				} else await commit("updateStatus", {status: "error", value: frequencies.Code})
			})
		}
	},
}
